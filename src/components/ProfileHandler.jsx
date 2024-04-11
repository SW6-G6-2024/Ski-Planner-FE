import React, { useState } from 'react';
import ProfileAvatar from './ProfileAvatar';
import ProfileMenu from './ProfileMenu';
import ProfileSettings from './ProfileSettings';
import Modal from './Modal';

function ProfileHandler() {
	const [showProfileModal, setShowProfileModal] = useState(false);
	const [showMenu, setShowMenu] = useState(false);
	const [showAvatar, setShowAvatar] = useState(true);

	const toggleMenu = () => {
		setShowMenu(!showMenu);
	};

	const closeModal = () => {
		setShowProfileModal(false);
		setShowAvatar(true);
	};

	return (
		<>
			{showAvatar && <ProfileAvatar onClick={toggleMenu} />}
			{showMenu && <ProfileMenu setShowProfileModal={setShowProfileModal} setShowMenu={setShowMenu} setShowAvatar={setShowAvatar} />}
			{showProfileModal &&
				<Modal closeFunc={closeModal} id='profile-settings'>
					<ProfileSettings />
				</Modal>}
		</>
	);
}

export default ProfileHandler;