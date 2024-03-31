import React, { useState } from 'react'
import styles from './styles.module.css'
import { faReply } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function SingleMsg({ image, sender, message, time }) {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={isOpen ? styles.openMsg : styles.closeMsg} onClick={(e) => setIsOpen(!isOpen)}>
            <span className={styles.senderDetails}>
                {sender == "You" ?
                    <span className={styles.icon}><FontAwesomeIcon icon={faReply} fontSize={30} /></span> :
                    <img className={styles.profile} src={image} alt="profile picture" />}
                <span className={styles.sender}>{sender}</span>
            </span>
            <p className={styles.msg} onClick={(e) => {e.stopPropagation(), setIsOpen(true)}}>{message}</p>
            <span className={styles.time}>{time}</span>
        </div>
    )
}
