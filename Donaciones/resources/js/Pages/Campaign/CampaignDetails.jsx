import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import CampaignVideo from '../../Components/Campaign/CampaignVideo';
import axios from 'axios';
import { initMercadoPago } from '@mercadopago/sdk-react';
import { Card, CardContent, CardMedia, Typography, Box, TextField, Button } from '@mui/material';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CarouselComponent from '../../Components/Campaign/CarouselComponent';
import ProgressChart from '../../Components/Campaign/ProgressChart';

const CampaignDetails = () => {
  const { auth, campaign } = usePage().props;
  const [paymentUrl, setPaymentUrl] = useState(null);
  const [error, setError] = useState(null);
  const [donationAmount, setDonationAmount] = useState(''); // Estado para el monto de donación
  const [donations, setDonations] = useState([]);
  
  const getYouTubeId = (url) => {
    if (!url) return null; // Verifica si url es nulo o indefinido

    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const matches = url.match(regex);
    return matches ? matches[1] : null;
  };
  const youtubeId = getYouTubeId(campaign.youtube_link);

  useEffect(() => {
    initMercadoPago('TEST-ca5184c7-731c-4a71-9887-b5a5e97cd506'); // Public Key
  }, []);

  const openPopup = (url) => {
    const width = 600;
    const height = 800;
    const left = (window.innerWidth / 2) - (width / 2);
    const top = (window.innerHeight / 2) - (height / 2);

    window.open(
      url,
      'MercadoPago',
      `width=${width},height=${height},top=${top},left=${left}`
    );
  };

  const handleDonation = () => {
    console.log('Iniciando donación...'); // Log inicial

    if (!donationAmount) {
      setError('Por favor, ingresa un monto.');
      console.log('Monto no ingresado.'); // Log adicional
      return;
    }

    console.log('Monto a donar:', donationAmount); // Verificar el valor del monto

    // 1. Registramos la donación en la base de datos
    axios.post('/donations', {
      amount: donationAmount,
      campaign_id: campaign.id,
      user_id: auth.user.id,
      payment_status: 'pending',
    })
      .then(response => {
        console.log('Donación registrada:', response.data);
        console.log('ID de la campaña:', response.data.donation.campaign_id); // Verificar aquí

        // 2. Generamos la preferencia de pago en Mercado Pago
        return axios.post(`/campaigns/${campaign.id}/payment-preference`, { amount: donationAmount });
      })
      .then(response => {
        // Abrir la URL de pago en un popup
        console.log('URL de pago:', response.data.init_point);
        openPopup(response.data.init_point);

        // 3. Llama al evento de actualización de campaña utilizando campaign.id
        return axios.post(`/campaigns/${campaign.id}/update-event`);
      })
      .then(response => {
        console.log('Evento de actualización de campaña procesado:', response.data);
      })
      .catch(error => {
        console.error('Error al procesar la donación:', error);
        console.log('Error Response:', error.response); // Log de la respuesta de error
        setError('No se pudo completar la donación.');
      });
  };
  const handleEditClick = () => {
    router.visit(`/edit-campaign/${campaign.id}`);
  };
  return (
    <div>
      {auth.user ? (
        <AuthenticatedLayout user={auth.user}>
          <Box
            sx={{
              padding: '20px',
              backgroundColor: '#f5f5f5',
              width: '100%',
            }}
          >
            <Card sx={{ maxWidth: '100%', boxShadow: 3, borderRadius: 2 }}>
            
              <CarouselComponent images={campaign.images} />
               <CardContent>
                <Typography variant="h4" component="div" align="center" sx={{ marginBottom: 3, fontWeight: 'bold', color: '#2E3B55' }}>
                  {campaign.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" align="justify" sx={{ marginBottom: 4, fontSize: '1.1rem', lineHeight: 1.6 }}>
                  {campaign.description}
                </Typography>
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: 4,
                  p: 3,
                  backgroundColor: '#ffffff',
                  border: '1px solid #e0e0e0',
                  borderRadius: 4,
                  boxShadow: 1,
                  alignItems: 'center'
                }}>
                  <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                    <strong>Meta:</strong> ${campaign.goal}
                  </Typography>

                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Fecha de comienzo:</strong><br />
                      {new Date(campaign.start_date).toLocaleDateString('es-ES')}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Fecha de finalización:</strong><br />
                      {new Date(campaign.end_date).toLocaleDateString('es-ES')}
                    </Typography>
                  </Box>
                </Box>
                {auth.user && auth.user.id !== campaign.user_id && (
                <Box sx={{ mb: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <TextField
                    label="Monto a donar"
                    variant="filled"
                    fullWidth
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    placeholder="Ingresa el monto a donar"
                    sx={{
                      backgroundColor: '#f5f5f5', // Fondo más claro
                      borderRadius: '8px',
                      '& .MuiFilledInput-root': {
                        borderRadius: '8px',
                        '&:hover': {
                          backgroundColor: '#e0e0e0', // Color al pasar el mouse
                        },
                        '&.Mui-focused': {
                          backgroundColor: '#ffffff', // Color al estar enfocado
                          border: '1px solid #1976d2', // Borde azul al enfocar
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'text.secondary',
                      },
                    }}
                  />

                  {/* Botón para realizar la donación */}
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleDonation}
                    disabled={!donationAmount || isNaN(donationAmount)}
                    sx={{
                      padding: '12px',
                      borderRadius: '8px',
                      backgroundColor: '#1976d2',
                      '&:hover': {
                        backgroundColor: '#0d47a1', // Color más oscuro al pasar el mouse
                      },
                      transition: 'background-color 0.3s ease',
                      fontWeight: 'bold', // Texto en negrita
                      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Sombra sutil
                      '&:disabled': {
                        backgroundColor: '#e0e0e0', // Color del botón deshabilitado
                      },
                    }}
                  >
                    Donar a esta campaña
                  </Button>
                </Box>

)}
                <ProgressChart campaign={campaign} donations={donations} />
                <CampaignVideo youtubeId={youtubeId} />
                {auth.user && auth.user.id === campaign.user_id && (
                <button onClick={handleEditClick} className="btn btn-primary">
                    Editar campaña
                </button>
            )}

                {error && <Typography variant="body2" color="error" sx={{ marginTop: 2 }}>{error}</Typography>}
              </CardContent>
            </Card>
            
          </Box>
        </AuthenticatedLayout>
      ) : (
        <div className="text-center mt-5">
          <h2>Sesión expirada</h2>
          <p>Por favor, inicia sesión nuevamente.</p>
        </div>
      )}
    </div>
  );
};

export default CampaignDetails;