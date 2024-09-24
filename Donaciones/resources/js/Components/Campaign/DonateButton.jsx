import React from 'react';
import axios from 'axios';

const DonateButton = ({ campaignId, amount }) => {
    const handleDonation = async () => {
        try {
            // 1. Crear la preferencia de pago
            const response = await axios.post('/donations/create', {
                campaign_id: campaignId,
                amount: amount,
            });

            // 2. Redirigir al usuario a Mercado Pago
            const { init_point } = response.data; // asumiendo que la API devuelve la URL para redirigir
            window.location.href = init_point; // Redirigir al usuario a Mercado Pago

        } catch (error) {
            console.error('Error al crear la donación:', error.response ? error.response.data : error.message);
            // Manejar el error, mostrar mensaje al usuario, etc.
            alert('Ocurrió un error al procesar la donación. Por favor, intenta de nuevo.');
        }
    };

    return (
        <button onClick={handleDonation} className="btn btn-primary">
            Donar {amount} a la campaña
        </button>
    );
};

export default DonateButton;
