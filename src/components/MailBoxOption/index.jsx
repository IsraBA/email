import React from 'react'
import styles from './styles.module.css'
import Notifications from '../Notifications'
import { NavLink } from 'react-router-dom'

export default function MailBoxOption({ link = '/', title = 'Inbox', icon = '📯', notificationsNum = 0 }) {
    return (
        <NavLink to={link} className={styles.container}>
            <span className={styles.titleIcon}>
                <span>{icon}</span>
                <span>{title}</span>
            </span>
            {notificationsNum > 0 && <span><Notifications num={notificationsNum} /></span>}
        </NavLink>
    )
}
