import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import usePreferences from '../../Context/Preferences'
import ToggleDarkMode from '../../components/ToggleDarkMode'
import { useUser } from '../../Context/userContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckDouble, faUser } from '@fortawesome/free-solid-svg-icons';
import Loader from '../../components/Loader';
import apiToast from '../../functions/apiToast';



export default function Settings() {

  const { toggleSiteColor, colorOptions, siteColor } = usePreferences();
  const { user, setUser } = useUser();

  const [profileP, setProfileP] = useState('');
  const [userName, setUserName] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitBnt, setSubmitBnt] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUserNameChange = (e) => {
    let value = e.target.value;
    // Allow spaces and alphanumeric characters, then trim spaces
    value = value.replace(/[^a-zA-Z0-9.\s]/g, ''); // 
    if (value >= 15) {
      value.slice(0, 15)
    }
    setUserName(value);
  }

  // מילוי השם והתמונה
  useEffect(() => {
    if (user.userName) {
      setUserName(user.userName)
    }
    if (user.image) {
      setProfileP(user.image)
    }
  }, [user])

  // טעינת התמונה להצגה למשתמש ולשליחה לשרת
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // מגבלת משקל עד 5 מגה
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be up to 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setProfileP(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // יצירת כפתור האישור במידה והשתנו נתונים בטופס
  useEffect(() => {
    if ((oldPassword && password && confirmPassword) ||
      (userName != '' && userName != user.userName) ||
      (profileP != '' && profileP != user.image)) {
      setSubmitBnt(true);
    }
  }, [oldPassword, password, confirmPassword, userName, profileP]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let update = {
      name: '',
      image: '',
      oldPassword: '',
      newPassword: '',
    }
    if (oldPassword && password && confirmPassword) {
      if (password === confirmPassword) {
        setLoading(true);
        update.oldPassword = oldPassword;
        update.newPassword = password;
      } else {
        alert('Passwords do not match');
        return;
      }
    }
    if (userName != '' && userName != user.userName) {
      setLoading(true);
      update.name = userName.trim().slice(0, 15);
    }
    if (profileP != '' && profileP != user.image) {
      setLoading(true);
      update.image = profileP;
    }
    apiToast.put('user/changeUserInfo', update, {},
      "Update your data", "Changes saved", "Failed to save changes")
      .then(res => {
        // console.log(res.data);
        setUserName(res.data.userName);
        setProfileP(res.data.image);
        setUser(prev => ({ ...prev, userName: res.data.userName, image: res.data.image }))
        setLoading(false);
        setSubmitBnt(false);
        setOldPassword('');
        setPassword('');
        setConfirmPassword('');
      }).catch(err => { console.error(err), setLoading(false) })
  }


  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <h1>User profile</h1>
        <form className={styles.innerSection} onSubmit={handleSubmit}>

          <div className={styles.imageAndEmail}>
            <label className={styles.profileP}>
              <img src={profileP} alt="profile picture" />
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ffffff" d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" /></svg>
              <input type="file" name='image' onChange={handleImageChange} accept="image/*" />
            </label>
            <h2>{user.email}</h2>
          </div>

          <div className={submitBnt ? styles.inputs : styles.inputsNoSubmit}>

            <label className={styles.name}>
              <h5>Name: </h5>
              <div className={styles.group}>
                <div className={styles.icon}><FontAwesomeIcon icon={faUser} size='sm' /></div>
                <input
                  className={styles.input}
                  name='userName'
                  type="text"
                  placeholder="Name"
                  value={userName}
                  onChange={(e) => handleUserNameChange(e)}
                />
              </div>
            </label>

            <label>
              <h5>Previous password</h5>
              <div className={styles.group}>
                <div className={styles.icon}><FontAwesomeIcon icon={faUser} size='sm' /></div>
                <input
                  className={styles.input}
                  name='oldPassword'
                  type="password"
                  placeholder="Previous password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
            </label>

            <label>
              <h5>New Password</h5>
              <div className={styles.group}>
                <svg className={styles.icon} stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" >
                  <path d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" strokeLinejoin="round" strokeLinecap="round"></path>
                </svg>
                <input
                  className={styles.input}
                  name='password'
                  type="password"
                  placeholder="New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </label>

            <label>
              <h5>Confirm password</h5>
              <div className={styles.group}>
                <div className={styles.icon}><FontAwesomeIcon icon={faCheckDouble} /></div>
                <input
                  className={styles.input}
                  name='confirmPassword'
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </label>

            {submitBnt &&
              (loading ? <div className={styles.loading}><Loader /></div> :
                <button className={styles.animatedButton} type='submit'>
                  <svg xmlns="http://www.w3.org/2000/svg" className={styles.arr2} viewBox="0 0 24 24">
                    <path
                      d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                    ></path>
                  </svg>
                  <span className={styles.text}>Save changes</span>
                  <span className={styles.circle}></span>
                  <svg xmlns="http://www.w3.org/2000/svg" className={styles.arr1} viewBox="0 0 24 24">
                    <path
                      d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                    ></path>
                  </svg>
                </button>)}
          </div>
        </form>
      </div>
      <div className={styles.section}>
        <h1>Theme</h1>
        <ul className={styles.innerSection}>
          <li>
            <h2>Mode:</h2>
            <ToggleDarkMode />
          </li>
          <li>
            <h2>Site color:</h2>
            <div className={styles.colors}>
              {Object.entries(colorOptions).map((color) => (
                <button
                  className={
                    siteColor == color[0] ? `${styles.selectedColor} ${styles.colorBtn}` : styles.colorBtn
                  }
                  key={color[0]}
                  onClick={() => toggleSiteColor(color[0])}
                  style={
                    siteColor === color[0]
                      ? {
                        backgroundColor: color[1][0],
                        outlineOffset: '3px',
                        outline: `2px solid ${color[1][0]}`,
                      }
                      : { backgroundColor: color[1][0] }
                  }
                ></button>
              ))}
            </div>
          </li>
        </ul>
      </div>
    </div >
  )
}