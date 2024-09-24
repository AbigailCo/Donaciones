import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import { Card, CardContent, CardMedia, Typography, Box, Button } from '@mui/material';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import axios from 'axios';

const CampaignDetails = () => {
  const { auth, campaign } = usePage().props;
  const [preferenceId, setPreferenceId] = useState(null);

  const handleDonation = async (amount) => {
    try {
      const response = await axios.post('/donations/create', {
        campaign_title: campaign.title,
        amount,
      });
      setPreferenceId(response.data.preference_id);
    } catch (error) {
      console.error('Error al crear la preferencia:', error);
    }
  };

  // Si ya existe una preferencia, carga el widget de Mercado Pago
  if (preferenceId) {
    const script = document.createElement('script');
    script.src = 'https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js';
    script.setAttribute('data-preference-id', preferenceId);
    document.getElementById('mercado-pago-btn').appendChild(script);
  }

  return (
    <div>
      {auth.user ? (
        <AuthenticatedLayout user={auth.user}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '100vh',
              padding: '20px',
              backgroundColor: '#f5f5f5',
            }}
          >
            <Card sx={{ maxWidth: 600, boxShadow: 3 }}>
              <CardMedia
                component="img"
                height="300"
                image={`/storage/images/${campaign.image}`}
                alt={campaign.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h4" component="div" align="center">
                  {campaign.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" align="justify" sx={{ marginBottom: 2 }}>
                  {campaign.description}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body1" color="text.primary">
                    <strong>Meta:</strong> ${campaign.goal}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    <strong>Fecha de comienzo:</strong> {campaign.start_date} <br /> 
                    <strong>Fecha de finalización:</strong>  {campaign.end_date}
                  </Typography>
                </Box>

                {/* Botón para donar */}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleDonation(100)} // Puedes personalizar el monto
                >
                  Donar $100
                </Button>

                {/* Contenedor para el botón de Mercado Pago */}
                <div id="mercado-pago-btn" style={{ marginTop: '20px' }}></div>
              </CardContent>
            </Card>
          </Box>
        </AuthenticatedLayout>
      ) : (
        <Box 
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            flexDirection: 'column',
            textAlign: 'center'
          }}
        >
          <Typography variant="h5" color="error" gutterBottom>
            Sesión expirada
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Por favor, inicia sesión nuevamente.
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default CampaignDetails;
