import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import styles from './styles.module.css'
import airplane from '../../assets/airplane.png'
import api from '../../functions/api';
import { NavLink, useNavigate } from 'react-router-dom';
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import Loader from '../../components/Loader';
import { useUser } from '../../Context/userContext';

export default function Register() {

  const { user } = useUser();

  useEffect(() => {
      if (user.userName) {
          nav('/messages/inbox');
      }
      return () => { window.location.reload() }
  }, [user])

  const defaultPicture = "https://www.freeiconspng.com/thumbs/profile-icon-png/am-a-19-year-old-multimedia-artist-student-from-manila--21.png"

  const nav = useNavigate();

  const inputRef = useRef(null);
  const hiddenTextRef = useRef(null);

  const [emailInput, setEmailInput] = useState('');
  const [textWidth, setTextWidth] = useState(0);
  const [error, setError] = useState('');
  const [profileP, setProfileP] = useState(defaultPicture);
  const [loading, setLoading] = useState(false);

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
    // אם לא שונתה התמונה שולח סטרינג ריק
    let image = ''
    if (profileP != defaultPicture) {
      image = profileP;
    }

    setLoading(true);
    api.post('/register', { userName, email, password, image })
      .then(res => {
        localStorage.token = res.token;
        nav('/messages/inbox');
        setLoading(false);
      })
      .catch(err => {
        console.error(err)
        setError('Email already exists')
      })
  }

  // טעינת התמונה להצגה למשתמש ולשליחה לשרת
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setError('');
    if (file) {
      // מגבלת משקל עד 5 מגה
      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be up to 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setProfileP(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h6 className={styles.header}>TalkLane - communicate full-world</h6>
        <div className={styles.divider}></div>
        <div className={styles.body}>
          <form className={styles.loginForm} onSubmit={e => handleSubmit(e)}>
            {error && <p className={styles.error}>{error}</p>}
            <h1 className={styles.title}>Welcome to TalkLane,<br /><b>Send messages from anywhere, anytime!</b></h1>
            <label className={styles.profileP}>
              <img src={profileP} alt="profile" />
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ffffff" d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" /></svg>
              <input type="file" name='image' onChange={handleImageChange} accept="image/*" />
            </label>
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
            {loading ? <div className={styles.loading}><Loader /></div> :
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
              </button>}
          </form>
          {loading ?
            <p className={styles.register}>
              Getting your account ready! Just a moment...
            </p> :
            <p className={styles.register}>
              Already have an account?&nbsp;&nbsp;
              <NavLink className={styles.nav} to={'/login'}> Login Here</NavLink>
            </p>}
        </div>
      </div>
      <div className={styles.bgImg}>
        <img src={airplane} alt="Register screen image" />
      </div>
    </div>
  )
}
