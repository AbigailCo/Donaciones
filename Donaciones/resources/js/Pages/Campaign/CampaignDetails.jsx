import React, { useState, useEffect } from "react";
import { usePage, router } from "@inertiajs/react";
import CampaignVideo from "@/Components/Campaign/CampaignVideo";
import axios from "axios";
import { initMercadoPago } from "@mercadopago/sdk-react";
import {
  Card,
  CardContent,
  Box,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CarouselComponent from "@/Components/Campaign/CarouselComponent";
import CampaignComments from "@/Components/Campaign/CampaignComments";
import MapCampaign from "@/Components/Campaign/MapCampaign";
import CampaignNotes from "@/Components/Campaign/CampaignNotes";
import ActualizarCampaign from "@/Components/Campaign/ActualizarCampaign";
import DrawerDetalles from "@/Components/Campaign/DrawerDetalles";

const CampaignDetails = () => {
  const { auth, campaign } = usePage().props;
  const [paymentUrl, setPaymentUrl] = useState(null);
  const [error, setError] = useState(null);
  const [donationAmount, setDonationAmount] = useState("");
  const [donations, setDonations] = useState([]);

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
    window.location.reload();
  };

  useEffect(() => {
    axios
      .get(`/campaigns/${campaign.id}/donations`)
      .then((response) => setDonations(response.data))
      .catch((error) => console.error("Error al obtener donaciones:", error));
  }, [campaign.id]);

  const handleDonation = () => {
    if (!donationAmount) {
      setError("Por favor, ingresa un monto.");
      console.log("Monto no ingresado."); // Log adicional
      return;
    }

    console.log("Monto a donar:", donationAmount); // Verificar el valor del monto

    axios
      .post("/donations", {
        amount: parseFloat(donationAmount),
        campaign_id: campaign.id,
        user_id: auth.user.id,
        payment_status: "pending",
      })
      .then((response) => {
        console.log("Donación registrada:", response.data);

        return axios.post(`/campaigns/${campaign.id}/payment-preference`, {
          amount: donationAmount,
        });
      })
      .then((response) => {

        openPopup(response.data.init_point);
      })
      .catch((error) => {
        console.error("Error al procesar la donación:", error);
        console.log("Error Response:", error.response); // Log de la respuesta de error
        setError("No se pudo completar la donación.");
      });
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    padding: "20px",
    backgroundColor: "#f5f5f5",
  };

  const cardStyle = {
    maxWidth: "80%",
    width: "80%",
    boxShadow: 3,
    borderRadius: 2,
  };

  return (
    <div>
      {auth.user ? (
        <AuthenticatedLayout user={auth.user}>
          <Box sx={{ ...containerStyle, marginTop: "24px" }}>
            <DrawerDetalles campaign={campaign} auth={auth} />
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
                  (estaCerrada ? (
                    <Typography
                      variant="body1"
                      align="center"
                      sx={{
                        background: "linear-gradient(90deg, #ff0000, #ff7043)",
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
                  ) : totalDonado < campaign.goal ? (
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
                        placeholder="Ingresa el monto a donar"
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
                        background: "linear-gradient(90deg, #4a90e2, #ff00d9)", 
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
                {auth.user && auth.user.id === campaign.user_id && (
                  <Box margin="30px" textAlign="center" mt={3}>
                    <ActualizarCampaign campaign={campaign} />
                  </Box>
                )}
                <CampaignNotes campaignId={campaign.id} />
                {auth.user && auth.user.id !== campaign.user_id && (
                  <CampaignComments
                    campaign={campaign}
                    currentUser={auth.user}
                  />
                )}

                <CampaignVideo youtubeId={youtubeId} />
                <MapCampaign campaign={campaign} />
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
