import React, { useState } from "react";
import './App.css';
import 'leaflet/dist/leaflet.css';
import SkiMapComponent from "./components/SkiMap";
import { Toaster } from 'react-hot-toast';
import ProfileAvatar from "./components/ProfileAvatar";
import ProfileMenu from "./components/ProfileMenu";

function App() {

	const [showMenu, setShowMenu] = useState(false);

	const toggleMenu = () => {
		console.log('Toggling menu');
		setShowMenu(!showMenu);
	};

	return (
		<div className="h-screen w-screen min-h-screen">
			<ProfileAvatar onClick={toggleMenu} />
			{showMenu && <ProfileMenu />}
			<SkiMapComponent />
			<Toaster position="top-center" reverseOrder={false} />
		</div>
	);
}

export default App;
