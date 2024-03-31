import React from 'react'
import styles from './styles.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'


export default function SideBar() {
  return (
    <div className={styles.container}>
      <nav className={styles.sideBar}>
        <NavLink to={'/messages'}><FontAwesomeIcon icon={faHouse} /></NavLink>
      </nav>
    </div>
  )
}
