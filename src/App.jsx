import React from "react";
import './App.css';
import 'leaflet/dist/leaflet.css';
import SkiMapComponent from "./components/SkiMap";
import { Toaster } from 'react-hot-toast';

function App() {
	return (
		<div className="h-screen w-screen min-h-screen">
			<SkiMapComponent/>
			<Toaster position="top-center" reverseOrder={false} />
		</div>
	);
}

export default App;
