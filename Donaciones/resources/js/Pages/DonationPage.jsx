import React from 'react';
import { Payment } from '@mercadopago/sdk-react';

const DonationPage = () => {
  return (
    <div>
      <h1>Donar a esta campaña</h1>
      <Payment
        initialization={{
          amount: 1000, // Elige el monto de la donación
          preferenceId: 'TU_PREFERENCE_ID', // Asegúrate de obtener el ID de preferencia
        }}
        onSubmit={async (param) => {
          console.log('Datos de pago:', param);
        }}
      />
    </div>
  );
};

export default DonationPage;
