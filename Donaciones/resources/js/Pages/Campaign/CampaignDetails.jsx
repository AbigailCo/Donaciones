import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import Carousel from 'react-bootstrap/Carousel';
import CampaignVideo from '../../Components/Campaign/CampaignVideo';
import axios from 'axios';
import { initMercadoPago } from '@mercadopago/sdk-react';
import { Card, CardContent, CardMedia, Typography, Box, TextField, Button } from '@mui/material';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const CampaignDetails = () => {
  
  const { auth, campaign } = usePage().props;
  const [paymentUrl, setPaymentUrl] = useState(null);
  const [error, setError] = useState(null);
  const [donationAmount, setDonationAmount] = useState(''); // Estado para el monto de donación

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
        // 2. Generamos la preferencia de pago en Mercado Pago
        return axios.post(`/campaigns/${campaign.id}/payment-preference`, { amount: donationAmount });
    })
    .then(response => {
        // Abrir la URL de pago en un popup
        openPopup(response.data.init_point);
    })
    .catch(error => {
        console.error('Error al procesar la donación:', error);
        console.log('Error Response:', error.response); // Log de la respuesta de error
        setError('No se pudo completar la donación.');
    });
};


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
              backgroundColor: '#f5f5f5'
            }}
          >
            <Card sx={{ maxWidth: 600, boxShadow: 3 }}>
              <Carousel>
                {Array.isArray(campaign.images) && campaign.images.length > 0 ? (
                  campaign.images.map((image, index) => (
                    <Carousel.Item key={index}>
                      <img
                        className="d-block w-100"
                        src={`/storage/images/${image.path}`} // Asegúrate de que `path` sea correcto
                        alt={`Imagen de la campaña ${index}`}
                        style={{ height: '300px', objectFit: 'cover' }} // Puedes ajustar el estilo según lo necesario
                      />
                    </Carousel.Item>
                  ))
                ) : (
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src="/storage/images/defecto.jpg" // Cambia esta ruta a una imagen por defecto
                      alt="Imagen por defecto"
                      style={{ height: '300px', objectFit: 'cover' }} // Ajusta el estilo de la imagen por defecto
                    />
                  </Carousel.Item>
                )}
              </Carousel>
              <CardContent>
                 <Typography variant="body1" color="text.primary">
                 Categoriagggg: {campaign.category?.name}
          </Typography>
                <Typography gutterBottom variant="h4" component="div" align="center">
                  {campaign.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" align="justify" sx={{ marginBottom: 2 }}>
                  {campaign.description}
                </Typography>
                <CampaignVideo youtubeId={youtubeId}/>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body1" color="text.primary">
                    <strong>Meta:</strong> ${campaign.goal}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    <strong>Fecha de comienzo:</strong> {new Date(campaign.start_date).toLocaleDateString('es-ES')} <br />
                    <strong>Fecha de finalización:</strong> {new Date(campaign.end_date).toLocaleDateString('es-ES')}
                  </Typography>
                </Box>

                {/* Input para el monto de donación */}
                <Box sx={{ mb: 2 }}>
                  <TextField
                    label="Monto a donar"
                    variant="outlined"
                    fullWidth
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    placeholder="Ingresa el monto a donar"
                  />
                </Box>

                {/* Botón para realizar la donación */}
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleDonation}
                  disabled={!donationAmount || isNaN(donationAmount)}
                >
                  Donar a esta campaña
                </Button>

                {error && <p style={{ color: 'red' }}>{error}</p>}
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


