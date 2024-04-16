import React, { useCallback, useState, useRef } from 'react';
import { fetchSkiData } from '../services/skiDataService';
import { fetchBestRoute } from '../services/bestRouteService';
import { MapContainer, TileLayer } from 'react-leaflet';
import '../App.css';
import LocationMarker from './LocationMarker';
import 'leaflet/dist/leaflet.css';
import GuideSlider from './stepByStepGuide/GuideSlider';
import FeatureHandler from './Map/FeatureHandler';

/**
 * @CodeScene(disable: *Complex Method*)
 * Ski map component - displays a map with pistes and lifts
 * @returns {JSX.Element} SkiMapComponent
 */
const SkiMapComponent = () => {
  const center = [61.3140, 12.1971]; // TODO: Change to the center of the ski resort to be fetched
  const mapRef = useRef(null); // To access the map instance
  const [pistes, setPistes] = useState(null);
  const [lifts, setLifts] = useState(null);
  const [route, setRoute] = useState(null);
  const [mode, setMode] = useState('A');
  const [positionA, setPositionA] = useState(null);
  const [positionB, setPositionB] = useState(null);
  const [wasDragged, setWasDragged] = useState(false);
  const [stepByStepGuide, setStepByStepGuide] = useState([]);

  // Fetch the ski data and update the bounds of the map
  const updateBoundsAndFetchData = useCallback(async () => {
    if (!mapRef.current) return; // Check if the map instance is available

    const skiData = await fetchSkiData('65d4a9dbecaa09d942314101').catch(console.error);
    if (!skiData) { return; } // Check if the data was fetched successfully

    setPistes(skiData.pistes);
    setLifts(skiData.lifts);
  }, []);


  /**
   * Method to find the best route between two points
   */
  const findRoute = async () => {
    if (!positionA || !positionB) return;

    setRoute(null);
    const startNode = { lat: positionA.lat, lon: positionA.lng };
    const endNode = { lat: positionB.lat, lon: positionB.lng };
    const bestRouteData = await fetchBestRoute(startNode, endNode, '65d4a9dbecaa09d942314101').catch(console.error);

    if (!bestRouteData) {
      return;
    }

    if (bestRouteData.stepByStepGuide) {
      setStepByStepGuide(bestRouteData.stepByStepGuide);
    }

    const route = {
      geometry: bestRouteData.bestRoute.geometry,
      properties: { ...bestRouteData.bestRoute.properties, name: 'Best Route' },
      type: 'Feature',
    };
    setRoute(route);
  };

  return (
    <div className='relative'>
      <button
        id='generate-route-button'
        className='absolute right-[100px] top-5 z-[10000] bg-red-500 hover:bg-red-400 px-2 py-2 text-white rounded-md shadow-xl hover:shadow-sm border border-red-300'
        onClick={findRoute}
      >
        Generate Route
      </button>
      <GuideSlider guide={stepByStepGuide} />
      <MapContainer
        center={center}
        zoom={13.75} zoomSnap={0.25}
        scrollWheelZoom={true}
        whenReady={(mapEvent) => {
          mapRef.current = mapEvent.target;
          updateBoundsAndFetchData();
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <FeatureHandler pistes={pistes} lifts={lifts} route={route} />
        <LocationMarker type='A'
          mode={mode} setMode={setMode}
          position={positionA} setPosition={setPositionA}
          wasDragged={wasDragged} setWasDragged={setWasDragged}
        />
        <LocationMarker type='B'
          mode={mode} setMode={setMode}
          position={positionB} setPosition={setPositionB}
          wasDragged={wasDragged} setWasDragged={setWasDragged}
        />
      </MapContainer>
    </div>
  );
};


export default SkiMapComponent;
