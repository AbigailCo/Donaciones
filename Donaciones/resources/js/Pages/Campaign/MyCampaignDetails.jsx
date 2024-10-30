import React, { useState, useEffect } from 'react';
import { usePage, router } from '@inertiajs/react';
import Carousel from 'react-bootstrap/Carousel';
import CampaignVideo from '../../Components/Campaign/CampaignVideo';
import axios from 'axios';
import { initMercadoPago } from '@mercadopago/sdk-react';
import { Card, CardContent, Typography, Box, TextField, Button, CircularProgress } from '@mui/material';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PieChart, Pie, Cell } from 'recharts';
import { useNavigate } from 'react-router-dom';


const MyCampaignDetails = () => {
  const { auth, campaign } = usePage().props;
  const [paymentUrl, setPaymentUrl] = useState(null);
  const [error, setError] = useState(null);
  const [donationAmount, setDonationAmount] = useState('');
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleEditClick = () => {

    router.visit(`/edit-campaign/${campaign.id}`);
  };

  const totalDonado = donations.reduce((acc, donation) => acc + parseFloat(donation.amount), 0);
  const COLORS = ['#0088FE', '#FF8042'];

  // Obtener el ID de YouTube
  const getYouTubeId = (url) => {
    if (!url) return null;
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const matches = url.match(regex);
    return matches ? matches[1] : null;
  };
  const youtubeId = getYouTubeId(campaign.youtube_link);

  useEffect(() => {
    initMercadoPago('TEST-ca5184c7-731c-4a71-9887-b5a5e97cd506'); // Public Key
    axios.get(`/campaigns/${campaign.id}/donations`)
      .then(response => {
        setDonations(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching donations:', error);
        setLoading(false);
      });
  }, [campaign.id]);

  const openPopup = (url) => {
    const width = 600;
    const height = 800;
    const left = (window.innerWidth / 2) - (width / 2);
    const top = (window.innerHeight / 2) - (height / 2);

    window.open(url, 'MercadoPago', `width=${width},height=${height},top=${top},left=${left}`);
  };

  const handleDonation = () => {
    if (!donationAmount) {
      setError('Por favor, ingresa un monto.');
      return;
    }

    // Registrar la donación y generar la preferencia de pago
    axios.post('/donations', {
      amount: donationAmount,
      campaign_id: campaign.id,
      user_id: auth.user.id,
      payment_status: 'paid',
    })
    .then(response => {
      return axios.post(`/campaigns/${campaign.id}/payment-preference`, { amount: donationAmount });
    })
    .then(response => {
      openPopup(response.data.init_point);
    })
    .catch(error => {
      console.error('Error al procesar la donación:', error);
      setError('No se pudo completar la donación.');
    });
  };

  // Datos para el gráfico de progreso
  const data = [
    { name: 'Donado', value: totalDonado },
    { name: 'Faltante', value: campaign.goal - totalDonado },
  ];

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
                        src={`/storage/images/${image.path}`}
                        alt={`Imagen de la campaña ${index}`}
                        style={{ height: '300px', objectFit: 'cover' }}
                      />
                    </Carousel.Item>
                  ))
                ) : (
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src="/storage/images/defecto.jpg"
                      alt="Imagen por defecto"
                      style={{ height: '300px', objectFit: 'cover' }}
                    />
                  </Carousel.Item>
                )}
              </Carousel>
              <CardContent>
                <Typography variant="body1" color="text.primary">
                 {campaign?.category?.name
              ? `Categoria: ${campaign.category.name}`
              : 'No category selected'}
                </Typography>
                <Typography gutterBottom variant="h4" component="div" align="center">
                  {campaign.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" align="justify" sx={{ marginBottom: 2 }}>
                  {campaign.description}
                </Typography>
                <CampaignVideo youtubeId={youtubeId} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body1" color="text.primary">
                    <strong>Metyyyya:</strong> ${campaign.goal}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    <strong>Fecha de comienzo:</strong> {new Date(campaign.start_date).toLocaleDateString('es-ES')} <br />
                    <strong>Fecha de finalización:</strong> {new Date(campaign.end_date).toLocaleDateString('es-ES')}
                  </Typography>
                </Box>

                <Typography variant="h6" sx={{ mt: 4 }}>Donaciones realizadas:</Typography>
                {donations.length > 0 ? (
                  <ul>
                    {donations.map((donation, index) => (
                      <li key={index}>
                        <strong>Monto:</strong> ${donation.amount} - <strong>Estado:</strong> {donation.payment_status}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No se han realizado donaciones aún.</p>
                )}

                <Typography variant="h6" sx={{ mt: 4 }}>Progreso hacia la meta:</Typography>
                <PieChart width={400} height={200}>
                  <Pie
                    data={data}
                    cx={200}
                    cy={100}
                    innerRadius={50}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
                <Typography>
                  Total Donado: ${totalDonado.toFixed(2)} / Meta: ${parseFloat(campaign.goal).toFixed(2)}
                </Typography>

                {/* Botón de Editar */}
                <button onClick={handleEditClick} className="btn btn-primary">
      Editar campaña
    </button>

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

export default MyCampaignDetails;



