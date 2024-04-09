import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from './Button';
import PropTypes from 'prop-types';

const ProfileMenu = (props) => {
	const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

	const logoutWithRedirect = () => {
		console.log(window.location.origin);
		logout({ 
			logoutParams: { returnTo: window.location.origin },
		});
	};

	const loggedIn = () => (
		<>
			<div>
				{user?.picture &&
					<img
						src={user.picture} alt={user.name}
						className='rounded-full w-20 h-20'
					/>}
				{!user?.picture &&
					<AccountCircleIcon
						style={{ fontSize: 100 }}
						className='text-slate-400 text-lg'
					/>

				}
			</div>

			<div className='text-lg text-slate-600 border-b border-grey-200 w-full py-2' id='profile-name'>{user.given_name} {user.family_name}</div>
			<div className='pt-3 w-full px-10 flex flex-col gap-2'>
				<Button
					className='w-full bg-gray-300 rounded-lg border text-gray-700 hover:bg-gray-400 active:shadow-inner border-gray-200 active:border shadow-md hover:shadow-lg py-2'
					onClick={() => {props.setShowProfileModal(true); props.setShowMenu(false); props.setShowAvatar(false);}}
					id='settings-button'
				>
					<p>Settings</p>
				</Button>
				<Button onClick={logoutWithRedirect} id='logout-button'>
					<p>Sign Out</p>
				</Button>
			</div>

		</>
	);

	const loggedOut = () => (
		<>
			<div className='w-full border-b border-grey-500'>
				<AccountCircleIcon
					style={{ fontSize: 100 }}
					className='text-slate-400 text-lg'
				/>
			</div>
			<div className='w-full px-10 pt-3'>
				<Button onClick={loginWithRedirect} id='login-button'>
					<p>Login</p>
				</Button>
			</div>
		</>

	);

	return (
		<div className='bg-white flex flex-col place-items-center shadow-xl border border-gray-300 w-[250px] absolute top-20 right-20 z-[10000] rounded-lg py-3' id='profile-menu'>
			{isAuthenticated ? loggedIn() : loggedOut()}
		</div>
	);
};

ProfileMenu.propTypes = {
	setShowProfileModal: PropTypes.func.isRequired,
	setShowMenu: PropTypes.func.isRequired,
	setShowAvatar: PropTypes.func.isRequired,
};

export default ProfileMenu;
