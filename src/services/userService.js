import axios from 'axios';
import env from '../../config/keys.js';

const patchUser = async (first, last, id, token) => {
	try {
		const requestBody = {
			given_name: first,
			family_name: last,
			name: first + ' ' + last,
		};

		const res = await axios.patch(`${env.backendUrl}/api/users/${id}`, requestBody, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});

		return res.data;

	} catch (error) {
		console.log('Failed to update user');
		console.error(error);
		throw error;
	}
};

export { patchUser };