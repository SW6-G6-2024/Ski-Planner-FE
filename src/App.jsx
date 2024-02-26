import React from "react";
import './App.css';
import 'leaflet/dist/leaflet.css';
import SkiMapComponent from "./components/SkiMap";
import MapLegend from "./components/legend/MapLegend";

function App() {
	return (
		<div className="h-screen w-screen min-h-screen">
      <MapLegend/>
			<SkiMapComponent/>
		</div>
	);
}

export default App;
