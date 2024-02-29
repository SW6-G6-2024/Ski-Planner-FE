import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:8888/api/routes',
  headers: {
    "Content-Type": "application/json",
  },
});

// Updated function to accept start, end, and skiArea parameters
export const fetchBestRoute = async (start, end, skiArea) => {
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
