function getDifficultyString(difficulty) {
	switch (difficulty) {
		case 'novice':
			return 'Beginner';
		case 'easy':
			return 'Easy';
		case 'intermediate':
			return 'Intermediate';
		case 'expert' || 'advanced':
			return 'Expert';
		default:
			difficulty = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
	}
}

export default getDifficultyString;