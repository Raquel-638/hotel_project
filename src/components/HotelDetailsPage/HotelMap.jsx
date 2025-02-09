import { Map, Marker } from 'pigeon-maps';

const HotelMap = ({ lat, lon }) => {
	return (
		<Map center={[+lat, +lon]} width={700} height={400}>
			<Marker width={50} anchor={[+lat, +lon]} color="#ea4959" />
		</Map>
	);
};

export default HotelMap;
