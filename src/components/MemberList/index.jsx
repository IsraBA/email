import React, { useRef } from 'react'
import styles from './styles.module.css'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import { usePopUp } from '../../Context/PopupContext'
import ImagePopup from '../ImagePopup'

export default function MemberList({ members = [] }) {

    const nav = useNavigate();

    const { setPopUpComp } = usePopUp();

    const sendMsg = (member) => {
        setPopUpComp();
        nav('/messages/newMessage', { state: { addressee: member } });
    };

    const openImg = (src, alt, ref) => {
        const { top, left } = ref.current.getBoundingClientRect();
        // console.log({ top, left })
        setPopUpComp(<ImagePopup img={src} title={alt} x={left} y={top} />);
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Members in the chat</h2>
            <ul className={styles.innerContainer}>
                {members.map(m => {
                    const imgRef = useRef(null);
                    return (
                        <li className={styles.member} key={m._id}>
                            <div className={styles.details}>
                                <img
                                    className={styles.profilePic}
                                    src={m.image}
                                    alt={m.userName + " profile picture"}
                                    onClick={() => openImg(m.image, m.userName + " profile picture", imgRef)}
                                    ref={imgRef}
                                />
                                <span>
                                    <h3 className={styles.memberName}>{m.userName}</h3>
                                    <p className={styles.email}>{m.email}</p>
                                </span>
                            </div>
                            <button
                                className={styles.sendMsg}
                                title='Send message'
                                onClick={() => sendMsg(m)}>
                                <FontAwesomeIcon icon={faPaperPlane} />
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}
