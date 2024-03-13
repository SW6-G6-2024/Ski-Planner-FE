import axios from 'axios';
import env from '../../config/keys.js';
import { notifyError, notifySuccess } from '../utils/customErrorMessage.js';

const client = axios.create({
  baseURL: env.backendUrl + '/api/routes',
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Fetches the best route between two nodes
 * @param {number} start node ID for the start of the route
 * @param {number} end node ID for the end of the route
 * @param {string} skiArea ID of the ski area
 * @returns {Promise<{bestRoute: Object}>} bestRoute
 */
export const fetchBestRoute = async (start, end, skiArea) => {
  try {
    const requestBody = {
      start: start,
      end: end,
      skiArea: skiArea,
    };

    const res = await client.post('/generate-route', requestBody);

    const bestRoute = res.data.res;

    if (res.status === 200 && bestRoute) {
      notifySuccess('Successfully generated route');
      return {
        bestRoute,
      };
    }

  } catch (error) {
    console.error("Failed to generate route data:", error);
    if (error.response) {
      notifyError('Failed to generate route');
    }
    throw error;
  }
};
