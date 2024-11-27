import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Spinner,
  Alert,
  Button,
  Modal,
} from "react-bootstrap";
import axios from "axios";
import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";
import CampaignCard from "./CampaignCard";

const CampaignSearch = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showFilterModal, setShowFilterModal] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "" && selectedCategories.length === 0) {
      setCampaigns([]);
      return;
    }

    const handleSearch = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await axios.get("/campaigns/search", {
          params: {
            term: searchTerm,
            categories:
              selectedCategories.length > 0 ? selectedCategories : undefined,
          },
        });

        setCampaigns(response.data);
        if (response.data.length === 0) setError("No se encontraron campañas.");
      } catch (error) {
        setError("Error al buscar campañas: " + error.message);
        setCampaigns([]);
      } finally {
        setLoading(false);
      }
    };

    handleSearch();
  }, [searchTerm, selectedCategories]);

  const handleFilterChange = (selectedCategories) => {
    setSelectedCategories(selectedCategories);
  };

  return (
    <Container className="my-3">
      <h2 className="text-center mb-4">Busca la campaña que necesitas</h2>
      <h6 className="text-center mb-4">
        filtrar las campañas por categoria o titulo
      </h6>

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Button
      className="mb-4"
        style={{
          background: "linear-gradient(90deg, #7eb8fc, #fc6fe7)",
          border: "none",
          color: "#000000",
          fontWeight: "bold",
          padding: "10px 20px",
          borderRadius: "30px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = "scale(1.05)";
          e.target.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.3)";
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = "scale(1)";
          e.target.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.2)";
        }}
        onClick={() => setShowFilterModal(true)}
      >
        Filtrar Categoria
      </Button>
      {/* Modal de Filtros */}
      <Modal show={showFilterModal} onHide={() => setShowFilterModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Filtrar por Categoría</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CategoryFilter
            categories={categories}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            onFilterChange={handleFilterChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{
              background: "linear-gradient(90deg, #7eb8fc, #fc6fe7)",
              border: "none",
              color: "#000000",
              fontWeight: "bold",
              padding: "10px 20px",
              borderRadius: "30px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.2)";
            }}
            onClick={() => setShowFilterModal(false)}
          >
            Aplicar Filtros
          </Button>
        </Modal.Footer>
      </Modal>
      {loading && (
        <div className="text-center my-4">
          <Spinner animation="border" role="status" />
          <p>Cargando campañas...</p>
        </div>
      )}
      {error && (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      )}

      <Row>
        {campaigns.map((campaign) => (
          <Col key={campaign.id} md={4} className="mb-4">
            <CampaignCard campaign={campaign} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CampaignSearch;
