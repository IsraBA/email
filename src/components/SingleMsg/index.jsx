import React, { useState } from 'react'
import styles from './styles.module.css'
import { faReply } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReactQuill from 'react-quill';
import sanitizeHtml from 'sanitize-html';

export default function SingleMsg({ image, sender, message, time }) {

    const [isOpen, setIsOpen] = useState(false);

    const plainText = sanitizeHtml(message, {
        allowedTags: [],
        allowedAttributes: {},
    });

    return (
        <div className={isOpen ? styles.openMsg : styles.closeMsg} onClick={(e) => setIsOpen(!isOpen)}>
            <span className={styles.senderDetails}>
                {sender == "You" ?
                    <span className={styles.icon}><FontAwesomeIcon icon={faReply} fontSize={30} /></span> :
                    <img className={styles.profile} src={image} alt="profile picture" />}
                <span className={styles.sender}>{sender}</span>
            </span>
            {isOpen ? <p className={styles.msg} onClick={(e) => { e.stopPropagation(), setIsOpen(true) }}>
                <ReactQuill value={message} readOnly theme='bubble' className='readOnlyComp'/>
            </p> : <p className={styles.msg}>{plainText}</p>}
            <span className={styles.time}>{time}</span>
        </div>
    )
}
