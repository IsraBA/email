import React from 'react'
import Notifications from '../Notifications'
import styles from './styles.module.css'
import formatTime from '../../functions/formatTime'
import { NavLink } from 'react-router-dom'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function ListChat({ link, image, sender, subject, time, isRead }) {
    return (
        <NavLink to={link} className={styles.msgBlock}>
            {Array.isArray(image) ?
                <div className={
                    image.length > 4 ? styles.multiImg :
                        image.length < 4 ? `${styles.multiImg} ${styles.threeImg}` :
                            `${styles.multiImg} ${styles.fourImg}`}>
                    {image.length == 4 ?
                        image.slice(0, 4).map((img, index) => <img key={index} src={img} alt="profile picture" />)
                        : image.slice(0, 3).map((img, index) => <img key={index} src={img} alt="profile picture" />)
                    }
                    {image.length > 4 ? <div className={styles.moreImg}><p>+{image.length - 3}</p></div> : null}
                </div>
                : <img className={styles.singleImg} src={image} alt="profile picture" />}
            <div className={styles.senderAndMsg}>
                {Array.isArray(sender) ?
                    <div className={styles.multiSender}>
                        <h3 className={styles.members}>{sender[0] + ', ' + sender[1] + ', '}</h3>
                        {sender.length > 2 ? <h3>+{sender.length - 2}</h3> : null}
                    </div>
                    : <h3>{sender}</h3>}
                <p>{subject}</p>
            </div>
            <div className={styles.timeAndNotf}>
                <div className={styles.time}>{formatTime(time)}</div>
                {!isRead && <div className={styles.read}><FontAwesomeIcon icon={faEnvelope} /></div>}
            </div>
        </NavLink>
    )
}