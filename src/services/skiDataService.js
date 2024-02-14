export const fetchSkiData = async (north, south, east, west) => {
  try {
    // Adjusted query to include `out geom;` for geometry data
    const query = `[out:json];(way["piste:type"="downhill"]["piste:difficulty"](${south},${west},${north},${east}););out geom;`;
    const response = await fetch(`http://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

    const filteredData = data.elements.filter(element => {
      const difficulty = element.tags["piste:difficulty"];
      const ref = element.tags["ref"];
      const name = element.tags["name"];
      // Exclude pistes with 'freeride' or 'extreme' difficulty, and ensure 'ref' attribute exists and is not empty
      return difficulty !== "freeride" && difficulty !== "extreme" && (ref || name);
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
