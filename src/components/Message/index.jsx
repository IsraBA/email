import React from 'react'
import Notifications from '../Notifications'
import styles from './styles.module.css'
import formatTime from '../../functions/formatTime'
import { NavLink } from 'react-router-dom'

export default function Message({link, image, sender, subject, time, isRead }) {
    return (
        <NavLink to={link} className={styles.msgBlock}>
            <img src={image} alt="profile picture" />
            <div className={styles.senderAndMsg}>
                <h3>{sender}</h3>
                <p>{subject}</p>
            </div>
            <div className={styles.timeAndNotf}>
                <div className={styles.time}>{formatTime(time)}</div>
                <Notifications num={1} />
            </div>
        </NavLink>
    )
}
