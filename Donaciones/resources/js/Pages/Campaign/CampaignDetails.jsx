import React, { useState, useEffect } from 'react';
import { usePage, router } from '@inertiajs/react';
import CampaignVideo from '../../Components/Campaign/CampaignVideo';
import axios from 'axios';
import { initMercadoPago } from '@mercadopago/sdk-react';
import { Card, CardContent, Typography, Box, TextField, Button } from '@mui/material';
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
    initMercadoPago('TEST-ca5184c7-731c-4a71-9887-b5a5e97cd506'); // Public Key
  }, []);

  const handleDonation = () => {
    if (!donationAmount) {
      setError('Por favor, ingresa un monto.');
      return;
    }

    axios.post('/donations', {
      amount: donationAmount,
      campaign_id: campaign.id,
      user_id: auth.user.id,
      payment_status: 'pending',
    })
    .then(response => {
      return axios.post(`/campaigns/${campaign.id}/payment-preference`, { amount: donationAmount });
    })
    .then(response => {
      openPopup(response.data.init_point);
      return axios.post(`/campaigns/${campaign.id}/update-event`);
    })
    .catch(error => {
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
          <Box sx={{ padding: '20px', backgroundColor: '#f5f5f5', width: '100%' }}>
            <Card sx={{ maxWidth: '100%', boxShadow: 3, borderRadius: 2 }}>
              <CarouselComponent images={campaign.images} />
              <CardContent>
                <Typography variant="h4" component="div" align="center" sx={{ marginBottom: 3, fontWeight: 'bold', color: '#2E3B55' }}>
                  {campaign.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" align="justify" sx={{ marginBottom: 4, fontSize: '1.1rem', lineHeight: 1.6 }}>
                  {campaign.description}
                </Typography>

                {/* Sección de comentarios */}
                <CampaignComments campaign={campaign} currentUser={auth.user} />


                <ProgressChart campaign={campaign} donations={donations} />
                <CampaignVideo youtubeId={youtubeId} />

                {auth.user && auth.user.id === campaign.user_id && (
                  <Button onClick={handleEditClick} variant="contained" color="primary">
                    Editar campaña
                  </Button>
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
