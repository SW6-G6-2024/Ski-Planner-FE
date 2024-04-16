import React from 'react';
import { GeoJSON } from 'react-leaflet';
import { setPisteColor } from '../../utils/pisteStyling';
import { setLiftStyle } from '../../utils/liftStyling';
import { addLiftDetails, addPisteDetails } from '../../utils/popupMount';
import PropTypes from 'prop-types';

export default function FeatureHandler(props) {
	return (
		<>
			{props.route && <GeoJSON data={props.route} style={{ fillColor: 'grey', color: 'grey', weight: 10 }} />}
			{props.pistes && <GeoJSON data={props.pistes} style={setPisteColor} />}
			{props.lifts && <GeoJSON data={props.lifts} style={setLiftStyle} />}

			{/* Bigger weight to make the pistes and lifts easier to click */}
			{props.pistes && <GeoJSON data={props.pistes} style={{ ...setPisteColor, color: 'transparent', weight: 15 }} onEachFeature={addPisteDetails} />}
			{props.lifts && <GeoJSON data={props.lifts} style={{ ...setLiftStyle, color: 'transparent', weight: 15 }} onEachFeature={addLiftDetails} />}
		</>
	);
}

FeatureHandler.propTypes = {
	route: PropTypes.object.isRequired,
	pistes: PropTypes.object.isRequired,
	lifts: PropTypes.object.isRequired,
};