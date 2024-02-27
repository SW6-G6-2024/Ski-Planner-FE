import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:8888/api/ski-areas',
  headers: {
    "Content-Type": "application/json",
  },
});


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