import axios from 'axios';
import env from '../../config/keys.js';
import { notifyError, notifySuccess } from '../utils/customErrorMessage.js';

const client = axios.create({
  baseURL: env.backendUrl + '/api/rate-piste',
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Rates a piste
 * @param {number} rating rating of the piste
 * @param {string} piste ID of the piste
 */
export const ratePiste = async (rating, pisteId) => {
  try {
    const requestBody = {
      rating,
    };

    const res = await client.post(`/${pisteId}`, requestBody);

    if (res.status === 202) {
      notifySuccess('Successfully rated piste');
    }

  } catch (error) {
    if (error) {
      notifyError('Failed to rate piste');
    }
    throw error;
  }
};
