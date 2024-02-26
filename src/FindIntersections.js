const findIntersections = (pistes) => {

	const intersections = [];

	for (let i = 0; i < pistes.length; i++) {
		for (let j = i + 1; j < pistes.length; j++) {
			const pisteA = pistes[i];
			const pisteB = pistes[j];

			const intersection = checkIntersection(pisteA, pisteB);
			if (intersection && !findDuplicate(intersections, intersection)){
				intersections.push(intersection);
			}
		}
	}

	return intersections;
};

const findDuplicate = (intersections, intersection) => {
	for (let i = 0; i < intersections.length; i++) {
		if (intersections[i].geometry.coordinates[0] === intersection.geometry.coordinates[0] && intersections[i].geometry.coordinates[1] === intersection.geometry.coordinates[1]) {
			return true;
		}
	}
	return false;
};

const checkIntersection = (pisteA, pisteB) => {
	// Check if pisteA and pisteB intersect
	for (let i = 0; i < pisteA.geometry.coordinates.length; i++) {
		for (let j = 0; j < pisteB.geometry.coordinates.length; j++) {
			const pointA = pisteA.geometry.coordinates[i];
			const pointB = pisteB.geometry.coordinates[j];
			if (pointA[0] === pointB[0] && pointA[1] === pointB[1]) {
				return {
					"geometry": {
						type: "Point",
						coordinates: pointA
					},
					"type": "Feature",
					"properties": {
						"@id": "node/123456789",
					},
					"id": "node/123456789",
				};
			}
		}
	}

	return null; // Replace with your actual intersection check
};

/*const intersections = findIntersections();
console.log(intersections);
console.log(`Found ${intersections.length} intersections`)



fs.writeFileSync('./src/data/intersections.json', JSON.stringify({
	"type": "FeatureCollection", 
	"generator": "overpass-turbo",
  "copyright": "The data included in this document is from www.openstreetmap.org. The data is made available under ODbL.",
  "timestamp": "2024-02-13T12:08:50Z",
	"features": intersections}, null, 2));*/

export default findIntersections;
