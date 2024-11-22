import React from 'react';
import { Grid, Typography } from '@mui/material';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CampaignCard from '@/Components/Campaign/CampaignCard';
import { Head } from '@inertiajs/react';
import Sidebar from '@/Components/Dashboard/Sidebar';


const FavoritesPage = ({ favorites, auth }) => {
    console.log(favorites)
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
      <Head title="Mis favoritos" />
      <div className="d-flex h-100">
        <div className="w-1/5">
          <Sidebar auth={auth} />
        </div>
        <div className="flex-1 mt-12 mx-4">
          <h1 className="mt-4 text-center">Mis Favoritos</h1>
          {favorites.length > 0 ? (
            <Grid container spacing={3}>
              {favorites.map((favorite) => (
                <Grid item xs={12} sm={6} md={4} key={favorite.id}>
                   <CampaignCard key={favorite.id} campaign={favorite.campaign} />              
                </Grid>       
              ))} 
            </Grid>
          ) : (
            <Typography className="text-center" variant="h5" color="textSecondary">
              Todavía no tienes ningun favorito
            </Typography>
          )}
        </div>
      </div>

    </AuthenticatedLayout>
  );
};

export default FavoritesPage;
