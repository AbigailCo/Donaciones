import React, { useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';


const MapCampaign = ({ campaign }) => {

  const MAPBOX_TOKEN = 'pk.eyJ1IjoiZG9uYS1kYXItdnVlbHZlIiwiYSI6ImNtM2R2NDU2cjA3dzMybG9mcDhxc2k4bTUifQ.GWqeDxsFqV28pRp4ypBhTQ'; // Reemplaza con tu API Key

  const handleMarkerClick = (campaign) => {
    setSelectedCampaign(campaign); 
  };

  return (
    <div style={{ height: '500px', width: '100%' }}>
  <h2 className="text-2xl font-semibold text-center text-blue-600 mt-6 mb-4">
  <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
    ¡La campaña {campaign.title} se encuentra aquí!
  </span>
</h2>
      <Map
        initialViewState={{
          latitude: campaign.latitude || -38.95161, // Usa las coordenadas de la campaña si están disponibles
          longitude: campaign.longitude || -68.0591, // Usa las coordenadas de la campaña si están disponibles
          zoom: 10,
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        <Marker
          latitude={campaign.latitude}
          longitude={campaign.longitude}
          color="fuchsia"
          onClick={() => handleMarkerClick(campaign)}
        >
          
        </Marker>
      </Map>
    </div>
  );
};

export default MapCampaign;
