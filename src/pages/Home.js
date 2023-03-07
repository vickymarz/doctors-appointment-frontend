import React from 'react';
import { Link } from 'react-router-dom';
import style from '../css/home.module.css';

const Home = () => (
  <section className={style.container}>
    <div className={style.logo}>
      <h1 className={style.title}>WE CARE</h1>
      <p className={style.motto}>Meet your doctor today...</p>
    </div>
    <nav className={style.nav}>
      <ul>
        <li className={style.login}>
          <Link to="/login">Login</Link>
        </li>
        <li className={style.signup}>
          <Link to="/register">Register</Link>
        </li>
      </ul>
    </nav>
  </section>
);

export default Home;
