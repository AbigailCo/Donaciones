import React, { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import axios from 'axios';

const CampaignMap = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  // Reemplaza 'TU_CLAVE_DE_API' con tu clave de Google Maps API
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.REACT_APP_GOOGLE_MAPS_API_KEY
  });

  useEffect(() => {
    // Cargar las campañas desde el backend
    axios.get('/api/campaigns') // Ajusta la URL de acuerdo a tu API
      .then(response => setCampaigns(response.data))
      .catch(error => console.error('Error al cargar campañas:', error));
  }, []);

  const containerStyle = {
    width: '100%',
    height: '600px'
  };

  // Coordenadas iniciales del centro del mapa (por ejemplo, Buenos Aires)
  const center = {
    lat: -38.95161,
    lng: -68.0591
  };

  if (!isLoaded) return <div>Cargando mapa...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={8}
    >
      {campaigns.map((campaign) => (
        <Marker
          key={campaign.id}
          position={{ lat: campaign.latitude, lng: campaign.longitude }}
          onClick={() => setSelectedCampaign(campaign)}
        />
      ))}

      {selectedCampaign && (
        <InfoWindow
          position={{ lat: selectedCampaign.latitude, lng: selectedCampaign.longitude }}
          onCloseClick={() => setSelectedCampaign(null)}
        >
          <div>
            <h4>{selectedCampaign.title}</h4>
            <p>{selectedCampaign.description}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default CampaignMap;
