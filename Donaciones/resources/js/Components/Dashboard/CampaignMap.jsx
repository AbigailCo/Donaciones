import React, { useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Link } from "@inertiajs/react";

const CampaignMap = ({ campaigns }) => {
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  const MAPBOX_TOKEN = 'pk.eyJ1IjoiZG9uYS1kYXItdnVlbHZlIiwiYSI6ImNtM2R2NDU2cjA3dzMybG9mcDhxc2k4bTUifQ.GWqeDxsFqV28pRp4ypBhTQ'; // Reemplaza con tu API Key

  const handleMarkerClick = (campaign) => {
    setSelectedCampaign(campaign); 
  };

  return (
    <div style={{ height: '400px', width: '100%' }}>
       <h2 className="text-center mb-4">Descubre donde se encuentran nuestras campañas</h2>
      <Map
        initialViewState={{
          latitude: -38.95161, // Coordenadas de Neuquén
          longitude: -68.0591,
          zoom: 10,
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        {campaigns.map((campaign) => (
          <Marker
            key={campaign.id}
            latitude={campaign.latitude}
            longitude={campaign.longitude}
            color="fuchsia"
            onClick={() => handleMarkerClick(campaign)} 
          >
            {/* Solo muestra el popup para la campaña seleccionada */}
            {selectedCampaign && selectedCampaign.id === campaign.id && (
              <Popup
                longitude={campaign.longitude}
                latitude={campaign.latitude}
                closeButton={true}
                closeOnClick={false}
                anchor="top"
                onClose={() => setSelectedCampaign(null)} // Cierra el popup al hacer clic
              >
                <div>
                  <h4>{campaign.title}</h4>
                  <p>{campaign.description}</p>
                  <Link
                  href={`/campaigns/${campaign.id}`} 
                  className="btn btn-primary" 
                >
                  Ver detalles
                </Link>
                </div>
              </Popup>
            )}
          </Marker>
        ))}
      </Map>
    </div>
  );
};

export default CampaignMap;
