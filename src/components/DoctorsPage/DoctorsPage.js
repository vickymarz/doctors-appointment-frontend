import React, { useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import Sidebar from './Sidebar';
import socialLinks from './socialLinks';
import styles from '../../css/docPage.module.css';
import { getDoctors } from '../../redux/doctors/doctors';

const DoctorsPage = () => {
  const doctors = useSelector((state) => state.doctorsReducer, shallowEqual);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDoctors());
  }, []);

  const doctorsList = doctors.map((doctor) => (
    <div key={doctor.id}>
      <Link to={`/doctors/${doctor.id}`} className={styles.doctorSingle} state={doctor}>
        <div className="d-flex flex-column align-items-center">
          <img src={doctor.photo} alt={doctor.name} className={styles.img} />
          <h5 className={`text-dark p-4 ${styles.border}`}>{doctor.name}</h5>
          <p className="text-secondary">{doctor.description}</p>
          <ul className="d-flex">
            {socialLinks.map((link) => {
              const { id, url, icon } = link;
              return (
                <li key={id}>
                  <Link to={url} target="_blank" className="m-1 text-secondary">
                    {icon}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </Link>
    </div>
  ));

  return (
    <>
      <Sidebar />
      <div className={styles.doctorsContainer}>
        <div className={styles.header}>
          <h3>LIST OF DOCTORS</h3>
          <p className="text-secondary">Please select a doctor to view details</p>
        </div>
        <Carousel
          additionalTransfrom={0}
          arrows
          autoPlaySpeed={3000}
          centerMode={false}
          className=""
          containerClass="container"
          dotListClass=""
          draggable
          focusOnSelect={false}
          infinite={false}
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={{
            desktop: {
              breakpoint: {
                max: 3000,
                min: 1024,
              },
              items: 3,
              partialVisibilityGutter: 40,
            },
            mobile: {
              breakpoint: {
                max: 767,
                min: 0,
              },
              items: 1,
              partialVisibilityGutter: 30,
            },
            tablet: {
              breakpoint: {
                max: 1024,
                min: 768,
              },
              items: 2,
              partialVisibilityGutter: 30,
            },
          }}
          showDots={false}
          sliderClass=""
          slidesToSlide={1}
          swipeable
        >
          {doctorsList}
        </Carousel>
      </div>
    </>
  );
};

export default DoctorsPage;
