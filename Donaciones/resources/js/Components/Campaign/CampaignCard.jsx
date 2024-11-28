import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { usePage, router } from "@inertiajs/react";
import { Card, CardContent, Typography } from "@mui/material";
import { Link } from "@inertiajs/react";
import Carousel from "react-bootstrap/Carousel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FavoriteButton from "./FavoriteButton";

import FotoPerfil from "./FotoPerfil";
import ActualizarCampaign from "./ActualizarCampaign";

const getYouTubeId = (url) => {
  if (!url) return null;
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const matches = url.match(regex);
  return matches ? matches[1] : null;
};

const CampaignCard = ({ campaign }) => {
  const { auth } = usePage().props;
  /*   const youtubeId = getYouTubeId(campaign.youtube_link); */
  const [isFavorite, setIsFavorite] = useState(false);

  const handleEditCampaign = () => {
    router.visit(`/campaigns/${campaign.id}/edit`);
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

  return (
    <Card style={{ cursor: "pointer", marginBottom: "20px" }}>
      <div>
        <FotoPerfil campaign={campaign} />
      </div>
      <Carousel>
        {Array.isArray(campaign.images) && campaign.images.length > 0 ? (
          campaign.images.map((image, index) => (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100"
                src={`/storage/images/${image.path}`}
                alt={`Imagen de la campaña ${index}`}
                style={{ height: "200px", objectFit: "cover" }}
              />
            </Carousel.Item>
          ))
        ) : (
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/storage/images/defecto.jpg"
              alt="Imagen por defecto"
              style={{ height: "200px", objectFit: "cover" }}
            />
          </Carousel.Item>
        )}
      </Carousel>

      <Link
        href={`/campaigns/${campaign.id}`}
        style={{ textDecoration: "none" }}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {campaign.title}
          </Typography>

          <Typography variant="body1" color="text.primary">
            {campaign?.category?.name
              ? `Categoria: ${campaign.category.name}`
              : "No category selected"}
          </Typography>
          <Typography variant="body1" color="text.primary">
            Meta: ${campaign.goal}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Fechas: {new Date(campaign.start_date).toLocaleDateString("es-ES")}{" "}
            al {new Date(campaign.end_date).toLocaleDateString("es-ES")}
          </Typography>
        </CardContent>
      </Link>

      {auth.user && auth.user.id !== campaign.user_id && (
        <div className="flex justify-center items-center h-full ">
          <div
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
          </div>
        </div>
      )}
      {auth.user && auth.user.id === campaign.user_id && (
        <>
          <div className="flex justify-center items-center h-full">
            <button
              onClick={handleEditCampaign}
              className="flex justify-center items-center h-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-1 px-2 rounded-lg shadow-md hover:shadow-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300"
            >
              Editar campaña
            </button>
            <ActualizarCampaign campaign={
              campaign
            }/>
          </div>
        </>
      )}

      
    </Card>
  );
};

export default CampaignCard;
