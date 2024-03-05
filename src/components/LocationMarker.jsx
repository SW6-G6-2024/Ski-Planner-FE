import { icon } from 'leaflet';
import markerA from '../icons/markers/markerA.svg';
import markerB from '../icons/markers/markerB.svg';
import { Marker, Popup, useMapEvents } from 'react-leaflet';

function LocationMarker(props) {

	const map = useMapEvents({
		click(e) {
			if (props.mode !== props.type) return;
			const clickedCoordinates = e.latlng;
			props.setPosition(clickedCoordinates);
			props.setMode(props.mode === 'A' ? 'B' : 'A');
		},
		locationfound(e) {
			props.setPosition(e.latlng);
			map.flyTo(e.latlng, map.getZoom());
		},
	});

	return props.position === null ? null : (
		<Marker icon={icon({
			iconUrl: props.type === 'A' ? markerA : markerB,
			iconSize: [64, 48],
			iconAnchor: [32, 41],
			popupAnchor: [1, -34],
		})} position={props.position} draggable={true}>
			<Popup>{props.type}</Popup>
		</Marker>
	);
}

export default LocationMarker;
