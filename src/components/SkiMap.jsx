import React, { useCallback, useState, useRef } from 'react';
import { fetchSkiData } from '../services/skiDataService';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import { Icon } from 'leaflet';
import '../App.css';
import { setPisteColor } from '../utils/pisteStyling';
import { setLiftStyle } from '../utils/liftStyling';

import 'leaflet/dist/leaflet.css';
import markerIconPng from "leaflet/dist/images/marker-icon.png";

const SkiMapComponent = () => {
  const center = [61.3140, 12.1971];
  const mapRef = useRef(null); // To access the map instance
  const [pistes, setPistes] = useState(null);
  const [lifts, setLifts] = useState(null);

  // Use useCallback to define your data fetching function
  const updateBoundsAndFetchData = useCallback(() => {
    if (!mapRef.current) return; // Check if the map instance is available

    const bounds = mapRef.current.getBounds();
    const south = bounds.getSouth();
    const north = bounds.getNorth();
    const west = bounds.getWest();
    const east = bounds.getEast();

    fetchSkiData(north, south, east, west)
      .then(geoJson => {
        const pistesData = {
          type: "FeatureCollection",
          features: geoJson.features.filter(feature => feature.properties["piste:type"] === "downhill"),
        };
        const liftsData = {
          type: "FeatureCollection",
          features: geoJson.features.filter(feature => feature.properties["aerialway"]),
        };

        setLifts(liftsData);
        setPistes(pistesData);
      })
      .catch(console.error);
  }, []);

  return (
    <>
      <MapContainer
        center={center}
        zoom={13.75}
        zoomSnap={0.25}
        scrollWheelZoom={false}
        whenReady={(mapEvent) => {
          mapRef.current = mapEvent.target;
          updateBoundsAndFetchData();
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {pistes && <GeoJSON data={pistes} style={setPisteColor}/>}
        {lifts && <GeoJSON data={lifts} style={setLiftStyle}/>}
        <Marker position={center} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
          <Popup><span>Trysil</span></Popup>
        </Marker>
      </MapContainer>
    </>
  );
};


export default SkiMapComponent;