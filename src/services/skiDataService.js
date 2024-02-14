export const fetchSkiData = async (north, south, east, west) => {
  try {
    // Adjusted query to include `out geom;` for geometry data
    const query = `
      [out:json];
      (
        // Fetch downhill pistes within the bounding box
        way["piste:type"="downhill"](${south},${west},${north},${east});
        // Fetch ski lifts within the bounding box
        way["aerialway"="chair_lift"](${south},${west},${north},${east});
        // You can add more aerialway types here if needed, e.g., drag_lift, gondola, etc.
      );
      out geom;
      `;
    const response = await fetch(`http://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

    const filteredData = data.elements.filter(element => {
      const isPiste = element.tags["piste:type"] === "downhill";
      const isLift = element.tags["aerialway"] === "chair_lift"; // Add additional lift types as needed
      const difficulty = element.tags["piste:difficulty"];
      const ref = element.tags["ref"];
    
      // Apply filtering based on feature type
      if (isPiste) {
        // Exclude specific difficulties and ensure 'ref' is present for pistes
        return difficulty !== "freeride" && difficulty !== "extreme" && ref;
      } else if (isLift) {
        // For lifts, just ensure they are within the specified types, additional conditions can be added
        return isLift;
      }
      return false;
    }); 

    // Convert filtered data to GeoJSON
    const geoJson = transformToGeoJson({ elements: filteredData });
    return geoJson;
  } catch (error) {
    console.error("Failed to fetch ski data:", error);
    throw error; // Rethrow the error to be handled by the caller
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
