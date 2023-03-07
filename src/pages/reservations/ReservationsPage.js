import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import style from '../../css/reservationspage.module.css';
import { getAppointments, deleteAppointment } from '../../redux/appointments/appointments';

const ReservationsPage = () => {
  const appointments = useSelector((state) => state.appointmentReducer);

  const appointmentList = appointments.appointments === undefined ? [] : appointments.appointments;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAppointments());
  }, []);

  const cancelAppointment = (id) => {
    dispatch(deleteAppointment(id));
  };

  return (
    <div className={style.reserveContainer}>
      {appointmentList.length === 0 && (
      <h3 className={style.reserveHeading}>No reservations available!</h3>
      )}
      {appointmentList.map((item) => (
        <div className={style.reserveBody} key={item.id}>
          <img src={item.doctor.photo} alt="doctor" className={style.imageIcon} />
          <p className={style.reservationCity}>{item.city}</p>
          <p className={style.reservationCity}>{item.date}</p>
          <button
            type="button"
            className={style.reserveBodyButton}
            onClick={() => cancelAppointment(item.id)}
          >
            Cancel
          </button>
        </div>
      ))}
    </div>
  );
};

export default ReservationsPage;
