import axios from 'axios';
import env from '../../config/keys.js';

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
  console.log(client.defaults.baseURL)
  try {
    const requestBody = {
      start: start,
      end: end,
      skiArea: skiArea,
    };

    const res = await client.post('/generate-route', requestBody);

    const bestRoute = res.data.res;

    return {
      bestRoute,
    };

  } catch (error) {
    console.error("Failed to generate route data:", error);
    throw error;
  }
};
