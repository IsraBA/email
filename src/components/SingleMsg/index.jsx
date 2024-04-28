import React, { useState } from 'react'
import styles from './styles.module.css'
import { faReply } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReactQuill from 'react-quill';
import getHighlightedText from '../../functions/highlightText';
import { useSearchHighlight } from '../../Context/HighlightContext';
import { useUser } from '../../Context/userContext';

export default function SingleMsg({ image, sender, message, time, senderId }) {

    const { user } = useUser();
    const { highlightText } = useSearchHighlight();

    const [isOpen, setIsOpen] = useState(false);

    const htmlToPlainText = (html) => {
        // Replace <br> tags with newline characters
        let plainText = html.replace(/<br\s*\/?>/gi, '\n');

        // Remove all other HTML tags
        plainText = plainText.replace(/<[^>]+>/g, ' ');

        return plainText;
    };

    return (
        <div className={isOpen ? styles.openMsg : styles.closeMsg} onClick={(e) => setIsOpen(!isOpen)}>
            <span className={styles.senderDetails}>
                {senderId == user?._id ?
                    <span className={styles.icon}><FontAwesomeIcon icon={faReply} fontSize={30} /></span> :
                    <img className={styles.profile} src={image} alt="profile picture" />}
                {senderId == user?._id ?
                    <span className={styles.sender}>you</span> :
                    <span className={styles.sender}>{sender}</span>}
            </span>
            {isOpen ? <div className={styles.msg} onClick={(e) => { e.stopPropagation(), setIsOpen(true) }}>
                <ReactQuill value={message} readOnly theme='bubble' className='readOnlyComp' />
            </div> : <div className={styles.msg}>{getHighlightedText(htmlToPlainText(message), highlightText)}</div>}
            <span className={styles.time}>{time}</span>
        </div>
    )
}
