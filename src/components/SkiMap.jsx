import React, { useCallback, useState, useRef } from 'react';
import { fetchSkiData } from '../services/skiDataService';
import { fetchBestRoute } from '../services/bestRouteService';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import '../App.css';
import { setPisteColor } from '../utils/pisteStyling';
import { setLiftStyle } from '../utils/liftStyling';
import LocationMarker from './LocationMarker';

import 'leaflet/dist/leaflet.css';
import MapLegend from './legend/MapLegend';

/**
 * Ski map component - displays a map with pistes and lifts
 * @returns {JSX.Element} SkiMapComponent
 */
const SkiMapComponent = () => {
  const center = [61.3140, 12.1971];
  const mapRef = useRef(null); // To access the map instance
  const [pistes, setPistes] = useState(null);
  const [lifts, setLifts] = useState(null);
  const [route, setRoute] = useState(null);
  const [mode, setMode] = useState('A');
  const [positionA, setPositionA] = useState(null);
  const [positionB, setPositionB] = useState(null);
  const [wasDragged, setWasDragged] = useState(false);

  // Use useCallback to define your data fetching function
  const updateBoundsAndFetchData = useCallback(async () => {
    if (!mapRef.current) return; // Check if the map instance is available

    const skiData = await fetchSkiData('65d4a9dbecaa09d942314101').catch(console.error);
    if (!skiData) { // Handle the error if the data fetching fails
      console.error('Failed to fetch ski data');
      return;
    } 

    // Assuming skiData.pistes is an array and you want to include newPiste as part of it
    setPistes(skiData.pistes);
    setLifts(skiData.lifts);

  }, []); // Ensure dependencies are correctly listed if any

  const findRoute = async () => {
    if (!positionA || !positionB) return;

    setRoute(null);
    const startNode = {
      lat: positionA.lat,
      lon: positionA.lng
    };
    const endNode = {
      lat: positionB.lat,
      lon: positionB.lng
    };
    const bestRouteData = await fetchBestRoute(startNode, endNode, '65d4a9dbecaa09d942314101');
    const route = {
      geometry: bestRouteData.bestRoute.geometry,
      properties: { ...bestRouteData.bestRoute.properties, name: 'Best Route' },
      type: 'Feature',
    };
    setRoute(route);
  };

  /**
   * 
   * @param {*} feature 
   * @param {Layer} layer 
   */
  const placeMarker = (feature, layer) => {
    if (feature.properties.name)
      layer.bindPopup(feature.properties.name);
    else
      layer.bindPopup(feature.properties.ref);
  };

  return (
    <div className='relative'>
      <button
        id='generate-route-button'
        className='absolute right-5 top-5 z-[10000] bg-red-400 hover:bg-red-200 rounded-md shadow-xl hover:shadow-sm border border-red-300'
        onClick={findRoute}
      >
        Generate Route
      </button>
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

        {route && <GeoJSON data={route} style={{ fillColor: 'grey', color: 'grey', weight: 10 }} />}
        {pistes && <GeoJSON data={pistes} style={setPisteColor} onEachFeature={placeMarker} />}
        {lifts && <GeoJSON data={lifts} style={setLiftStyle} />}
        <LocationMarker
           type='A'
           mode={mode}
           setMode={setMode}
           position={positionA}
           setPosition={setPositionA}
           wasDragged={wasDragged}
           setWasDragged={setWasDragged}
        />
        <LocationMarker
           type='B'
           mode={mode}
           setMode={setMode}
           position={positionB}
           setPosition={setPositionB}
           wasDragged={wasDragged}
           setWasDragged={setWasDragged}
        />
        <MapLegend />
      </MapContainer>
    </div>
  );
};


export default SkiMapComponent;
