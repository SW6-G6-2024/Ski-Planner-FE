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
				scope: 'update:user',
				audience: 'http://localhost:8888'
			}
		});

		try {
			await patchUser(first, last, user.sub, token);
		} catch (error) {
			notifyError('Failed to update user');
			setEditMode(false);
			return;
		}

		user.given_name = first;
		user.family_name = last;
		notifySuccess('Successfully updated user');

		setEditMode(false);
	};

	const handleCancel = () => {
		setFirstName(user.given_name);
		setLastName(user.family_name);
		setEditMode(false);
	};

	return (
		<div className='px-10 py-5'>
			<div className='flex-col items-center'>
				<div className='w-full flex justify-center -translate-y-10'>
					{user?.picture && <img src={user.picture} alt={user.name} className='rounded-full w-30 h-30' />}
				</div>
				{!editMode && (
					<div className='flex-col w-full justify-start *:mb-2'>
						<ProfileField label='First name:' value={user.given_name} id='first-name-field' />
						<ProfileField label='Last name:' value={user.family_name} id='last-name-field' />
						<ProfileField label='Email:' value={user.email} id='email-field' />
						<Button
							className='w-44 bg-blue-500 text-white rounded-lg hover:bg-blue-400 py-2'
							onClick={() => setEditMode(true)}
							id='edit-profile-button'
						>
							<p>Edit profile</p>
						</Button>
						<div className='flex-col w-1/2 justify-start'>
						</div>
					</div>
				)}
				{editMode && (
					<>
						<div className='*:mb-3'>
							<FormField label='First name' value={first}
								onChange={(e) => setFirstName(e.target.value)}
								id='first-name-input'
							/>
							<FormField label='Last name' value={last}
								onChange={(e) => setLastName(e.target.value)}
								id='last-name-input'
							/>
						</div>
						<div className='grid grid-cols-[1fr,2fr] gap-3'>
							<Button
								className='bg-red-500 w-full text-white rounded-lg hover:bg-red-400 py-2'
								onClick={handleCancel}>
								<p>Cancel</p>
							</Button>
							<Button
								onClick={handleSave}
								id='save-profile-button'
							>
								<p>Save</p>
							</Button>
						</div>

					</>
				)}
			</div>
		</div>

	);
}

export default ProfileSettings;

