import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import style from '../css/reservationspage.module.css';
// import Image from '../assets/images/reserveformdoctor.jpg';
import { getAppointments, deleteAppointment } from '../redux/appointments/appointments';

const ReservationsPage = () => {
  const appointments = useSelector((state) => state.appointmentReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAppointments());
  }, [dispatch]);

  const cancelAppointment = (user_id, id) => {
    dispatch(deleteAppointment(user_id, id));
  };

  return (
    <div className={style.reserveContainer}>
      {appointments.appointments.length === 0 && (
        <h3 className={style.reserveHeading}>No reservations available!</h3>
      )}
      {
         appointments.appointments.map((item) => (
           <div className={style.reserveBody} key={item.id}>
             {/** <img src={Image} alt="doctor" className={style.imageIcon} /> */}
             <p className={style.reservationCity}>{item.city}</p>
             <p className={style.reservationCity}>{item.date}</p>
             <button
               type="button"
               className={style.reserveBodyButton}
               onClick={cancelAppointment(item.id)}
             >
               Cancel
             </button>
           </div>
         ))
         }
    </div>
  );
};

export default ReservationsPage;
