import React from "react";
import './App.css';
import 'leaflet/dist/leaflet.css';
import SkiMapComponent from "./components/SkiMap";
import { Toaster } from 'react-hot-toast';
import ProfileHandler from "./components/ProfileHandler";

function App() {
	return (
		<div className="h-screen w-screen min-h-screen flex place-items-center content-center justify-center">
			<ProfileHandler />
			<SkiMapComponent />
			<Toaster position="top-center" reverseOrder={false} />
		</div>
	);
}

export default App;
