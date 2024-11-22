import React from 'react';
import { Grid, Typography } from '@mui/material';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CampaignCard from '../../Components/Campaign/CampaignCard';
import { Head } from '@inertiajs/react';
import Sidebar from '@/Components/Dashboard/Sidebar';

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

      {/* Contenedor principal con flexbox para organizar el sidebar y el contenido */}
      <div className="d-flex h-100">

        
        <div className="w-1/5">
          <Sidebar auth={auth} />
        </div>

        {/* Contenido principal */}
        <div className="flex-1 mt-12 mx-4">
        
          <h1 className="mt-4 text-center">Mis campañas</h1>
          {campaigns.length > 0 ? (
            <Grid container spacing={3}>
              {campaigns.map((campaign) => (
                <Grid item xs={12} sm={6} md={4} key={campaign.id}>
                  <CampaignCard campaign={campaign} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography className="text-center" variant="h5" color="textSecondary">
              Todavía no creaste ninguna campaña en esta aplicación.
            </Typography>
          )}
        </div>
      </div>

    </AuthenticatedLayout>
  );
};

export default MyCampaigns;
