import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function ProfileSettings() {
	const { user } = useAuth0();

	return (
		<div className='px-10 py-5'>
			<div className='flex-col items-center'>
				<div className='w-full flex justify-center -translate-y-10'>
					{user?.picture && <img src={user.picture} alt={user.name} className='rounded-full w-30 h-30' />}
				</div>
				<div className='flex-col w-full justify-start'>
					<div className='flex gap-5 justify-between border border-gray-200 py-2 px-5 rounded-md mb-2'>
						<p>Name:</p>
						<p>{user.given_name} {user.family_name}</p>
					</div>
					<div className='flex gap-5 justify-between border border-gray-200 py-2 px-5 rounded-md'>
						<p>Email:</p>
						<p>{user.email}</p>
					</div>
					<div>
						<h3>Preferences</h3>
					</div>
					<div className='flex-col w-1/2 justify-start'>
					</div>
				</div>
			</div>
		</div>

	);
}

export default ProfileSettings;


/*
<div className='flex-col w-1/2 justify-start'>
						<p>Profile picture:</p>
						<div className='flex'>
							<Button>Edit</Button>
							<Button>Remove</Button>
						</div>
					</div>
					*/