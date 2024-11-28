import React, { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import { Drawer, Box, Typography, Button } from "@mui/material";
import { FaFacebookF, FaWhatsapp, FaTwitter } from "react-icons/fa";
import FotoPerfil from "./FotoPerfil";
import FavoriteButton from "./FavoriteButton";
import ProgressChart from "./ProgressChart";
import axios from "axios";

const DrawerDetalles = ({ campaign, auth }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [donations, setDonations] = useState([]);

  // Efecto para obtener donaciones y favoritos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const donationsResponse = await axios.get(
          `/campaigns/${campaign.id}/donations`
        );
        setDonations(donationsResponse.data);

        const favoriteResponse = await axios.get(`/favorites/${campaign.id}`);
        setIsFavorite(favoriteResponse.data.isFavorite);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, [campaign.id]);

  const formatFecha = (fecha) => {
    const localDate = new Date(fecha + "T00:00:00"); // Forzamos como local
    return localDate.toLocaleDateString("es-ES");
  };

  const totalDonado = donations.reduce(
    (acc, donation) => acc + parseFloat(donation.amount),
    0
  );

  const handleEditClick = () => {
    router.visit(`/campaigns/${campaign.id}/edit`);
  };

  const selectedField = campaign.alias
    ? "alias"
    : campaign.cvu
    ? "cvu"
    : campaign.cbu
    ? "cbu"
    : null;

  const getFieldValue = () => {
    if (selectedField === "alias") return campaign.alias;
    if (selectedField === "cvu") return campaign.cvu;
    if (selectedField === "cbu") return campaign.cbu;
    return null;
  };

  const handleToggleFavorite = (newStatus) => {
    setIsFavorite(newStatus);
  };

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
    <Drawer sx={drawerStyle} variant="permanent" anchor="left">
      <div>
        <FotoPerfil campaign={campaign} />

        {auth.user && auth.user.id === campaign.user_id && (
          <Box margin="30px" textAlign="center" mt={3}>
            <Button
              variant="contained"
              onClick={handleEditClick}
              sx={{
                background: "linear-gradient(to right, #3b82f6, #1d4ed8)",
                color: "white",
                ":hover": {
                  background: "linear-gradient(to right, #2563eb, #1e40af)",
                },
              }}
            >
              Editar campaña
            </Button>
          </Box>
        )}

        <Box
          sx={{
            mb: 4,
            p: 3,
            backgroundColor: "#ffffff",
            border: "1px solid #e0e0e0",
            borderRadius: 4,
            boxShadow: 1,
          }}
        >
          <Typography variant="h6" color="primary" sx={{ fontWeight: "bold" }}>
            ¿Cómo donar?
          </Typography>
          <Box>
            <strong>{selectedField.toUpperCase()}:</strong> {getFieldValue()}
          </Box>
        </Box>

        <Box
          sx={{
            mb: 4,
            p: 3,
            backgroundColor: "#ffffff",
            border: "1px solid #e0e0e0",
            borderRadius: 4,
            boxShadow: 1,
          }}
        >
          <Typography variant="h6" color="primary" sx={{ fontWeight: "bold" }}>
            Meta: ${campaign.goal}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Fecha de comienzo:</strong>{" "}
            {formatFecha(campaign.start_date)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Fecha de finalización:</strong>{" "}
            {formatFecha(campaign.end_date)}
          </Typography>
        </Box>
        <ProgressChart campaign={campaign} donations={donations} />
        {auth.user && auth.user.id !== campaign.user_id && (
          <div className="mt-4 flex justify-center items-center">
            <button
              onClick={() => handleToggleFavorite()}
              aria-label={
                isFavorite ? "Eliminar de favoritos" : "Agregar a favoritos"
              }
              className="flex items-center px-1 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-600 text-black hover:from-yellow-600 hover:to-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300"
            >
              <span className="mr-2 text-lg font-semibold">
                {isFavorite ? "Favorito" : "Agregar a favoritos"}
              </span>
              <FavoriteButton
                campaignId={campaign.id}
                isFavorite={isFavorite}
                onToggle={handleToggleFavorite}
              />
            </button>
          </div>
        )}

        <Box sx={{ textAlign: "center", marginTop: "24px" }}>
          <Typography
            variant="h6"
            color="primary"
            sx={{ fontWeight: "bold", mb: 2 }}
          >
            Comparte esta campaña
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-around" }}>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=https://www.tusitio.com/campaign/${campaign.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF size={32} color="#4267B2" />
            </a>
            <a
              href={`https://api.whatsapp.com/send?text=¡Mira esta campaña! https://www.tusitio.com/campaign/${campaign.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp size={32} color="#25D366" />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=¡Apoya esta campaña!&url=https://www.tusitio.com/campaign/${campaign.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter size={32} color="#1DA1F2" />
            </a>
          </Box>
        </Box>
      </div>
    </Drawer>
  );
};

export default DrawerDetalles;
