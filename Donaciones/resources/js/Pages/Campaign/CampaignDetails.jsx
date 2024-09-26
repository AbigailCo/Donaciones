import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { Wallet } from '@mercadopago/sdk-react'; 
import axios from 'axios';
import { initMercadoPago } from '@mercadopago/sdk-react';

const CampaignDetails = () => {
  const { auth, campaign } = usePage().props;
  const [preferenceId, setPreferenceId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`/campaigns/${campaign.id}/payment-preference`)
      .then(response => {
        console.log('ID de preferencia recibida:', response.data.preference_id);
        setPreferenceId(response.data.preference_id);
      })
      .catch(error => {
        console.error('Error al obtener el ID de la preferencia:', error);
        setError('No se pudo obtener el ID de la preferencia.');
      });
  }, [campaign.id]);

  useEffect(() => {
    // ACA va la public key de mp / NO el access token
    initMercadoPago('TEST-ca5184c7-731c-4a71-9887-b5a5e97cd506');

  }, []);

  return (
    <div>
      {auth.user ? (
        <div>
          <h1>{campaign.title}</h1>
          <h2>Donar a esta campaña</h2>
          {preferenceId ? (
            <Wallet initialization={{ preferenceId }} />
          ) : (
            <p>Cargando ID de preferencia...</p>
          )}
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      ) : (
        <p>Sesión expirada. Por favor, inicia sesión nuevamente.</p>
      )}
    </div>
  );
};

export default CampaignDetails;


