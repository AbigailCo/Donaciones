import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { CircularProgress } from '@mui/material'; // Para mostrar carga mientras está en proceso

const FavoriteButton = ({ campaignId, isFavorite, onToggle }) => {
    const [loading, setLoading] = useState(false);

    const toggleFavorite = async () => {
        setLoading(true);
        try {
            if (isFavorite) {
                await axios.delete(`/favorites/${campaignId}`);
                toast.success("Removed from favorites");
            } else {
                await axios.post(`/favorites/${campaignId}`);
                toast.success("Added to favorites");
            }
            onToggle(!isFavorite); // Actualizar el estado en el componente padre
        } catch (error) {
            toast.error("Error updating favorite");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <IconButton 
                onClick={toggleFavorite} 
                disabled={loading} 
                style={{
                    color: isFavorite ? '#FFD700' : '#ccc', // Estilo dorado cuando es favorito
                    transition: 'color 0.3s',
                    padding: '10px',
                }}
            >
                {loading ? (
                    <CircularProgress size={24} color="primary" />
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
