import axios from 'axios';
import env from '../../config/keys.js';

const patchUser = async (first, last, id, token) => {
	try {
		const requestBody = {
			given_name: first,
			family_name: last,
			name: first + ' ' + last,
		};

		const res = await axios.patch(`https://${env.auth0Domain}/api/v2/users/${id}`, requestBody, {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`,
			}
		});

		if (res.status === 200) {
			console.log('Successfully updated user');
		}

	} catch (error) {
		console.log('Failed to update user');
		console.error(error);
		throw error;
	}
};

export { patchUser };