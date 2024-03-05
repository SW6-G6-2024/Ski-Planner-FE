import axios from 'axios';
import env from '../../config/keys.js';

const client = axios.create({
  baseURL: env.backendUrl + '/api/ski-areas',
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Fetches the ski area data (pistes and lifts) from the server
 * @param {string} id ID of the ski area
 * @returns {Promise<{pistes: Array, lifts: Array}>} skiData
 */
export const fetchSkiData = async (id) => {
  try {
    const res = await client.get(`/${id}`);

    const data = res.data.geoJson.features;

    const pistes = data.filter(feature => feature.properties["piste:type"] === "downhill");
    const lifts = data.filter(feature => feature.properties["aerialway"]);

    return {
      pistes,
      lifts,
    };

  } catch (error) {
    console.error("Failed to fetch ski data:", error);
    throw error;
  }
};