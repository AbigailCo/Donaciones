import React from 'react';
import { CardContent, Typography, Box } from '@mui/material';
import CampaignVideo from './CampaignVideo';

const CampaignDetails = ({ campaign }) => {
    /* const totalDonado = donations.reduce((acc, donation) => acc + parseFloat(donation.amount), 0); */
  /*   const youtubeId = getYouTubeId(campaign.youtube_link); */

    return (
        <CardContent>
            <Typography variant="body1" color="text.primary">
                {campaign?.category?.name
                    ? `Categoría: ${campaign.category.name}`
                    : 'No se ha seleccionado ninguna categoría'}
            </Typography>
            <Typography gutterBottom variant="h4" component="div" align="center">
                {campaign.title}
            </Typography>
            <Typography variant="body1" color="text.secondary" align="justify" sx={{ marginBottom: 2 }}>
                {campaign.description}
            </Typography>
          {/*   <CampaignVideo youtubeId={youtubeId} /> */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body1" color="text.primary">
                    <strong>Meta:</strong> ${campaign.goal}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    <strong>Fecha de comienzo:</strong> {new Date(campaign.start_date).toLocaleDateString('es-ES')} <br />
                    <strong>Fecha de finalización:</strong> {new Date(campaign.end_date).toLocaleDateString('es-ES')}
                </Typography>
            </Box>
        </CardContent>
    );
};

export default CampaignDetails;
