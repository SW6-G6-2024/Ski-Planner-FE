import React, { useEffect, useState } from "react";
import './App.css';
import 'leaflet/dist/leaflet.css';
import SkiMapComponent from "./components/SkiMap";
import { Toaster } from 'react-hot-toast';
import ProfileAvatar from "./components/ProfileAvatar";
import ProfileMenu from "./components/ProfileMenu";
import ProfileModal from "./components/ProfileModal";
import Modal from "./components/Modal";

function App() {
	const [showProfileModal, setShowProfileModal] = useState(false);
	const [showMenu, setShowMenu] = useState(false);

	useEffect(() => {
		console.log('Show profile modal:', showProfileModal);
	}, [showProfileModal]);

	const toggleMenu = () => {
		console.log('Toggling menu');
		setShowMenu(!showMenu);
	};

	return (
		<div className="h-screen w-screen min-h-screen flex place-items-center content-center justify-center">
			<ProfileAvatar onClick={toggleMenu} />
			{showMenu && <ProfileMenu setShowProfileModal={setShowProfileModal} />}
			<SkiMapComponent />
			{showProfileModal &&
				<Modal setShowProfileModal={setShowProfileModal}>
					<ProfileModal />
				</Modal>}
			<Toaster position="top-center" reverseOrder={false} />
		</div>
	);
}

export default App;
