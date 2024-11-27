import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { IconButton } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { CircularProgress } from "@mui/material"; // Para mostrar carga mientras está en proceso

const FavoriteButton = ({ campaignId, isFavorite, onToggle }) => {
  const [loading, setLoading] = useState(false);

  const toggleFavorite = async () => {
    setLoading(true);
    try {
      if (isFavorite) {
        await axios.delete(`/favorites/${campaignId}`);
        toast.success("La campaña dejo de ser tu favorita");
      } else {
        await axios.post(`/favorites/${campaignId}`);
        toast.success("Campaña añadida a favoritos");
      }
      onToggle(!isFavorite); // Actualizar el estado en el componente padre
    } catch (error) {
      toast.error("Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center">
      <IconButton
        onClick={toggleFavorite}
        disabled={loading}
        className={`border-2 p-2 rounded-full transition-all duration-300 ${
          isFavorite
            ? "border-yellow-500 text-yellow-500 hover:bg-yellow-100"
            : "border-gray-300 text-gray-500 hover:bg-gray-100"
        }`}
      >
        {loading ? (
          <CircularProgress size={16} color="inherit" />
        ) : isFavorite ? (
          <StarIcon />
        ) : (
          <StarBorderIcon />
        )}
      </IconButton>
    </div>
  );
};

export default FavoriteButton;
