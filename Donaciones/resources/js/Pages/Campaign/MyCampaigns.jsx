import React from 'react';
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CampaignCard from '../../Components/Campaign/CampaignCard';
import { Head } from '@inertiajs/react';

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
      <Head title="Mis campañas" />
      <div className="container mt-20" >
      
      <h1 className="mt-4 text-center">Mis Campañas</h1>
        {campaigns.length > 0 ? (
          <Grid container spacing={3}>
            {campaigns.map((campaign) => (
              <Grid item xs={12} sm={6} md={4} key={campaign.id}>
                <CampaignCard campaign={campaign} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography className="text-center" variant="h4" gutterBottom>
            Todavia no creaste ninguna campaña en esta aplicacion
          </Typography>
        )}
      </div>
      
    </AuthenticatedLayout>
  );
};

export default MyCampaigns;
