import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const ProfileMenu = () => {
	const { user } = useAuth0();

	return (
		<div className='bg-white flex flex-col place-items-center shadow-xl border border-gray-300 w-[250px] absolute top-20 right-20 z-[10000] rounded-lg'>
			{user?.picture &&
				<img
					src={user.picture} alt={user.name}
					className='rounded-full'
				/>}
			{!user?.picture &&
				<AccountCircleIcon
					style={{ fontSize: 100 }}
					className='text-slate-400 text-lg'
				/>
			}
      
		</div>
	);
};

export default ProfileMenu;
