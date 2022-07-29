import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaBars } from 'react-icons/fa';
import style from '../css/reserveform.module.css';
import Sidebar from './DoctorsPage/Sidebar';
import { createAppointment } from '../redux/appointments/appointments';
import { getDoctors } from '../redux/doctors/doctors';
import userServices from '../redux/services/userServices';

const ReserveForm = () => {
  const [option, setOption] = useState(0);
  const [city, setCity] = useState('');
  const [date, setDate] = useState(null);
  const [userId, setUserId] = useState(null);

  // const appointments = useSelector((state) => state.appointmentReducer);
  const doctorsList = useSelector((state) => state.doctorsReducer);

  const dispatch = useDispatch();

  const getUser = async () => {
    const data = await userServices.getCurrentUser();
    const { id } = data.user;
    setUserId(id);
  };

  getUser();

  useEffect(() => {
    dispatch(getDoctors());
  }, [dispatch]);

  const toggleMenu = () => {
    const navMenu = document.querySelector('#toggler');
    navMenu.classList.toggle(style.sidebarContainer);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = {
      doctor_id: parseInt(option, 10),
      city,
      date,
      user_id: parseInt(userId, 10),
    };
    dispatch(createAppointment(newData));
  };

  return (
    <>
      <div id="toggler" className={style.sidebarContainer}>
        <Sidebar />
      </div>

      <section className={style.reserveContainer}>
        <div className={style.mainBody}>
          <div className={style.sideButton}>
            <button type="button" className={style.hamburger} onClick={toggleMenu}>
              <FaBars />
            </button>
          </div>
          <div className={style.heading}>
            <h4 className={style.reserveFormHeading}> Book Appointment </h4>
          </div>
          <div className={style.bodyText}>
            <p className={style.paragraph}>
              We have different doctors from different parts of the world.
              <br />
              If you wish to find out if we have a doctor who is available
              in your city, please use the selector below
            </p>
          </div>
          <div className={style.formBody}>
            <div className={style.formBlock}>
              <input
                type="text"
                placeholder="city"
                value={city}
                className={style.formInput}
                onChange={(e) => setCity(e.target.value)}
              />
              <select
                name="availableDoctors"
                id="availableDoctors"
                value={option}
                className={style.selectDoctors}
                onChange={(e) => setOption(e.target.value)}
              >
                <option value="" disabled> Choose a Doctor </option>
                {
                  doctorsList.map((doctor) => (
                    <option
                      key={doctor.id}
                      value={doctor.id}
                    >
                      {doctor.name}
                    </option>
                  ))
                }
              </select>
              <input
                type="date"
                value={date}
                className={style.inputDate}
                onChange={(e) => setDate(e.target.value)}
              />
              <br />
            </div>

          </div>
          <div className={style.buttonBody}>
            <input
              type="submit"
              value="Book Now"
              className={style.bookButton}
              onClick={handleSubmit}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default ReserveForm;
