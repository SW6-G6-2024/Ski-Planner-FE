import React from 'react';
import Button from './Button';
import { useAuth0 } from '@auth0/auth0-react';
import ProfileField from './ProfileField';
import FormField from './FormField';
import { patchUser } from '../services/userService';
import { notifyError, notifySuccess } from '../utils/customErrorMessage';

function ProfileSettings() {
	const { user, getAccessTokenSilently } = useAuth0();

	const [first, setFirstName] = React.useState(user.given_name);

	const [last, setLastName] = React.useState(user.family_name);

	const [editMode, setEditMode] = React.useState(false);

	const handleSave = async () => {
		const token = await getAccessTokenSilently({
			cacheMode: 'no-cache',
			authorizationParams: {
				audience: 'https://dev-b8qw0pac72kuwxyk.eu.auth0.com/api/v2/',
				scope: 'update:users',
			}
		});

		console.log(token);

		try {
			patchUser(first, last, user.sub, token);
			user.given_name = first;
			user.family_name = last;
			notifySuccess('Successfully updated user');
		} catch (error) {
			notifyError('Failed to update user');
		}
		setEditMode(false);
	};
	// eslint-disable-next-line no-unused-vars
	const handleCancel = () => {

	};

	return (
		<div className='px-10 py-5'>
			<div className='flex-col items-center'>
				<div className='w-full flex justify-center -translate-y-10'>
					{user?.picture && <img src={user.picture} alt={user.name} className='rounded-full w-30 h-30' />}
				</div>
				{!editMode && (
					<div className='flex-col w-full justify-start *:mb-2'>
						<ProfileField label='First name:' value={user.given_name} />
						<ProfileField label='Last name:' value={user.family_name} />
						<ProfileField label='Email:' value={user.email} />
						<Button
							className='w-44 bg-blue-400 text-white rounded-lg hover:bg-gray-400 py-2'
							onClick={() => setEditMode(true)}>
							<p>Edit profile</p>
						</Button>
						<div className='flex-col w-1/2 justify-start'>
						</div>
					</div>
				)}
				{editMode && (
					<>
						<div className='*:mb-3'>
							<FormField label='First name' value={first} onChange={(e) => setFirstName(e.target.value)} />
							<FormField label='Last name' value={last} onChange={(e) => setLastName(e.target.value)} />
						</div>
						<Button
							onClick={handleSave}>
							<p>Save</p>
						</Button>
					</>
				)}
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