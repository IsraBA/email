import React, { useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarCheck, faChartSimple, faComments, faCopy, faEye, faGaugeHigh, faRightFromBracket, faVideo } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import { useUser } from '../../Context/userContext'
import ContextMenu from '../ContextMenu'
import { toast } from 'react-toastify'


export default function SideBar() {

  const { user } = useUser();

  const menuBtn = useRef(null);

  const [menu, setMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [activeLink, setActiveLink] = useState('');

  const isActive = (path) => {
    return path == location.pathname.split('/')[1] ? styles.active : styles.inActive
  };

  useEffect(() => {
    isActive(activeLink)
  }, [location.pathname, activeLink])

  const openMenu = () => {
    // העברת המיקום של הכפתור לתפריט הנפתח
    const rect = menuBtn.current.getBoundingClientRect();
    const middleX = rect.left;
    const middleY = rect.top;
    setMenuPosition({ x: middleX, y: middleY - 10 });
    setMenu(true);
  };

  const logOut = () => {
    localStorage.removeItem('token');
    // טעינת הדף ואיבוד הקונקסט
    window.location.reload();
  }

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
      <img
        onClick={openMenu}
        ref={menuBtn}
        className={styles.profile}
        src={user.image}
        alt="profile"
      />
      {menu && <ContextMenu x={menuPosition.x} y={menuPosition.y}
        direction={"down-right"}
        closeMenu={() => setMenu(false)}
        options={[
          {
            icon: <FontAwesomeIcon icon={faCopy} />,
            title: <div><b>{user.userName},</b><div style={{fontSize: '12px'}}>{user.email}</div> </div>,
            func: () => {navigator.clipboard.writeText(user.email); toast.success('Email copied to clipboard') }
          }, {
            icon: <FontAwesomeIcon icon={faRightFromBracket} />,
            title: 'Log out',
            func: () => logOut()
          },
        ]} />}
    </div>
  )
}
