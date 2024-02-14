import React, { useState, useEffect } from 'react';
import { fetchSkiData } from '../services/skiDataService';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, useMap } from 'react-leaflet';
import '../App.css';
import { setPisteColor } from '../utils/pisteStyling';
import { setLiftStyle } from '../utils/liftStyling';

import 'leaflet/dist/leaflet.css';
import markerIconPng from "leaflet/dist/images/marker-icon.png";

const SkiMapComponent = () => {
  const center = [61.3140, 12.1971];

  const [pistes, setPistes] = useState(null); // Changed to pistes for clarity
  const [lifts, setLifts] = useState(null);
  
  // No need for individual state hooks for bounds, since they're used directly within useEffect

  const MapBoundsLogger = () => {
    const map = useMap();
    
    useEffect(() => {
      const updateBoundsAndFetchData = () => {
        const bounds = map.getBounds();
        const south = bounds.getSouth();
        const north = bounds.getNorth();
        const west = bounds.getWest();
        const east = bounds.getEast();

        // Fetch ski data within the current map bounds
        fetchSkiData(north, south, east, west)
          .then(setPistes)
          .catch(console.error);
      };

      // Fetch data on map initialization and when bounds change
      updateBoundsAndFetchData();
      map.on('moveend', updateBoundsAndFetchData);
      
      // Clean up event listener
      return () => {
        map.off('moveend', updateBoundsAndFetchData);
      };
    }, [map]); // Dependency array includes map to ensure effect runs once the map is initialized
    
    return null; // This component does not render anything
  };

  return (
    <MapContainer center={center} zoom={13.75} zoomSnap={0.25} scrollWheelZoom={false}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {pistes && <GeoJSON data={pistes} style={setPisteColor} />}
      {/* Assume lifts data handling is similar and will be added when available */}
      <Marker position={center} icon={new L.Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
        <Popup>
          <span>Trysil</span>
        </Popup>
      </Marker>
      <MapBoundsLogger/>
    </MapContainer>
  );
};

export default SkiMapComponent;
