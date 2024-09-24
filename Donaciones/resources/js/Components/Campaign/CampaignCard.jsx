import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, CircularProgress } from '@mui/material';
import axios from 'axios';
import { Link } from '@inertiajs/react';

const CampaignCard = ({ campaign }) => (
  <Card style={{ cursor: 'pointer' }}>
    <Link href={`/campaigns/${campaign.id}`} style={{ textDecoration: 'none' }}>
      <CardMedia
        component="img"
        height="200"
        image={`/storage/images/${campaign.image}`}
        alt={campaign.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {campaign.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {campaign.description}
        </Typography>
        <Typography variant="body1" color="text.primary">
          Meta: ${campaign.goal}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Fechas: {campaign.start_date} a {campaign.end_date}
        </Typography>
      </CardContent>
    </Link>
  </Card>
);

const CampaignCards = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.defaults.baseURL = 'http://localhost:8000/';
    axios
      .get('/campaigns', { withCredentials: true })
      .then(response => {
        setCampaigns(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error al obtener las campañas');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <Typography variant="h6" color="error">{error}</Typography>;
  }

  // Ordenar las campañas por la fecha de creación (created_at) en orden descendente
  const sortedCampaigns = [...campaigns].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  return (
    <Grid container spacing={2}>
      {sortedCampaigns.map(campaign => (
        <Grid item xs={12} sm={6} md={4} key={campaign.id}>
          <CampaignCard campaign={campaign} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CampaignCards;

