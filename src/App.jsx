import React from "react";
import './App.css';
import 'leaflet/dist/leaflet.css';
import SkiMapComponent from "./components/SkiMap";

function App() {
	return (
		<div style={{width: "100vw", height: "100vh"}}>
			<SkiMapComponent/>
		</div>
	);
}

export default App;
