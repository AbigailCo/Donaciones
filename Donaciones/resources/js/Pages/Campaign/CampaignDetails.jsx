import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import CampaignVideo from "../../Components/Campaign/CampaignVideo";
import axios from "axios";
import { initMercadoPago } from "@mercadopago/sdk-react";
import {
  Card,
  CardContent,
  Box,
  TextField,
  Button,
  Typography,
  Drawer,
} from "@mui/material";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CarouselComponent from "../../Components/Campaign/CarouselComponent";
import ProgressChart from "../../Components/Campaign/ProgressChart";
import CampaignComments from "../../Components/Campaign/CampaignComments";
import MapCampaign from "@/Components/Campaign/MapCampaign";
import FavoriteButton from '@/Components/Campaign/FavoriteButton';
import CampaignNotes from "../../Components/Campaign/CampaignNotes";

const CampaignDetails = () => {
  const { auth, campaign } = usePage().props;
  const [paymentUrl, setPaymentUrl] = useState(null);
  const [error, setError] = useState(null);
  const [donationAmount, setDonationAmount] = useState("");
  const [donations, setDonations] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  const totalDonado = donations.reduce(
    (acc, donation) => acc + parseFloat(donation.amount),
    0
  );
  const fechaActual = new Date();
  const fechaFinalizacion = new Date(campaign.end_date);
  const estaCerrada = fechaActual > fechaFinalizacion;

  const getYouTubeId = (url) => {
    if (!url) return null;
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const matches = url.match(regex);
    return matches ? matches[1] : null;
  };
  const youtubeId = getYouTubeId(campaign.youtube_link);

  useEffect(() => {
    initMercadoPago("TEST-ca5184c7-731c-4a71-9887-b5a5e97cd506");
  }, []);

  const openPopup = (url) => {
    const width = 600;
    const height = 800;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;
    window.open(
      url,
      "MercadoPago",
      `width=${width},height=${height},top=${top},left=${left}`
    );
  };

  useEffect(() => {
    axios
      .get(`/campaigns/${campaign.id}/donations`)
      .then((response) => setDonations(response.data))
      .catch((error) => console.error("Error al obtener donaciones:", error));
  }, [campaign.id]);

  const handleDonation = () => {
    console.log("Iniciando donación..."); // Log inicial
    if (!donationAmount) {
      setError("Por favor, ingresa un monto.");
      console.log("Monto no ingresado."); // Log adicional
      return;
    }

    console.log("Monto a donar:", donationAmount); // Verificar el valor del monto
    // 1. Registramos la donación en la base de datos
    axios
      .post("/donations", {
        amount: donationAmount,
        campaign_id: campaign.id,
        user_id: auth.user.id,
        payment_status: "pending",
      })
      .then((response) => {
        console.log("Donación registrada:", response.data);
        console.log("ID de la campaña:", response.data.donation.campaign_id); // Verificar aquí
        // 2. Generamos la preferencia de pago en Mercado Pago
        return axios.post(`/campaigns/${campaign.id}/payment-preference`, {
          amount: donationAmount,
        });
      })
      .then((response) => {
        // Abrir la URL de pago en un popup
        console.log("URL de pago:", response.data.init_point);
        openPopup(response.data.init_point);
        // 3. Llama al evento de actualización de campaña utilizando campaign.id
        return axios.post(`/campaigns/${campaign.id}/update-event`);
      })
      .then((response) => {
        console.log(
          "Evento de actualización de campaña procesado:",
          response.data
        );
      })
      .catch((error) => {
        console.error("Error al procesar la donación:", error);
        console.log("Error Response:", error.response); // Log de la respuesta de error
        setError("No se pudo completar la donación.");
      });
  };

  const handleEditClick = () => {
    router.visit(`/edit-campaign/${campaign.id}`);
  };
  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      try {
        const response = await axios.get(`/favorites/${campaign.id}`);
        setIsFavorite(response.data.isFavorite);
      } catch (error) {
        console.error("Error fetching favorite status:", error);
      }
    };

    fetchFavoriteStatus();
  }, [campaign.id]);
  const handleToggleFavorite = (newStatus) => {
    setIsFavorite(newStatus);
  };

  // Ajustes de estilo de contenedor
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    padding: "20px",
    backgroundColor: "#f5f5f5",
  };

  // Estilo para la Card al 80% del ancho y centrado
  const cardStyle = {
    maxWidth: "80%", // Siempre al 80% del ancho de la pantalla
    width: "80%",
    boxShadow: 3,
    borderRadius: 2,
  };

  // Estilo para el Drawer
  const drawerStyle = {
    width: 300,
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      width: 300,
      boxSizing: "border-box",
      padding: "20px",
      marginTop: "108px",
      height: "calc(100vh - 100px)",
      overflow: "auto",
    },
  };
  return (
    <div>
      {auth.user ? (
        <AuthenticatedLayout user={auth.user}>
          <Box sx={{ ...containerStyle, marginTop: "24px" }}>
            {/* Panel Lateral */}
            <Drawer
              sx={drawerStyle}
              variant="permanent"
              anchor="left"
            >

              <div>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 4,
                    p: 3,
                    backgroundColor: "#ffffff",
                    border: "1px solid #e0e0e0",
                    borderRadius: 4,
                    boxShadow: 1,
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="h6"
                    color="primary"
                    sx={{ fontWeight: "bold" }}
                  >
                    <strong>Meta:</strong> ${campaign.goal}
                  </Typography>
                  <Box sx={{ textAlign: "right" }}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Fecha de comienzo:</strong>
                      <br />
                      {new Date(campaign.start_date).toLocaleDateString(
                        "es-ES"
                      )}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Fecha de finalización:</strong>
                      <br />
                      {new Date(campaign.end_date).toLocaleDateString("es-ES")}
                    </Typography>
                  </Box>

                </Box>
                {auth.user && auth.user.id !== campaign.user_id && (
                <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  color: 'black',
                  padding: '16px',
                  borderRadius: '8px',
                  borderColor: '#f6ff00',
                  boxShadow: 3,
                  maxWidth: '250px', 
                  margin: 'auto', 
                   // Agrega la animación de parpadeo
                }}
              >
                <Typography variant="h6" sx={{ marginBottom: '8px' }}>
                  Agregar a favoritos
                </Typography>
                <FavoriteButton
                  campaignId={campaign.id}
                  isFavorite={isFavorite}
                  onToggle={handleToggleFavorite}
                  
                />
              </Box>
                )}
                <ProgressChart campaign={campaign} donations={donations} />
              </div>


            </Drawer>
            <Card sx={cardStyle}>
              <CarouselComponent images={campaign.images} />
              <CardContent>
                <Typography
                  variant="h4"
                  align="center"
                  sx={{ marginBottom: 3, fontWeight: "bold", color: "#2E3B55" }}
                >
                  {campaign.title}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  align="justify"
                  sx={{ marginBottom: 4 }}
                >
                  {campaign.description}
                </Typography>


                {auth.user &&
                  auth.user.id !== campaign.user_id &&
                  // Verificamos si la campaña ha cerrado o si ha alcanzado la meta

                  (estaCerrada ? (
                    <Typography
                      variant="body1"
                      align="center"
                      sx={{
                        background: "linear-gradient(90deg, #ff0000, #ff7043)", // Rojo para "cerrada"
                        border: "none",
                        color: "#ffffff",
                        fontWeight: "bold",
                        padding: "10px 20px",
                        borderRadius: "30px",
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                        transition: "transform 0.2s, box-shadow 0.2s",
                      }}
                    >
                      ¡La campaña ha cerrado! Gracias por tu apoyo.
                    </Typography>
                  ) : // Si la campaña no está cerrada, mostramos si aún se puede donar o si la meta ha sido alcanzada
                    totalDonado < campaign.goal ? (
                      <Box
                        sx={{
                          mb: 4,
                          display: "flex",
                          flexDirection: "column",
                          gap: 3,
                        }}
                      >
                        <TextField
                          label="Monto a donar"
                          variant="filled"
                          fullWidth
                          value={donationAmount}
                          onChange={(e) => setDonationAmount(e.target.value)}
                        />
                        <Button
                          variant="contained"
                          color="primary"
                          fullWidth
                          onClick={handleDonation}
                        >
                          Donar a esta campaña
                        </Button>
                      </Box>
                    ) : (
                      <Typography
                        variant="body1"
                        align="center"
                        sx={{
                          background: "linear-gradient(90deg, #4a90e2, #ff00d9)", // Colores para meta alcanzada
                          border: "none",
                          color: "#000000",
                          fontWeight: "bold",
                          padding: "10px 20px",
                          borderRadius: "30px",
                          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                          transition: "transform 0.2s, box-shadow 0.2s",
                        }}
                      >
                        ¡La meta ha sido alcanzada! Gracias por tu apoyo.
                      </Typography>
                    ))}

                {error && <Typography color="error">{error}</Typography>}
                {/* Aquí se agrega el componente CampaignNotes */}
                <CampaignNotes campaignId={campaign.id} />
                <CampaignComments campaign={campaign} currentUser={auth.user} />
                <CampaignVideo youtubeId={youtubeId} />
                <MapCampaign campaign={campaign} />

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
