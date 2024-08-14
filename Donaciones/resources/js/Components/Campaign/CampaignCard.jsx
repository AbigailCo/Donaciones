import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';
import axios from 'axios';

const CampaignCard = ({ campaign }) => (
  <Card>
    <CardMedia
      component="img"
      height="140"
      image="https://via.placeholder.com/150" // Puedes agregar una imagen relevante
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

  useEffect(() => {
    // Fetch campaigns from the API
    axios.defaults.baseURL = 'http://127.0.0.1:8000/'  // Cambia esto si tu backend está en otro dominio o puerto
    axios.get('/campaigns',  { withCredentials: true })
      .then(response => {
        setCampaigns(response.data);
      })
      .catch(error => {
        console.error('Error fetching campaigns:', error);
      });
  }, []);

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