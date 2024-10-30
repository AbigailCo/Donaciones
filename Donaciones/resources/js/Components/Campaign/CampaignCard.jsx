//Esto es lo que veo cuando desde el nav bar ingreso a campañas
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Link } from '@inertiajs/react';
import Carousel from 'react-bootstrap/Carousel';
import CampaignVideo from './CampaignVideo';

const getYouTubeId = (url) => {
  if (!url) return null;
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const matches = url.match(regex);
  return matches ? matches[1] : null;
};

const CampaignCard = ({ campaign }) => {
  const youtubeId = getYouTubeId(campaign.youtube_link);

  return (
    <Card style={{ cursor: 'pointer' }}>
      <Carousel>
        {Array.isArray(campaign.images) && campaign.images.length > 0 ? (
          campaign.images.map((image, index) => (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100"
                src={`/storage/images/${image.path}`}
                alt={`Imagen de la campaña ${index}`}
                style={{ height: '200px', objectFit: 'cover' }}
              />
            </Carousel.Item>
          ))
        ) : (
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/storage/images/defecto.jpg"
              alt="Imagen por defecto"
              style={{ height: '200px', objectFit: 'cover' }}
            />
          </Carousel.Item>
        )}
      </Carousel>
      
      <Link href={`/campaigns/${campaign.id}`} style={{ textDecoration: 'none' }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {campaign.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {campaign.description}
          </Typography>
          <Typography variant="body1" color="text.primary">
            {campaign?.category?.name
              ? `Categoria: ${campaign.category.name}`
              : 'No category selected'}
          </Typography>
          <Typography variant="body1" color="text.primary">
            Meta: ${campaign.goal}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Fechas: {new Date(campaign.start_date).toLocaleDateString('es-ES')} a {new Date(campaign.end_date).toLocaleDateString('es-ES')}
          </Typography>

          <CampaignVideo youtubeId={youtubeId} />
        </CardContent>
      </Link>
    </Card>
  );
};

export default CampaignCard;
