import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';
import CampaignCard from './CampaignCard';

const CampaignSearch = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error al obtener categorías:', error);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const handleSearch = async () => {
            if (searchTerm.trim() === '' && selectedCategories.length === 0) {
                return; // No hacer nada si no hay término de búsqueda ni categorías seleccionadas
            }

            setLoading(true);
            setError('');

            try {
                const response = await axios.get('/campaigns/search', {
                    params: {
                        term: searchTerm,
                        categories: selectedCategories.length > 0 ? selectedCategories : undefined,
                    },
                });

                setCampaigns(response.data);
                if (response.data.length === 0) setError('No se encontraron campañas.');
            } catch (error) {
                setError('Error al buscar campañas: ' + error.message);
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
        <Container className="my-5">
            <h2 className="text-center mb-4">Buscar Campañas</h2>

            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <CategoryFilter
                categories={categories}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                onFilterChange={handleFilterChange} 
            />

            {loading && (
                <div className="text-center my-4">
                    <Spinner animation="border" role="status" />
                    <p>Cargando campañas...</p>
                </div>
            )}
            {error && <Alert variant="danger" className="text-center">{error}</Alert>}

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
