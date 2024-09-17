import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, CircularProgress } from '@mui/material';
import axios from 'axios';

const CampaignCard = ({ campaign }) => (
  <Card>
    <CardMedia
      component="img"
      height="200" // Ajuste para hacer la imagen un poco más grande
      image={`/images/imagePrueba/${campaign.image}`}
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
        Goal: ${campaign.goal}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Dates: {campaign.start_date} to {campaign.end_date}
      </Typography>
    </CardContent>
  </Card>
);

const CampaignCards = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para el loading
  const [error, setError] = useState(null); // Estado para el manejo de errores

  useEffect(() => {
    axios.defaults.baseURL = 'http://localhost:8000/';
    axios
      .get('/campaigns', { withCredentials: true })
      .then(response => {
        setCampaigns(response.data);
        setLoading(false); // Detenemos el loading cuando obtenemos los datos
      })
      .catch(error => {
        setError('Error fetching campaigns');
        setLoading(false); // Detenemos el loading en caso de error
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

  return (
    <Grid container spacing={2}>
      {campaigns.map(campaign => (
        <Grid item xs={12} sm={6} md={4} key={campaign.id}>
          <CampaignCard campaign={campaign} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CampaignCards;
