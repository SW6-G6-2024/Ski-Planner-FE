import React, { useCallback, useState, useRef } from 'react';
import { fetchSkiData } from '../services/skiDataService';
import { fetchBestRoute } from '../services/bestRouteService';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import '../App.css';
import { setPisteColor } from '../utils/pisteStyling';
import { setLiftStyle } from '../utils/liftStyling';
import LocationMarker from './LocationMarker';

import buttonLiftImg from '../icons/lifts/buttonLift.svg';
import chairLiftImg from '../icons/lifts/chair-lift.svg';
import gondolaImg from '../icons/lifts/gondola.svg';
import liftImg from '../icons/lifts/lift.svg';
import tBarImg from '../icons/lifts/t-bar.svg';

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
    const bestRouteData = await fetchBestRoute(startNode, endNode, '65d4a9dbecaa09d942314101').catch(console.error);

    if (!bestRouteData) {
      return;
    }
    
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
  const addPistDetails = (feature, layer) => {
    const pisteName = (feature.properties.name ? feature.properties.name : feature.properties.ref).replace(/[^a-zA-Z0-9]/g, '');
    let difficulty = feature.properties["piste:difficulty"] === 'novice' ? 'Beginner' : feature.properties["piste:difficulty"];
    switch (difficulty) {
      case 'easy':
        difficulty = 'Easy';
        break;
      case 'intermediate':
        difficulty = 'Medium';
        break;
      case 'expert', 'advanced':
        difficulty = 'Expert';
        break;
      default:
        difficulty = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
    }
  
    // TODO: Add ratings to this popup
    const styledPisteDetails = `
      <div style="font-size: 0.8rem; font-weight: bold;">
        Lift: ${pisteName}<br>Difficulty: ${difficulty}
      </div>`;

    layer.bindPopup(styledPisteDetails);
  };  

  const liftTypeToImage = {
    'button_lift': buttonLiftImg,
    'platter': buttonLiftImg,
    'drag_lift': tBarImg,
    'chair_lift': chairLiftImg,
    'gondola': gondolaImg,
    't_bar': tBarImg,
    'magic_carpet': liftImg,
  };

  const addLiftDetails = (feature, layer) => {
    const liftName = feature.properties.name ? feature.properties.name : 'Unnamed lift';
    const liftImageType = feature.properties["aerialway"];
    const occupancy = feature.properties["aerialway:occupancy"];
    const occupancyString = occupancy ? `Occupancy: ${occupancy}<br>` : '';
    const liftImage = liftImageType !== 'magic_carpet' ? liftTypeToImage[liftImageType] : null;
  
    // Include the image in your styledLiftDetails if liftImage is not null
    const styledLiftDetails = `
      <div style="text-align: center;">
        ${liftImage ? `<img src="${liftImage}" alt="${liftImageType}" style="width: 60px; height: 60px; margin-left:auto; margin-right:auto;"><br>` : ''}
        <div style="font-size: 0.8rem; font-weight: bold;">
          Lift: ${liftName}<br>${occupancyString}
        </div>
      </div>`;
  
    layer.bindPopup(styledLiftDetails);
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
        {pistes && <GeoJSON data={pistes} style={setPisteColor} onEachFeature={addPistDetails} />}
        {lifts && <GeoJSON data={lifts} style={setLiftStyle} onEachFeature={addLiftDetails} />}
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
