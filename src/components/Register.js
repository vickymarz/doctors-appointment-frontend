import React, { useState, useRef } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import style from '../css/register.module.css';
import { signupUser } from '../redux/register/register';

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef();

  const myData = useSelector((state) => state.registerReducer, shallowEqual);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!regex.test(emailRef.current.value)) {
      errors.message = 'This is not a valid email format!';
      emailRef.current.focus();
    }
    if (passwordRef.current.value.length < 6 || passwordRef.current.value.length > 40) {
      errors.message = 'The password must be between 6 and 40 characters';
      passwordRef.current.focus();
    }
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      errors.message = 'The passwords do not match!';
      passwordConfirmRef.current.focus();
    }
    return errors;
  };

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate);
    setIsSubmit(true);

    const userData = { user };
    dispatch(signupUser(userData));
  };

  if (myData.status === 200) {
    setTimeout(() => {
      navigate('/login');
    }, 3000);
  }

  return (
    <section className={style.signupSection}>
      <div className={style.sectionContainer}>
        <div className={style.heading}>
          <h2>Sign Up</h2>
          <hr className={style.line} />
        </div>
        <div className="errors">
          {myData.status === 200 && isSubmit ? (
            <div className={style.success}>Account created successfully</div>
          ) : (
            <p className={style.errorMsg}>{errors.message}</p>
          )}
        </div>
        <div className={style.formContainer}>
          <form onSubmit={handleSubmit} className={style.form}>
            <div className={style.formGroup}>
              <input
                type="text"
                id="name"
                name="name"
                ref={nameRef}
                className={style.inputField}
                onChange={onChange}
                value={user.name}
                required
              />
              <>{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}</>
              <label htmlFor="name" className={style.inputLabel}>
                Full Name
              </label>
            </div>
            <div className={style.formGroup}>
              <input
                type="email"
                id="email"
                name="email"
                ref={emailRef}
                className={style.inputField}
                onChange={onChange}
                value={user.email}
                required
              />
              <>{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}</>
              <label htmlFor="email" className={style.inputLabel}>
                Email address
              </label>
            </div>
            <div className={style.formGroup}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                ref={passwordRef}
                className={style.inputField}
                onChange={onChange}
                value={user.password}
                required
              />
              <>{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}</>
              <label htmlFor="password" className={style.inputLabel}>
                Password
              </label>
              <button
                type="button"
                style={{ border: 'none', outline: 'none', background: '#fff' }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEye className={style.eyeIcon} />
                ) : (
                  <FaEyeSlash className={style.eyeIcon} />
                )}
              </button>
            </div>
            <div className={style.formGroup}>
              <input
                type={showPasswordConfirmation ? 'text' : 'password'}
                id="password-confirmation"
                ref={passwordConfirmRef}
                className={style.inputField}
                required
              />
              <>{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}</>
              <label htmlFor="password-confirmation" className={style.inputLabel}>
                Password Confirmation
              </label>
              <button
                type="button"
                style={{ border: 'none', outline: 'none', background: '#fff' }}
                onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
              >
                {showPasswordConfirmation ? (
                  <FaEye className={style.eyeIcon} />
                ) : (
                  <FaEyeSlash className={style.eyeIcon} />
                )}
              </button>
            </div>
            <div>
              <button type="submit" className={style.submitBtn}>
                Submit
              </button>
            </div>
          </form>
        </div>
        <div>
          <p>
            Already have an account?
            <Link to="/login" className={style.link}>
              {' '}
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignupForm;
