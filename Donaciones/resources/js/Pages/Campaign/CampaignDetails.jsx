import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import CampaignVideo from '../../Components/Campaign/CampaignVideo';
import axios from 'axios';
import { initMercadoPago } from '@mercadopago/sdk-react';
import { Card, CardContent, Box, TextField, Button, Typography } from '@mui/material';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CarouselComponent from '../../Components/Campaign/CarouselComponent';
import ProgressChart from '../../Components/Campaign/ProgressChart';
import CampaignComments from '../../Components/Campaign/CampaignComments';

const CampaignDetails = () => {
  const { auth, campaign } = usePage().props;
  const [paymentUrl, setPaymentUrl] = useState(null);
  const [error, setError] = useState(null);
  const [donationAmount, setDonationAmount] = useState(''); 
  const [donations, setDonations] = useState([]);

  const getYouTubeId = (url) => {
    if (!url) return null;
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const matches = url.match(regex);
    return matches ? matches[1] : null;
  };
  const youtubeId = getYouTubeId(campaign.youtube_link);


  useEffect(() => {
    initMercadoPago('TEST-ca5184c7-731c-4a71-9887-b5a5e97cd506');
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

  useEffect(() => {
    axios.get(`/campaigns/${campaign.id}/donations`)
      .then(response => setDonations(response.data))
      .catch(error => console.error("Error al obtener donaciones:", error));
  }, [campaign.id]);

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

  // Ajustes de estilo de contenedor
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: '#f5f5f5',
  };

  // Estilo para la Card al 80% del ancho y centrado
  const cardStyle = {
    maxWidth: '80%', // Siempre al 80% del ancho de la pantalla
    width: '80%',
    boxShadow: 3,
    borderRadius: 2,
  };

  return (
    <div>
      {auth.user ? (
        <AuthenticatedLayout user={auth.user}>
          <Box sx={containerStyle}>
            <Card sx={cardStyle}>
              <CarouselComponent images={campaign.images} />
              <CardContent>
                <Typography variant="h4" align="center" sx={{ marginBottom: 3, fontWeight: 'bold', color: '#2E3B55' }}>
                  {campaign.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" align="justify" sx={{ marginBottom: 4 }}>
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
                    />
                    <Button variant="contained" color="primary" fullWidth onClick={handleDonation}>
                      Donar a esta campaña
                    </Button>
                  </Box>
                )}
                {error && <Typography color="error">{error}</Typography>}

                <CampaignComments campaign={campaign} currentUser={auth.user} />
                <ProgressChart campaign={campaign} donations={donations} />
                <CampaignVideo youtubeId={youtubeId} />

                {auth.user && auth.user.id === campaign.user_id && (
                  <Box textAlign="center" mt={3}>
                    <Button variant="contained" onClick={handleEditClick}>
                      Editar campaña
                    </Button>
                  </Box>
                )}
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
