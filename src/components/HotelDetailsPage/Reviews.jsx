import { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import StarGenerator from '../shared/StarGenerator';
import './styles/Reviews.css'

const Reviews = ({ hotelId }) => {
	const [visibleComments, setVisibleComments] = useState(5);
	const [reviewsHotel, getReviewsHotel] = useFetch();

	useEffect(() => {
		const url = `https://hotels-api.academlo.tech/reviews?hotelId=${hotelId}`;
		getReviewsHotel(url);
	}, [hotelId]);

	console.log(reviewsHotel);

	const handleReviews = () => {
		setVisibleComments((prevCount) => prevCount + 5);
	};

	return (
		<div>
			<h3 className='reviews__title'>Comments</h3>
			<div>
				{reviewsHotel?.results.slice(0, visibleComments).map((review) => (
					<ul key={review.id}>
						<li className='reviews__name'>{review.user.firstName}</li>
						<li className='reviews__star'>
							<StarGenerator rating={review.rating} /> {review.rating}
						</li>
						<li className='reviews__comment'>{review.comment}</li>
					</ul>
				))}
			</div>
			{visibleComments < reviewsHotel?.results.length && (
				<button className='reviews__btn' onClick={handleReviews}>See More...</button>
			)}
		</div>
	);
};

export default Reviews;
