import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarCheck, faChartSimple, faComments, faEye, faGaugeHigh, faHouse, faVideo } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'


export default function SideBar() {

  const [activeLink, setActiveLink] = useState('')
  const isActive = (path) => {
    return path == location.pathname.split('/')[1] ? styles.active : styles.inActive
  };

  useEffect(() => {
    isActive(activeLink)
  }, [location.pathname, activeLink])


  return (
    <div className={styles.container}>
      <img className={styles.logo} style={{ margin: -15 }} src="https://yt3.googleusercontent.com/ytc/AIdro_nHyJlmHC-S-caZ8i6yGvR_LLL-UIyIAmGu6awacw=s900-c-k-c0x00ffffff-no-rj" alt="logo" />
      <nav className={styles.topics}>
        <NavLink to={'/speed'} onClick={() => setActiveLink('speed')} id={isActive('speed')}>
          <FontAwesomeIcon icon={faGaugeHigh} />
        </NavLink>
        <NavLink to={'/reminders'} onClick={() => setActiveLink('reminders')} id={isActive('reminders')}>
          <FontAwesomeIcon icon={faCalendarCheck} />
        </NavLink>
        <NavLink to={'/views'} onClick={() => setActiveLink('views')} id={isActive('views')}>
          <FontAwesomeIcon icon={faEye} />
        </NavLink>
        <NavLink to={'/messages'} onClick={() => setActiveLink('messages')} id={isActive('messages')}>
          <FontAwesomeIcon icon={faComments} />
        </NavLink>
        <NavLink to={'/statistics'} onClick={() => setActiveLink('statistics')} id={isActive('statistics')}>
          <FontAwesomeIcon icon={faChartSimple} />
        </NavLink>
        <NavLink to={'/videoCalls'} onClick={() => setActiveLink('videoCalls')} id={isActive('videoCalls')}>
          <FontAwesomeIcon icon={faVideo} />
        </NavLink>
      </nav>
      <img className={styles.profile} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3HdBqVDU45zUIDYvJbH1QE2kosJ0VrH0KEXee3n33PnskjPbyvDAUWYrChTGjCXHA2cc&usqp=CAU" alt="profile" />
    </div>
  )
}
