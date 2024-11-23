import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = "pk.eyJ1IjoiZG9uYS1kYXItdnVlbHZlIiwiYSI6ImNtM2R2NDU2cjA3dzMybG9mcDhxc2k4bTUifQ.GWqeDxsFqV28pRp4ypBhTQ";

const MapboxMap = ({ setCoordinates, initialCoordinates }) => {
  const mapContainerRef = useRef(null);
  const [lng, setLng] = useState(initialCoordinates?.longitude || -68.0591);
  const [lat, setLat] = useState(initialCoordinates?.latitude || -38.95161);
  const [zoom, setZoom] = useState(10);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    const marker = new mapboxgl.Marker({ draggable: true })
      .setLngLat([lng, lat])
      .addTo(map);

    marker.on("dragend", () => {
      const { lng, lat } = marker.getLngLat();
      setLng(lng);
      setLat(lat);
      setCoordinates({ latitude: lat, longitude: lng });
    });

    map.on("load", () => {
      map.resize();
    });

    return () => map.remove();
  }, [lat, lng, zoom]);

  return (
    <div>
      <h2 className="text-2xl font-semibold text-center text-blue-600 mt-6 mb-4">
        <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
          Arrastra el marcador hasta la ubicación
        </span>
      </h2>
      <div
        ref={mapContainerRef}
        style={{ width: "100%", height: "300px", marginBottom: "20px" }}
      ></div>
      <p>Latitud: {lat.toFixed(4)}, Longitud: {lng.toFixed(4)}</p>
    </div>
  );
};

export default MapboxMap;