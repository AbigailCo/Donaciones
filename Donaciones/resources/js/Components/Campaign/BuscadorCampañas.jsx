import React, { useState, useEffect } from 'react';
import { searchCampaigns, getCategories } from "../../../services/api"; // Suponiendo que tienes una función para obtener las categorías
import { Spinner, Modal, Button, Card, Container, Row, Col, Form } from 'react-bootstrap';

const BuscadorCampañas = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedCampaign, setSelectedCampaign] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        // Obtener las categorías al cargar el componente
        const fetchCategories = async () => {
            try {
                const categoriesList = await getCategories(); // Obtén las categorías de tu API
                setCategories(categoriesList);
            } catch (error) {
                console.error('Error al obtener categorías:', error);
            }
        };
        fetchCategories();
    }, []);

    const handleSearchChange = async (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        if (term.length >= 3 || selectedCategory) {
            setLoading(true);
            setError('');
            try {
                // Enviar el término de búsqueda y la categoría seleccionada
                const result = await searchCampaigns(term, selectedCategory);
                if (result.length > 0) {
                    setCampaigns(result);
                } else {
                    setCampaigns([]);
                    setError('No se encontraron campañas.');
                }
            } catch (error) {
                setError('Error al buscar campañas.');
                setCampaigns([]);
            } finally {
                setLoading(false);
            }
        } else {
            setCampaigns([]);
            setError('');
        }
    };

    const handleCategoryChange = async (e) => {
        const category = e.target.value;
        setSelectedCategory(category);
        await handleSearchChange({ target: { value: searchTerm } }); // Actualizar los resultados cuando cambie la categoría
    };

    const handleCampaignClick = (campaign) => {
        setSelectedCampaign(campaign);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedCampaign(null);
    };

    return (
        <Container>
            <h2 className="text-center my-4">Buscar Campañas</h2>

            <Form.Group className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="Buscar por título..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="form-control"
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Select value={selectedCategory} onChange={handleCategoryChange}>
                    <option value="">Todas las Categorías</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>

            {loading && <Spinner animation="border" role="status"><span className="sr-only">Cargando...</span></Spinner>}
            {error && <p className="text-danger">{error}</p>}

            <Row>
                {campaigns.length > 0 ? (
                    campaigns.map((campaign) => (
                        <Col key={campaign.id} md={4} className="mb-4">
                            <Card onClick={() => handleCampaignClick(campaign)} className="h-100 shadow-sm" style={{ cursor: 'pointer' }}>
                                <Card.Body>
                                    <Card.Title>{campaign.title || 'Sin título'}</Card.Title>
                                    <Card.Text>
                                        {campaign.description ? campaign.description.substring(0, 60) + '...' : 'No hay descripción disponible.'}
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer className="text-muted">Meta: ${campaign.goal || 'No especificada'}</Card.Footer>
                            </Card>
                        </Col>
                    ))
                ) : (
                    searchTerm.length >= 3 && !loading && <p>No se encontraron campañas con ese título.</p>
                )}
            </Row>

            {/* Modal para mostrar detalles de la campaña */}
            <Modal show={showModal} onHide={closeModal} centered>
                {selectedCampaign && (
                    <>
                        <Modal.Header closeButton>
                            <Modal.Title>Campaña: {selectedCampaign.title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <p><strong>Descripción:</strong> {selectedCampaign.category?.name || 'No hay categoria disponible.'}</p>
                            <p><strong>Descripción:</strong> {selectedCampaign.description || 'No hay descripción disponible.'}</p>
                            <p><strong>Meta:</strong> ${selectedCampaign.goal || 'No especificada'}</p>
                            <p><strong>Inicio:</strong> {selectedCampaign.start_date || 'No especificado'}</p>
                            <p><strong>Fin:</strong> {selectedCampaign.end_date || 'No especificado'}</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={closeModal}>
                                Cerrar
                            </Button>
                        </Modal.Footer>
                    </>
                )}
            </Modal>
        </Container>
    );
};

export default BuscadorCampañas;
