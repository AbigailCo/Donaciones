import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import axios from "axios";
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = "pk.eyJ1IjoiZG9uYS1kYXItdnVlbHZlIiwiYSI6ImNtM2R2NDU2cjA3dzMybG9mcDhxc2k4bTUifQ.GWqeDxsFqV28pRp4ypBhTQ";

const MapboxMap = ({ setCoordinates }) => {
  const mapContainerRef = useRef(null);
  const [lng, setLng] = useState(-68.0591);
  const [lat, setLat] = useState(-38.95161);
  const [zoom, setZoom] = useState(10);
  const [searchAddress, setSearchAddress] = useState("");
  const [suggestions, setSuggestions] = useState([]); // Guardar sugerencias
  const mapRef = useRef(null); // Referencia al mapa
  const markerRef = useRef(null); // Referencia al marcador

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

    // Guardar referencias
    mapRef.current = map;
    markerRef.current = marker;

    return () => map.remove();
  }, []);

  const handleSearch = async (query) => {
    if (!query) {
      setSuggestions([]); // Limpiar sugerencias si no hay texto
      return;
    }
    try {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json`,
        {
          params: {
            access_token: mapboxgl.accessToken,
            autocomplete: true, // Activar autocompletado
            limit: 5, // Máximo 5 resultados
          },
        }
      );
      setSuggestions(response.data.features); // Guardar las coincidencias
    } catch (error) {
      console.error("Error buscando coincidencias:", error);
    }
  };

  const handleSuggestionClick = (place) => {
    const [longitude, latitude] = place.center;

    // Actualizar mapa y marcador
    setLng(longitude);
    setLat(latitude);
    mapRef.current.flyTo({ center: [longitude, latitude], zoom: 14 });
    markerRef.current.setLngLat([longitude, latitude]);

    // Pasar coordenadas al padre
    setCoordinates({ latitude, longitude });

    // Limpiar búsqueda y sugerencias
    setSearchAddress(place.place_name);
    setSuggestions([]);
  };

  return (
    <div>
     

      {/* Campo de búsqueda */}
      <div style={{ marginBottom: "20px", position: "relative" }}>
        <input
          type="text"
          value={searchAddress}
          onChange={(e) => {
            setSearchAddress(e.target.value);
            handleSearch(e.target.value);
          }}
          placeholder="Busca una direccion ejemplo: Buenos Aires, Neuquén"
          className="w-full px-4 py-2 border rounded"
        />
        {/* Sugerencias */}
        {suggestions.length > 0 && (
          <ul
            className="absolute bg-white border rounded w-full mt-1 max-h-48 overflow-y-auto z-10"
            style={{ listStyle: "none", padding: 0 }}
          >
            {suggestions.map((place) => (
              <li
                key={place.id}
                onClick={() => handleSuggestionClick(place)}
                className="px-4 py-2 cursor-pointer hover:bg-blue-100"
              >
                {place.place_name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Mapa */}
      <div
        ref={mapContainerRef}
        style={{ width: "100%", height: "300px", marginBottom: "20px" }}
      ></div>

      <p>Latitud: {lat.toFixed(4)}, Longitud: {lng.toFixed(4)}</p>
    </div>
  );
};

export default MapboxMap;
