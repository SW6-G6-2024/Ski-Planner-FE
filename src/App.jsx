import React from "react";
import './App.css';
import 'leaflet/dist/leaflet.css';
import SkiMapComponent from "./components/SkiMap";
import { Toaster } from 'react-hot-toast';
import ProfileHandler from "./components/ProfileHandler";
import { SettingsProvider } from "./components/preferences/settingsProvider";

/**
 * App component that renders the main app
 * @returns {JSX.Element} App component
 */
function App() {
	return (
		<div className="h-screen w-screen min-h-screen flex place-items-center content-center justify-center">
			<SettingsProvider>
				<ProfileHandler />
				<SkiMapComponent />
			</SettingsProvider>
			<Toaster position="top-center" reverseOrder={false} />
		</div>
	);
}

export default App;
