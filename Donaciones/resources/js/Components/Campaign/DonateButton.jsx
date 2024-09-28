import React from 'react';
import axios from 'axios';

const DonateButton = ({ campaignId, amount }) => {
  const handleDonation = async () => {
    try {
      // Hacer la solicitud a tu backend para crear la preferencia
      const response = await axios.post('http://localhost:8000/api/create-payment', {
        title: 'Donación a la campaña',
        quantity: 1,
        unit_price: amount,
      });

      const { init_point } = response.data;

      // Redirigir al usuario a Mercado Pago
      window.location.href = init_point;

    } catch (error) {
      console.error('Error al crear la donación:', error.response ? error.response.data : error.message);
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
