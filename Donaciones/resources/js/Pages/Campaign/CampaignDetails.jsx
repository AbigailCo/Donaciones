import React from 'react';
import { usePage } from '@inertiajs/react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const CampaignDetails = () => {
  const { campaign } = usePage().props;

  return (
    <div>
      <Card style={{ cursor: 'pointer' }}>
        <CardMedia
          component="img"
          height="200"
          image={`/storage/images/${campaign.image}`}
          alt={campaign.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {campaign.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {campaign.description}
          </Typography>
          <Typography variant="body1" color="text.primary">
            Goal: ${campaign.goal}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Dates: {campaign.start_date} to {campaign.end_date}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default CampaignDetails;
