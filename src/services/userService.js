import axios from 'axios';
import env from '../../config/keys.js';

/**
 * Function to update the user's first and last name in the database
 * @param {String} first first name of the user
 * @param {String} last last name of the user
 * @param {String} id id of the user
 * @param {String} token user token for authentication
 * @returns {Promise} response ("User updated")
 */
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

const patchUserPreferences = async (settings, id, token) => {
	try {
		const requestBody = {
			settings: settings,
		};

		const res = await axios.patch(`${env.backendUrl}/api/users/${id}/preferences`, requestBody, {
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

const getUserPreferences = async (id, token) => {
	try {
		const res = await axios.get(`${env.backendUrl}/api/users/${id}`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});


		return res.data;

	} catch (error) {
		console.log('Failed to get user preferences');
		console.error(error);
		throw error;
	}
};

export { patchUser, patchUserPreferences, getUserPreferences };