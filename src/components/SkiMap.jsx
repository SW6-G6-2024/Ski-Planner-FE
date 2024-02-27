import React, { useCallback, useState, useRef } from 'react';
import { fetchSkiData } from '../services/skiDataService';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import { Icon } from 'leaflet';
import '../App.css';
import { setPisteColor } from '../utils/pisteStyling';
import { setLiftStyle } from '../utils/liftStyling';

import 'leaflet/dist/leaflet.css';
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import MapLegend from './legend/MapLegend';

const SkiMapComponent = () => {
  const center = [61.3140, 12.1971];
  const mapRef = useRef(null); // To access the map instance
  const [pistes, setPistes] = useState(null);
  const [lifts, setLifts] = useState(null);

  // Use useCallback to define your data fetching function
  const updateBoundsAndFetchData = useCallback(() => {
    if (!mapRef.current) return; // Check if the map instance is available

    fetchSkiData('65d4a9dbecaa09d942314101')
      .then(data => {
        const pistesData = {
          type: "FeatureCollection",
          features: data.geoJson.features.filter(feature => feature.properties["piste:type"] === "downhill"),
        };
        const liftsData = {
          type: "FeatureCollection",
          features: data.geoJson.features.filter(feature => feature.properties["aerialway"]),
        };
        
        setLifts(liftsData);
        setPistes(pistesData);
      })
      .catch(console.error);
  }, []);

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
        {pistes && <GeoJSON data={pistes} style={setPisteColor} onEachFeature={placeMarker} />}
        {lifts && <GeoJSON data={lifts} style={setLiftStyle}/>}
        <MapLegend />
      </MapContainer>
    </div>
  );
};


export default SkiMapComponent;
