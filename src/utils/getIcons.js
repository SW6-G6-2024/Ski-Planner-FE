// Piste icons
import green from '../icons/step-by-step/green.svg';
import blue from '../icons/step-by-step/blue.svg';
import red from '../icons/step-by-step/red.svg';
import black from '../icons/step-by-step/black.svg';
// Lift icons
import buttonLift from '../icons/lifts/buttonLift.svg';
import chairLift from '../icons/lifts/chair-lift.svg';
import tbarLift from '../icons/lifts/t-bar.svg';
import gondola from '../icons/lifts/gondola.svg';

/**
 * Function to map difficulty to the corresponding icon
 * @param {String} difficulty The difficulty string from the geojson data
 * @returns {String} The icon path
 */
function difficultyToIcon(difficulty) {
	switch (difficulty) {
		case "novice":
			return green;
		case "easy":
			return blue;
		case "intermediate":
			return red;
		default:
			return black;
	}
}

/**
 * Function to map lift type to the corresponding icon
 * @param {String} liftType String representing the type of lift
 * @returns {String} The icon path
 */
function getLiftIcon(liftType) {
	switch (liftType) {
		case "button-lift":
			return buttonLift;
		case "chair-lift":
			return chairLift;
		case "t-bar":
			return tbarLift;
		case "gondola":
			return gondola;
		default:
			return buttonLift;
	}
}

export { difficultyToIcon, getLiftIcon };