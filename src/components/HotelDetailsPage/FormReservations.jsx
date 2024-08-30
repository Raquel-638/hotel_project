import { useForm } from 'react-hook-form';
import useCrud from '../../hooks/useCrud';
import { useNavigate } from 'react-router-dom';
import './styles/FormReservation.css'
import Swal from 'sweetalert2';

const FormReservations = ({ hotelId }) => {
	const { reset, handleSubmit, register } = useForm();
	const [, , createBooking] = useCrud();
	const navigate = useNavigate();

	const submit = (data) => {
		const url = 'https://hotels-api.academlo.tech/bookings';

		const objData = { ...data, hotelId };

		createBooking(url, objData, true);
		reset({
			checkIn: '',
			checkOut: '',
		});
		navigate('/reservations');
		Swal.fire({
			title: 'Reservation',
			text: 'Successfully reservation',
			icon: 'success',
			confirmButtonColor: '#000',
		});
	};

	return (
		<form onSubmit={handleSubmit(submit)}>
			<h3 className='reservation__title'>Make your reservation here:</h3>
			<label className='reservation__field'>
				<span className='reservation__label'>Check-in</span>
				<input className='reservation__input' {...register('checkIn')} type="date" />
			</label>
			<label className='reservation__field'>
				<span className='reservation__label'>Check-out</span>
				<input className='reservation__input' {...register('checkOut')} type="date" />
			</label>
			<hr className='reservation__hr'/>
			<button className='formreservation__btn'>Reserve a Room</button>
		</form>
	);
};

export default FormReservations;
