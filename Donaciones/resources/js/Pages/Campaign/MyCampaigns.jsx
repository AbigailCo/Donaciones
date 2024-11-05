import React from 'react';
import { Grid } from '@mui/material';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CampaignCard from '../../Components/Campaign/CampaignCard';

const MyCampaigns = ({ campaigns, auth }) => {
  if (!auth.user) {
    return (
      <div className="text-center mt-5">
        <h2>Sesión expirada</h2>
        <p>Por favor, inicia sesión nuevamente.</p>
      </div>
    );
  }

  return (
    <AuthenticatedLayout user={auth.user}>
      <div className="container mt-4">
        <h1 className="text-center">Mis Campañas</h1>
        {campaigns.length > 0 ? (
          <Grid container spacing={3}>
            {campaigns.map((campaign) => (
              <Grid item xs={12} sm={6} md={4} key={campaign.id}>
                <CampaignCard campaign={campaign} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <p className="text-center">No tienes campañas creadas.</p>
        )}
      </div>
    </AuthenticatedLayout>
  );
};

export default MyCampaigns;
