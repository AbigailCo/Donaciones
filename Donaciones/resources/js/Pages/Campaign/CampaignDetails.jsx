import React, { useState } from 'react';
import { usePage, Link } from '@inertiajs/react';
import { Card, CardContent, CardMedia, Typography, Box, Button } from '@mui/material';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import axios from 'axios';
import DonateButton from '@/Components/Campaign/DonateButton';

const CampaignDetails = () => {
  const { auth, campaign } = usePage().props;
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

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
              {/* Imagen de la campaña */}
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
                  {/* Meta de la campaña */}
                  <Typography variant="body1" color="text.primary">
                    <strong>Meta:</strong> ${campaign.goal}
                  </Typography>
                  {/* Fechas de la campaña */}
                  <Typography variant="body1" color="text.secondary">
                    <strong>Comienza:</strong> {campaign.start_date} <br />
                    <strong>Finaliza:</strong> {campaign.end_date}
                  </Typography>
                </Box>

                <DonateButton campaignId={campaign.id} amount={100} />
              </CardContent>
            </Card>
          </Box>
        </AuthenticatedLayout>
      ) : (
        // Mostrar mensaje de sesión expirada si el usuario no está autenticado
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            flexDirection: 'column',
            textAlign: 'center',
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
