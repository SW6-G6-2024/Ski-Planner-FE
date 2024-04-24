import React from 'react';
import { createRoot } from 'react-dom/client';
import StarRating from '../components/StarRating';
import { ratePiste } from '../services/rateService';

// Icons for the lifts
import buttonLiftImg from '../icons/lifts/buttonLift.svg';
import chairLiftImg from '../icons/lifts/chair-lift.svg';
import gondolaImg from '../icons/lifts/gondola.svg';
import liftImg from '../icons/lifts/lift.svg';
import tBarImg from '../icons/lifts/t-bar.svg';
import getDifficultyString from './difficultyMapping';

const roots = new Map();

/**
 * Method to add piste details to the popup and render the star rating component
 * @param {Feature} feature the piste feature (geojson feature object)
 * @param {import('leaflet').Layer} layer the layer object
 */
const addPisteDetails = (feature, layer) => {
	// Safely extract pisteName ensuring feature and properties exist and handling multiple possible keys.
	const pisteName = feature && feature.properties 
		? (feature.properties['piste:name'] || feature.properties['name'] || feature.properties['piste:ref'] || feature.properties['ref'] || '').replace(/[^a-zA-Z0-9]/g, '')
		: '';

	let difficulty = feature.properties["piste:difficulty"] === 'novice' ? 'Beginner' : feature.properties["piste:difficulty"];
	difficulty = getDifficultyString(difficulty);

	const styledPisteDetails = `
		<div style="font-size: 0.8rem; font-weight: bold;">
			Name: ${pisteName}<br>Difficulty: ${difficulty}
		</div>
		<div id="star-rating-container-${feature.id}"></div>`; // Placeholder for the star rating component

	layer.bindPopup(styledPisteDetails);

	layer.on('popupopen', () => {ratingPopup(feature, layer);});

	layer.on('popupclose', () => {
		const containerId = `star-rating-container-${feature.id}`;
		const container = document.getElementById(containerId);
		if (container && roots.has(container)) {
			roots.get(container).unmount();
			roots.delete(container);
		}
	});
};

/**
 * Method to render the star rating component in the piste popup
 * @param {Feature} feature The piste feature (geojson feature object)
 * @param {import('leaflet').Layer} layer The layer object
 */
function ratingPopup(feature, layer) {
	const containerId = `star-rating-container-${feature.id}`;
	const container = document.getElementById(containerId);
	if (container && !roots.has(container)) {
		const root = createRoot(container);
		roots.set(container, root);
		root.render(
			<StarRating
				onRatingSelected={(rating) => {
					ratePiste(rating, feature.id);
					layer.closePopup();
				}}
			/>
		);
	}
}

const liftTypeToImage = {
	'button_lift': buttonLiftImg,
	'platter': buttonLiftImg,
	'drag_lift': tBarImg,
	'chair_lift': chairLiftImg,
	'gondola': gondolaImg,
	't_bar': tBarImg,
	'magic_carpet': liftImg,
};

/**
 * Method to add lift details to the popup and render the lift image
 * @param {Feature} feature The lift feature (geojson feature object)
 * @param {import('leaflet').Layer} layer The layer object
 */
const addLiftDetails = (feature, layer) => {
	const liftName = feature.properties.name ? feature.properties.name : 'Unnamed lift';
	const liftImageType = feature.properties["aerialway"];
	const occupancy = feature.properties["aerialway:occupancy"];
	const occupancyString = occupancy ? `Occupancy: ${occupancy}<br>` : '';
	const liftImage = liftImageType !== 'magic_carpet' ? liftTypeToImage[liftImageType] : null;

	const styledLiftDetails = `
		<div style="text-align: center;">
			${liftImage ? `<img src="${liftImage}" alt="${liftImageType}" style="width: 60px; height: 60px; margin-left:auto; margin-right:auto;"><br>` : ''}
			<div style="font-size: 0.8rem; font-weight: bold;">
				Lift: ${liftName}<br>${occupancyString}
			</div>
		</div>`;

	layer.bindPopup(styledLiftDetails);
};

export { addPisteDetails, addLiftDetails };