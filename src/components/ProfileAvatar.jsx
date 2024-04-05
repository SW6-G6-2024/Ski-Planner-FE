import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PropTypes from 'prop-types';

const ProfileAvatar = (props) => {
	const { user } = useAuth0();

	return (
		<div
			id='profile-avatar'
			className='absolute bg-slate-200 cursor-pointer hover:bg-slate-300 hover:shadow-xl right-5 top-5 z-[100000] rounded-full flex place-items-center'
			onClick={props.onClick}
		>
			{user?.picture &&
				<img
					src={user.picture} alt={user.name}
					className='rounded-full w-14 h-14'
				/>}
			{!user?.picture &&
				<AccountCircleIcon
					style={{ fontSize: 60 }}
					className='text-slate-400 text-lg'
				/>
			}
		</div>
	);
};

ProfileAvatar.propTypes = {
	onClick: PropTypes.func,
};

export default ProfileAvatar;
