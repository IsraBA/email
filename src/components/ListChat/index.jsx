import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import formatTime from '../../functions/formatTime'
import { NavLink, useOutletContext } from 'react-router-dom'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import api from '../../functions/api'
import getHighlightedText from '../../functions/highlightText'
import { useSearchHighlight } from '../../Context/HighlightContext'

export default function ListChat({ id, link, image, sender = '', subject, time, isRead, chats }) {

    const { setUnreadObj } = useOutletContext();

    const { highlightText } = useSearchHighlight();

    const [isReadIndication, setIsReadIndication] = useState(isRead);

    const markAsRead = () => {
        if (!isRead) {
            api.put('chat/markAsRead/' + id).then(() => {
                setIsReadIndication(true);
                api.get('chat/unreadCount/unreadObj').then(setUnreadObj);
            });
        }
    };

    useEffect(() => {
        setIsReadIndication(isRead)
    }, [chats]);

    return (
        <NavLink to={link} className={styles.msgBlock} onClick={markAsRead}>
            {/* בירור כמה אנשים משתתפים בצ'אט ומה להציג על פי זה */}
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
                    <div className={styles.multiSender} title={sender.join(', ')}>
                        {/* {''.toString()} */}
                        <h3 className={styles.members}>{getHighlightedText(`${sender[0]}, ${sender[1]}, `, highlightText)}</h3>
                        {sender.length > 2 ? <h3>+{sender.length - 2}</h3> : null}
                    </div>
                    : <h3>{getHighlightedText(sender, highlightText)}</h3>}
                <p>{getHighlightedText(subject, highlightText)}</p>
            </div>
            {/* ---------------------------------------------------- */}
            <div className={styles.timeAndNotf}>
                <div className={styles.time}>{formatTime(time)}</div>
                {!isReadIndication && <div className={styles.read}><FontAwesomeIcon icon={faEnvelope} /></div>}
            </div>
        </NavLink>
    )
}
