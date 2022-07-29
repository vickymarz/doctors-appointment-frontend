import React from 'react';
import ReservationsPage from './ReservationsPage';
import style from '../css/reservationspage.module.css';
import Sidebar from './DoctorsPage/Sidebar';

const Reservations = () => (
  <div className={style.reservationBodyContainer}>
    <Sidebar />
    <section className={style.reservationPageContainer}>
      <h1 className={style.reservationHeading}>My Reservations</h1>
      <ReservationsPage />
    </section>

  </div>

);

export default Reservations;
