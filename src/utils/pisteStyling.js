export const setPisteColor = (feature) => {
  if (feature.properties["piste:difficulty"] === "novice") {
    feature.properties.fill = "#009400";
  } else if (feature.properties["piste:difficulty"] === "easy") {
    feature.properties.fill = "#249cff";
  } else if (feature.properties["piste:difficulty"] === "intermediate") {
    feature.properties.fill = "red";
  } else if (feature.properties["piste:difficulty"] === "advanced" || feature.properties["piste:difficulty"] === "expert") {
    feature.properties.fill = "black";
  } else {
    feature.properties.fill = "white";
  }

  if (feature.properties["piste:grooming"] === "backcountry") {
    feature.properties.dashArray = "5, 5";
  }

  return {
    fillColor: feature.properties.fill,
    color: feature.properties.fill,
    weight: 3,
    fillOpacity: 1,
    dashArray: feature.properties.dashArray,
  };
};