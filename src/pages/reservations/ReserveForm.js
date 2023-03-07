import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import style from '../../css/reserveform.module.css';
import Sidebar from '../../components/Sidebar';
import { createAppointment } from '../../redux/appointments/appointments';
import { getDoctors } from '../../redux/doctors/doctors';
import Input from '../../components/Input';
import Button from '../../components/Button';

const ReserveForm = () => {
  const [option, setOption] = useState(0);
  const [city, setCity] = useState('');
  const [date, setDate] = useState('');

  const [isSubmit, setIsSubmit] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loader, setLoader] = useState('Please wait...');

  const cityRef = useRef(null);
  const doctorRef = useRef(null);
  const dateRef = useRef(null);

  const myData = useSelector((state) => state.appointmentReducer, shallowEqual);

  const doctorsList = useSelector((state) => state.doctorsReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getDoctors());
  }, [dispatch]);

  const toggleMenu = () => {
    const navMenu = document.querySelector('#toggler');
    navMenu.classList.toggle(style.sidebarContainer);
  };

  const validate = () => {
    const errors = {};

    if (cityRef.current.value === '') {
      errors.message = 'City cannot be blank';
      cityRef.current.focus();
    }
    if (doctorRef.current.value === '') {
      errors.message = 'Please select a doctor';
      doctorRef.current.focus();
    }
    if (dateRef.current.value === '') {
      errors.message = 'Select appointment date';
      dateRef.current.focus();
    }
    return errors;
  };

  const handleSubmit = () => {
    setErrors(validate);
    setIsSubmit(true);

    const newData = {
      doctor_id: parseInt(option, 10),
      city,
      date,
    };
    dispatch(createAppointment(newData));

    setIsLoading(!isLoading);

    if ((isLoading === true && myData.status !== 201)) {
      setTimeout(() => {
        setLoader('Try Again');
      }, 1000);
    }

    if ((isLoading === false && myData.status !== 200)) {
      setLoader('Please wait...');
      setTimeout(() => {
        setLoader('Try Again');
      }, 1000);
    }
  };

  if (myData.status === 201 && isSubmit === true) {
    setTimeout(() => {
      navigate('/reservations');
    }, 3000);
  }

  const handleFailure = () => {
    if (myData.status === 500) {
      const text = 'Something went wrong, Kindly fill all the fields';
      return text;
    }
    return errors.message;
  };

  return (
    <>
      <div id="toggler" className={style.sidebarContainer}>
        <Sidebar />
      </div>
      <section className={style.reserveContainer}>
        <div className={style.mainBody}>
          <div className={style.sideButton}>
            <Button type="button" className={style.hamburger} onClick={toggleMenu}>
              <FaBars />
            </Button>
          </div>
          <div className={style.heading}>
            <h4 className={style.reserveFormHeading}> Book Appointment </h4>
          </div>
          <div className={style.bodyText}>
            <p className={style.paragraph}>
              We have different doctors from different parts of the world.
              <br />
              If you wish to find out if we have a doctor who is available in your city, please use
              the selector below
            </p>
          </div>
          <div className={style.success}>
            {myData.status === 201 && isSubmit ? (
              <div className={style.errors}>Reservation successful!</div>
            ) : (
              <p className={style.errorMsg}>{handleFailure()}</p>
            )}
          </div>
          <div className={style.formBody}>
            <form className={style.formBlock}>
              <Input
                type="text"
                placeholder="city"
                value={city}
                className={style.formInput}
                onChange={(e) => setCity(e.target.value)}
                required
                innerRef={cityRef}
              />
              <select
                name="availableDoctors"
                id="availableDoctors"
                value={option}
                className={style.selectDoctors}
                onChange={(e) => setOption(e.target.value)}
                ref={doctorRef}
              >
                <option value="">
                  Choose a Doctor
                </option>
                {doctorsList.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name}
                  </option>
                ))}
              </select>
              <Input
                type="date"
                value={date}
                className={style.inputDate}
                innerRef={dateRef}
                onChange={(e) => setDate(e.target.value)}
                required
              />
              <br />
            </form>
          </div>
          <div className={style.buttonBody}>
            {isSubmit && myData.status !== 201 ? (
              <Button type="submit" className={style.bookButton} onClick={() => handleSubmit()}>
                {loader}
              </Button>
            ) : (
              <Button type="submit" className={style.bookButton} onClick={() => handleSubmit()}>
                {isLoading ? 'Please wait...' : 'Book Now!'}
              </Button>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ReserveForm;
