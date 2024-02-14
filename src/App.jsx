import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, GeoJSON } from 'react-leaflet';
import './App.css';

import piste from './data/piste.json';
import lifts from './data/lifts.json';
import restaurants from './data/restaurant.json';
import liftIcons from './data/lift-icons.json';

import 'leaflet/dist/leaflet.css';
import { ChairLift } from "./icons/LiftIcon";

import markerIconPng from "leaflet/dist/images/marker-icon.png";
import {Icon} from 'leaflet';

function App() {
	const center = [61.3140, 12.1971];

	const setColor = (feature) => {
		if (feature.properties["piste:difficulty"] === "novice") {
			feature.properties.fill = "#009400";
		} else if (feature.properties["piste:difficulty"] === "easy") {
			feature.properties.fill = "#249cff";
		} else if (feature.properties["piste:difficulty"] === "intermediate") {
			feature.properties.fill = "red";
		} else if (feature.properties["piste:difficulty"] === "advanced" || feature.properties["piste:difficulty"] === "expert") {
			feature.properties.fill = "black";
		} else {
			feature.properties.fill = "white";
		}

		if (feature.properties["piste:grooming"] === "backcountry") {
			feature.properties.dashArray = "5, 5";
		}

		return {
			fillColor: feature.properties.fill,
			color: feature.properties.fill,
			weight: 3,
			fillOpacity: 1,
			dashArray: feature.properties.dashArray,
		};
	};

	const setLiftStyle = (feature) => {
		return {
			color: "orange",
			weight: 3,
			opacity: 0.8,
		};
	};

	return (
		<div style={{width: "100vw", height: "100vh", padding: "0"}}>
			<MapContainer center={center} zoom={13.75} zoomSnap={0.25} scrollWheelZoom={false}>
				{/*<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	/>*/}
				<GeoJSON data={piste} style={setColor} />
				<GeoJSON data={lifts} style={setLiftStyle}/>
				<Marker position={[61.3140, 12.1971]} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 20]})}>
					<Popup>
						<span>Trysil</span>
					</Popup>
				</Marker>
				{/*<GeoJSON data={liftIcons} pointToLayer={setIcon} />*/}
			</MapContainer>
		</div>
	);
}

export default App;
