import React, { useState } from 'react'
import styles from './styles.module.css'
import { faReply } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReactQuill from 'react-quill';
import sanitizeHtml from 'sanitize-html';

export default function SingleMsg({ image, sender, message, time }) {

    const [isOpen, setIsOpen] = useState(false);

    const plainText = sanitizeHtml(message, {
        // allowedTags: [
        //     'strong', 'em', 'sub', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'a', 'ul', 'ol', 'li', 'br', 'img', 'hr', 'table', 'tr', 'td', 'th', 'b', 'i', 'strike', 'u', 's', 'sup', 'sub'
        // ],
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
            <p className={styles.msg} onClick={(e) => { e.stopPropagation(), setIsOpen(true) }} dangerouslySetInnerHTML={{ __html: plainText }}>
                {/* <ReactQuill value={message} readOnly theme='bubble' /> */}
                {/* {message} */}
            </p>
            <span className={styles.time}>{time}</span>
        </div>
    )
}
