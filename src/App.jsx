import React, { useEffect, useState } from "react";
import './App.css';
import 'leaflet/dist/leaflet.css';
import SkiMapComponent from "./components/SkiMap";
import { Toaster } from 'react-hot-toast';
import ProfileAvatar from "./components/ProfileAvatar";
import ProfileMenu from "./components/ProfileMenu";
import ProfileSettings from "./components/ProfileSettings";
import Modal from "./components/Modal";

function App() {
	const [showProfileModal, setShowProfileModal] = useState(false);
	const [showMenu, setShowMenu] = useState(false);
	const [showAvatar, setShowAvatar] = useState(true);

	useEffect(() => {
		console.log('Show profile modal:', showProfileModal);
	}, [showProfileModal]);

	const toggleMenu = () => {
		console.log('Toggling menu');
		setShowMenu(!showMenu);
	};

	const closeModal = () => {
		setShowProfileModal(false);
		setShowAvatar(true);
	};

	return (
		<div className="h-screen w-screen min-h-screen flex place-items-center content-center justify-center">
			{showAvatar && <ProfileAvatar onClick={toggleMenu} />}
			{showMenu && <ProfileMenu setShowProfileModal={setShowProfileModal} setShowMenu={setShowMenu} setShowAvatar={setShowAvatar} />}
			<SkiMapComponent />
			{showProfileModal &&
				<Modal closeFunc={closeModal}>
					<ProfileSettings />
				</Modal>}
			<Toaster position="top-center" reverseOrder={false} />
		</div>
	);
}

export default App;
