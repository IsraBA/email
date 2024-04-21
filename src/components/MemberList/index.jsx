import React from 'react'
import styles from './styles.module.css'
import ButtonComp from '../ButtonComp'
import { faEnvelope, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import { usePopUp } from '../../Context/PopupContext'

export default function MemberList({ members = [] }) {

    const nav = useNavigate();

    const { setPopUpComp } = usePopUp();

    const sendMsg = (member) => {
        setPopUpComp();
        nav('/messages/newMessage', { state: { addressee: member } });
    };

    return (
        <ul className={styles.container}>
            <h2 className={styles.title}>Members in the chat</h2>
            {members.map(m => <li className={styles.member} key={m._id}>
                <img className={styles.profilePic} src={m.image} alt={m.userName + " profile picture"} />
                <span>
                    <h3 className={styles.memberName}>{m.userName}</h3>
                    <p className={styles.email}>{m.email}</p>
                </span>
                <button
                    className={styles.sendMsg}
                    title='Send message'
                    onClick={() => sendMsg(m)}>
                    <FontAwesomeIcon icon={faPaperPlane} />
                </button>
            </li>)}
        </ul>
    )
}
