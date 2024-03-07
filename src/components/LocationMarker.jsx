import { icon } from 'leaflet';
import markerA from '../icons/markers/markerA.svg';
import markerB from '../icons/markers/markerB.svg';
import { Marker, useMapEvents } from 'react-leaflet';
import PropTypes from 'prop-types';


/**
 * Marker for the map that can be placed by the user to select a start or end point
 * @param {Object} props 
 * @param {string} props.type type of marker (A or B)
 * @param {string} props.mode current mode for placing marker (A or B)
 * @param {LatLng} props.position position of the marker
 * @param {Function} props.setPosition function to set the position of the marker
 * @param {Function} props.setMode function to set the mode of the marker
 * @returns {JSX.Element} Marker with either A or B icon
 */
function LocationMarker(props) {
	useMapEvents({
		click(e) {
			if (props.mode !== props.type) return;
			const clickedCoordinates = e.latlng;
			props.setPosition(clickedCoordinates);
			props.setMode(props.mode === 'A' ? 'B' : 'A');
		}
	});
	return props.position === null ? null : (
		<Marker icon={icon({
			iconUrl: props.type === 'A' ? markerA : markerB,
			iconSize: [64, 48],
			iconAnchor: [32, 41],
			popupAnchor: [1, -34],
		})}
			position={props.position}
			draggable={true}
			eventHandlers={{
				dragend: (e) => {
					props.setPosition(e.target.getLatLng());
				}
			}}>
		</Marker>
	);
}

LocationMarker.propTypes = {
	type: PropTypes.string.isRequired,
	mode: PropTypes.string.isRequired,
	position: PropTypes.object.isRequired,
	setPosition: PropTypes.func.isRequired,
	setMode: PropTypes.func.isRequired,
};


export default LocationMarker;
