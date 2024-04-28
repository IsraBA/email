import React, { useLayoutEffect, useRef, useState } from 'react'
import styles from './styles.module.css'
import airplane from '../../assets/airplane.png'
import api from '../../functions/api';
import { NavLink, useNavigate } from 'react-router-dom';
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';

export default function Register() {

  const nav = useNavigate();

  const inputRef = useRef(null);
  const hiddenTextRef = useRef(null);

  const [emailInput, setEmailInput] = useState('');
  const [textWidth, setTextWidth] = useState(0);
  const [error, setError] = useState('');

  const handleEmailChange = (e) => {
    let value = e.target.value;
    value = value.replace(/[^a-zA-Z0-9.]/g, '');
    setEmailInput(value);
  }

  useLayoutEffect(() => {
    // קביעת הרוחב של המילים שהוקלדו כדי לדעת איפה למקם את הסיומת
    if (hiddenTextRef.current) {
      setTextWidth(hiddenTextRef.current.offsetWidth);
    }
  }, [emailInput]);

  // שמשלים את הסיומת של המייל האינפוט ילחץ span-בלחיצה על ה
  const handleEmailClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // פונקציה לקביעת המרחק של הסיומת של המייל מצד שמאל של האינפוט
  const determineDistance = () => {
    if (hiddenTextRef.current.offsetWidth < 103) {
      //                         ה-48 פיקסלים זה הפאדינג מצד שמאל בגלל האייקון
      return `${hiddenTextRef.current.offsetWidth + 48}px`
    }
    return `${155}px`
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    if (e.target.password.value !== e.target.confirmPassword.value) {
      setError('Passwords do not match')
      return;
    }
    const userName = e.target.userName.value;
    const email = emailInput + '@mailBox.com';
    const password = e.target.password.value;
    api.post('/register', { userName, email, password })
      .then(res => {
        localStorage.token = res.token;
        nav('/messages/inbox');
      })
      .catch(err => {
        console.log(err)
        setError('Email already exists')
      })
  }

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h6 className={styles.header}>Mailbox - communicate full-world</h6>
        <div className={styles.divider}></div>
        <div className={styles.body}>
          <form className={styles.loginForm} onSubmit={e => handleSubmit(e)}>
            {error && <p className={styles.error}>{error}</p>}
            <h1 className={styles.title}>Welcome to Mailbox,<br /><b>Send messages from anywhere, anytime!</b></h1>
            <div className={styles.group}>
              <div className={styles.icon}><FontAwesomeIcon icon={faUser} size='sm' /></div>
              <input
                className={styles.input}
                name='userName'
                type="text"
                placeholder="Name"
                required
              />
            </div>
            <div className={styles.group}>
              <p className={styles.icon}>@</p>
              <input
                className={`${styles.input} ${styles.emailInput}`}
                onChange={handleEmailChange}
                value={emailInput}
                ref={inputRef}
                name='email'
                type="text"
                placeholder="Email"
                required
              />
              <span
                ref={hiddenTextRef}
                style={{ visibility: 'hidden', position: 'absolute', whiteSpace: 'pre' }}>
                {emailInput}
              </span>
              {emailInput && <span
                style={{ left: determineDistance() }}
                className={styles.email}
                onClick={handleEmailClick}>
                @mailBox.com</span>}
            </div>
            <div className={styles.group}>
              <svg className={styles.icon} stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" >
                <path d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" strokeLinejoin="round" strokeLinecap="round"></path>
              </svg>
              <input
                className={styles.input}
                name='password'
                type="password"
                placeholder="Password"
                required
              />
            </div>
            <div className={styles.group}>
              <div className={styles.icon}><FontAwesomeIcon icon={faCheckDouble} /></div>
              <input
                className={styles.input}
                name='confirmPassword'
                type="password"
                placeholder="Confirm password"
                required
              />
            </div>
            <button className={styles.animatedButton} type='submit'>
              <svg xmlns="http://www.w3.org/2000/svg" className={styles.arr2} viewBox="0 0 24 24">
                <path
                  d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                ></path>
              </svg>
              <span className={styles.text}>Register</span>
              <span className={styles.circle}></span>
              <svg xmlns="http://www.w3.org/2000/svg" className={styles.arr1} viewBox="0 0 24 24">
                <path
                  d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                ></path>
              </svg>
            </button>
          </form>
          <p className={styles.register}>
            Already have an account?&nbsp;&nbsp;
            <NavLink className={styles.nav} to={'/login'}> Login Here</NavLink>
          </p>
        </div>
      </div>
      <div className={styles.bgImg}>
        <img src={airplane} alt="Register screen image" />
      </div>
    </div>
  )
}
