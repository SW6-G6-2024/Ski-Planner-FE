import { icon } from 'leaflet';
import markerA from '../icons/markers/markerA.svg';
import markerB from '../icons/markers/markerB.svg';
import { Marker, useMapEvents } from 'react-leaflet';
import PropTypes from 'prop-types';


/**
 * Marker for the map that can be placed by the user to select a start or end point
 * @param {LocationMarker.propTypes} props 
 * @returns {JSX.Element} Marker with either A or B icon
 */
function LocationMarker(props) {
	useMapEvents({
		click(e) {
			// If A is dragged, don't move B
			if (props.wasDragged && props.type === 'B') {
				props.setWasDragged(false);
				return;
			}
			if (props.mode !== props.type) return;
			const clickedCoordinates = e.latlng;
			props.setPosition(clickedCoordinates);
			props.setMode('B');
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
					props.setWasDragged(true);
				}
			}}>
		</Marker>
	);
}

LocationMarker.propTypes = {
	type: PropTypes.string.isRequired, // A or B
	mode: PropTypes.string.isRequired, // A or B
	position: PropTypes.object, // LatLng object 
	setPosition: PropTypes.func.isRequired, // Function to set the position
	setMode: PropTypes.func.isRequired, // Function to set the mode
	wasDragged: PropTypes.bool.isRequired, // Boolean to check if the marker was dragged
	setWasDragged: PropTypes.func.isRequired // Function to set the wasDragged boolean
};


export default LocationMarker;
