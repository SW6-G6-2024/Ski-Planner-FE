import React from 'react';
import { GeoJSON } from 'react-leaflet';
import { setPisteColor } from '../../utils/pisteStyling';
import { setLiftStyle } from '../../utils/liftStyling';
import { addLiftDetails, addPisteDetails } from '../../utils/popupMount';
import PropTypes, { object } from 'prop-types';

/**
 * 
 * @param {FeatureHandler.propTypes} props 
 * @returns 
 */
export default function FeatureHandler(props) {
	return (
		<>
			{props.route && <GeoJSON data={props.route} style={{ fillColor: 'grey', color: 'grey', weight: 10 }} />}
			{props.pistes && <GeoJSON data={props.pistes} style={setPisteColor} />}
			{props.lifts && <GeoJSON data={props.lifts} style={setLiftStyle} />}

			{/* Bigger weight to make the pistes and lifts easier to click */}
			{props.pistes && <GeoJSON key={`pistes-${props.key}`} data={props.pistes} style={{ ...setPisteColor, color: 'transparent', weight: 15 }} onEachFeature={addPisteDetails} />}
			{props.lifts && <GeoJSON key={`lifts-${props.key}`}data={props.lifts} style={{ ...setLiftStyle, color: 'transparent', weight: 15 }} onEachFeature={addLiftDetails} />}
		</>
	);
}

FeatureHandler.propTypes = {
	route: PropTypes.object,
	pistes: PropTypes.arrayOf(object),
	lifts: PropTypes.arrayOf(object),
	key: PropTypes.string
};