import React, { useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { BsArrowRightCircle, BsFillCaretLeftFill } from 'react-icons/bs';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import Sidebar from './Sidebar';
import styles from '../../css/docPage.module.css';
import { getDoctors } from '../../redux/doctors/doctors';

const Doctor = () => {
  const doctors = useSelector((state) => state.doctorsReducer, shallowEqual);
  const dispatch = useDispatch();

  const { id } = useParams();
  const { state } = useLocation();

  localStorage.setItem('item', JSON.stringify(state));

  useEffect(
    () => {
      dispatch(getDoctors());
    },
    [dispatch],
    state,
  );

  let doctor = doctors.find((item) => parseInt(item.id, 10) === parseInt(id, 10));

  doctor = JSON.parse(localStorage.getItem('item'));

  return (
    <>
      <Sidebar />
      <div className={styles.detailContainer}>
        <div className={styles.container}>
          <img src={doctor.photo} alt={doctor.name} className={styles.docImage} />
          <div className={styles.doctorInfoDiv}>
            <div className={`text-end ${styles.doctorInfo}`}>
              <h1 className="fw-bolder fs-4">{doctor.name}</h1>
              <p className={styles.desc}>{doctor.description}</p>
            </div>
            <table className="table table-striped mt-5">
              <tbody>
                <tr>
                  <td>Specialization</td>
                  <td>{doctor.specialization}</td>
                </tr>
                <tr>
                  <td>Charges</td>
                  <td>{doctor.charges}</td>
                </tr>
              </tbody>
            </table>
            <div className="d-flex justify-content-end">
              <div className={`${styles.reserve} ${styles.reserveDiv} p-2 d-flex`}>
                <Link to="/reserve" state={doctor} className={`btn btn-light ${styles.reserveBtn}`}>
                  Reserve
                </Link>
                <BsArrowRightCircle className="mx-2" size={40} color="white" />
              </div>
            </div>
          </div>
        </div>
        <Link to="/doctors">
          <div className={`${styles.backNav} d-flex justify-content-center align-items-center`}>
            <BsFillCaretLeftFill />
          </div>
        </Link>
      </div>
    </>
  );
};

export default Doctor;
