import React from 'react';
import { usePage } from '@inertiajs/react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';


const CampaignDetails = () => {
  const { campaign } = usePage().props;
  const { auth } = usePage().props; // Asegúrate de obtener la información del usuario


  return (
    <div>
    {auth.user ? (  // Verifica si el usuario está logueado
      <AuthenticatedLayout user={auth.user}>  
    <Box 
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '20px',
        backgroundColor: '#f5f5f5' // Fondo más agradable
      }}
    >
      <Card sx={{ maxWidth: 600, boxShadow: 3 }}>
        <CardMedia
          component="img"
          height="300"
          image={`/storage/images/${campaign.image}`} // Verifica que el enlace esté funcionando correctamente
          alt={campaign.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div" align="center">
            {campaign.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" align="justify" sx={{ marginBottom: 2 }}>
            {campaign.description}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="body1" color="text.primary">
              <strong>Meta:</strong> ${campaign.goal}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              <strong>Fecha de comienzo:</strong> {campaign.start_date} <br></br> <strong>Fecha de finalización:</strong>  {campaign.end_date}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
    </AuthenticatedLayout>
      ) : (
        <div className="text-center mt-5">
          <h2>Sesión expirada</h2>
          <p>Por favor, inicia sesión nuevamente.</p>
        </div>
  )}
   </div>
  );
};
export default CampaignDetails;
