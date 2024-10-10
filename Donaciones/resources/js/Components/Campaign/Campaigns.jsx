// Campaigs.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CampaignCard from './CampaignCard';
import { Grid } from '@mui/material';
import BuscadorCampañas from './BuscadorCampañas';

const Campaigns = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('/campaigns') // Asegúrate de que esta ruta sea la correcta
            .then(response => {
                setCampaigns(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Error al obtener las campañas');
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>{error}</div>;

    return (
        
        <div>
            <BuscadorCampañas/>
            <Grid container spacing={3}>
            {campaigns.map(campaign => (
                <Grid item xs={12} sm={6} md={4} key={campaign.id}>
                    <CampaignCard campaign={campaign} />
                </Grid>
            ))}
           
        </Grid>
        </div>
        
    );
};

export default Campaigns;
