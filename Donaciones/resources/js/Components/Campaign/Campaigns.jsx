import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CampaignCard from './CampaignCard';
import { Grid, Button, Typography } from '@mui/material';
import CampaignSearch from './CampaignSearch';

const Campaigns = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1); // Estado para controlar la página actual
    const [lastPage, setLastPage] = useState(1); // Estado para la última página disponible

    const fetchCampaigns = (pageNumber) => {
        setLoading(true);
        axios.get(`/campaigns?page=${pageNumber}`)
            .then(response => {
                // Ordenar las campañas por 'created_at' en descendente
                const sortedCampaigns = response.data.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setCampaigns(sortedCampaigns); // Guardar las campañas ordenadas
                setPage(response.data.current_page); // Actualiza la página actual
                setLastPage(response.data.last_page); // Actualiza la última página
                setLoading(false);
            })
            .catch(err => {
                setError('Error al obtener las campañas');
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchCampaigns(page);
    }, [page]);

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <CampaignSearch />
            <Grid container spacing={3}>
                {campaigns.map(campaign => (
                    <Grid item xs={12} sm={6} md={4} key={campaign.id}>
                        <CampaignCard campaign={campaign} />
                    </Grid>
                ))}
            </Grid>

            {/* Paginación */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Button
                    disabled={page === 1}
                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                >
                    Anterior
                </Button>
                <Typography variant="body2" style={{ margin: '0 10px', lineHeight: '2.5' }}>
                    Página {page} de {lastPage}
                </Typography>
                <Button
                    disabled={page === lastPage}
                    onClick={() => setPage(prev => Math.min(prev + 1, lastPage))}
                >
                    Siguiente
                </Button>
            </div>
        </div>
    );
};

export default Campaigns;
