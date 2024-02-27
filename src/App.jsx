import React from "react";
import './App.css';
import 'leaflet/dist/leaflet.css';
import SkiMapComponent from "./components/SkiMap";

function App() {
	return (
		<div className="h-screen w-screen min-h-screen">
			<SkiMapComponent/>
		</div>
	);
}

export default App;
