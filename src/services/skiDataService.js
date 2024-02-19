export const fetchSkiData = async (north, south, east, west) => {
  try {
    // Fetches both pistes and lifts within the specified bounding box
    const query = `
      [out:json];
      (
        // Fetch downhill pistes within the bounding box
        way["piste:type"="downhill"](${south},${west},${north},${east});
        // Fetch all ski lifts within the bounding box
        way["aerialway"](${south},${west},${north},${east});
      );
      out geom;
    `;
    const response = await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

    const filteredData = data.elements.filter(element => {
      const isPiste = element.tags["piste:type"] === "downhill";
      const isLift = element.tags["aerialway"]; // Add specific lift types to include or exclude here
      const difficulty = element.tags["piste:difficulty"];
      const ref = element.tags["ref"];
      const name = element.tags["name"];
    
      if (isPiste) {
        // Exclude specific difficulties and ensure 'ref' is present for pistes
        return difficulty !== "freeride" && difficulty !== "extreme" && (ref || name);
      } else if (isLift) {
        return isLift;
      }
      return false;
    }); 

    // Convert filtered data to GeoJSON
    const geoJson = transformToGeoJson({ elements: filteredData });
    return geoJson;
  } catch (error) {
    console.error("Failed to fetch ski data:", error);
    throw error;
  }
};

function transformToGeoJson(data) {
  const features = data.elements.filter(el => el.type === "way" && el.geometry).map(way => {
    return {
      type: "Feature",
      properties: way.tags,
      geometry: {
        type: "LineString",
        coordinates: way.geometry.map(({lat, lon}) => [lon, lat])
      }
    };
  });

  return {
    type: "FeatureCollection",
    features: features
  };
}
