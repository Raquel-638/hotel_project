import { Link, useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { useEffect } from 'react';
import StarGenerator from '../components/shared/StarGenerator';
import OtherHotels from '../components/HotelDetailsPage/OtherHotels';
import HotelMap from '../components/HotelDetailsPage/HotelMap';
import FormReservations from '../components/HotelDetailsPage/FormReservations';
import Reviews from '../components/HotelDetailsPage/Reviews';
import SliderImgHotel from '../components/HotelDetailsPage/SliderImageHotel';
import './styles/HotelDetailsPage.css'

const HotelDetailsPage = () => {
	const { id } = useParams();
	const [hotel, getHotel] = useFetch();

	useEffect(() => {
		const url = `https://hotels-api.academlo.tech/hotels/${id}`;
		getHotel(url);
	}, [id]);

	console.log(hotel);

	return (
		<section className='details'>
			<div className='details__title'>
			<h2>{hotel?.name}</h2>
				{hotel?.rating && <StarGenerator rating={hotel.rating} />}
				<span>{hotel?.rating}</span>
			</div>
			<hr className='details__hr'/>
			<div className='details__container-img'>
				<div>
					<SliderImgHotel hotel={hotel} />
				</div>
					{hotel && <HotelMap lat={hotel?.lat} lon={hotel?.lon} />}
			</div>
			<div className='details__name'>
				{hotel?.city.name}, {hotel?.city.country}
			</div>
			<div>
				<i className="bx bx-map details__logo"></i>
				<address className='details__address'>{hotel?.address}</address>
			</div>
			<p className='details__description'>{hotel?.description}</p>
			<section className='details__form-reservation'>
				{localStorage.getItem('token') ? (
					<FormReservations hotelId={hotel?.id} />
				) : (
					<p className='details__reservation'>
						If you want to make a reservation, please{' '}
						<Link to="/login"> Login</Link>
					</p>
				)}
			</section>
			<div>
				<Reviews hotelId={hotel?.id} />
			</div>
			<OtherHotels city={hotel?.city} id={hotel?.id} />
		</section>
	);
};

export default HotelDetailsPage;
