import { useNavigate } from 'react-router-dom'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import formatTime from '../../functions/formatTime'
import { NavLink, useOutletContext } from 'react-router-dom'
import { faEnvelope, faTag, faTrashArrowUp, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import api from '../../functions/api'
import getHighlightedText from '../../functions/highlightText'
import { useSearchHighlight } from '../../Context/HighlightContext'
import apiToast from '../../functions/apiToast'
import ContextMenu from '../ContextMenu'
import MemberList from '../MemberList'
import LabelListPopUp from '../LabelListPopUp'
import { useUser } from '../../Context/userContext'

export default function ListChat({
    id,
    link,
    image,
    sender = '',
    subject,
    time,
    isRead,
    chats,
    isFavorite,
    isDraft,
    members,
    msg,
    setChats
}) {

    const { user } = useUser();

    const { setUnreadObj } = useOutletContext();

    const { highlightText } = useSearchHighlight();

    const nav = useNavigate();

    const [isReadIndication, setIsReadIndication] = useState(isRead);
    const [isFavChat, setIsFavChat] = useState(isFavorite);

    const markAsRead = () => {
        if (isDraft) {
            nav(link, {
                state: {
                    draftSubject: subject,
                    draftMembers: members ?
                        members.map(member => ({ email: member.email, _id: member._id }))
                            .filter(member => member.email !== user.email) : [],
                    draftMessage: msg,
                    draftId: id
                }
            });
            return;
        }
        if (!isRead) {
            api.put('chat/markAsRead/' + id).then(() => {
                setIsReadIndication(true);
                api.get('chat/unreadCount/unreadObj').then(setUnreadObj);
            });
        }
        nav(link);
    };

    useEffect(() => {
        setIsReadIndication(isRead)
    }, [chats]);

    const toggleFavorite = (bool) => {
        if (bool) {
            apiToast.put('chat/addToFavorite/' + id, {}, {},
                "Adding to favorite...", "Added to favorite", "Error adding to favorite")
                .then(() => setIsFavChat(true));
        } else {
            apiToast.put('chat/removeFromFavorite/' + id, {}, {},
                "Removing from favorite...", "Removed from favorite", "Error removing from favorite")
                .then(() => setIsFavChat(false));
        }
    }

    const deleteDraft = (e) => {
        e.stopPropagation();
        e.preventDefault();
        apiToast.del('chat/deleteDraft/' + id, {}, {},
            "Deleting message...", "Message deleted", "Error deleting message")
            .then(() => {
                setChats(chats.filter(chat => chat._id !== id));
            });
    };

    return (
        <NavLink to={link}  className={styles.msgBlock} onClick={markAsRead}>
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
                        <h3 className={styles.members}>{getHighlightedText(sender.join(', '), highlightText)}</h3>
                        {sender.length > 2 ? <h3>+{sender.length - 2}</h3> : null}
                    </div>
                    : <h3>{getHighlightedText(sender, highlightText)}</h3>}
                <p id={isDraft ? styles.subject : ''}>{getHighlightedText(subject, highlightText)}</p>
            </div>
            {/* ---------------------------------------------------- */}
            <div className={styles.timeAndNotf}>
                <div className={styles.time}>{formatTime(time)}</div>
                {isDraft ?
                    <button
                        className={styles.deleteDraft}
                        onClick={deleteDraft}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button> :
                    isReadIndication ?
                        <label className={styles.container} onClick={e => e.stopPropagation()}>
                            <input type="checkbox" checked={isFavChat} onChange={e => toggleFavorite(e.target.checked)} />
                            <svg className={styles.starRegular} xmlns="http://www.w3.org/2000/svg" height="17px" viewBox="0 0 576 512"><path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.6 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"></path></svg>
                            <svg className={styles.starSolid} xmlns="http://www.w3.org/2000/svg" height="17px" viewBox="0 0 576 512"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path></svg>
                        </label> :
                        <div className={styles.read}><FontAwesomeIcon icon={faEnvelope} /></div>}
            </div>
        </NavLink>
    )
}
