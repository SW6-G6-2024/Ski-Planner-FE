/**
 * Maps the difficulty string from the geojson data to a more user-friendly string
 * @param {String} difficulty The difficulty string from the geojson data
 * @returns {String} The final difficulty string
 */
function getDifficultyString(difficulty) {
	switch (difficulty) {
		case 'novice':
			return 'Beginner';
		case 'easy':
			return 'Easy';
		case 'intermediate':
			return 'Intermediate';
		case 'expert': case 'advanced':
			return 'Expert';
		default:
			difficulty = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
	}
}

export default getDifficultyString;