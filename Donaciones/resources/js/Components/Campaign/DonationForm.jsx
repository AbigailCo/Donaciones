import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import axios from 'axios';

const DonationForm = ({ donationAmount, setDonationAmount, campaignId, authUserId }) => {
    const [error, setError] = useState(null);

    const handleDonation = () => {
        if (!donationAmount) {
            setError('Por favor, ingresa un monto.');
            return;
        }

        axios.post('/donations', {
            amount: donationAmount,
            campaign_id: campaignId,
            user_id: authUserId,
            payment_status: 'paid',
        })
        .then(response => {
            // lógica para manejar la respuesta después de registrar la donación
        })
        .catch(error => {
            console.error('Error al procesar la donación:', error);
            setError('No se pudo completar la donación.');
        });
    };

    return (
        <div>
            <TextField
                label="Monto a donar"
                variant="outlined"
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
                disabled={!donationAmount || isNaN(donationAmount)}
            >
                Donar a esta campaña
            </Button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default DonationForm;
