import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from './styles.module.css'
import Label from '../Label';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faPrint, faStar, faTrash } from '@fortawesome/free-solid-svg-icons';
import SingleMsg from '../SingleMsg';
import NewMsgForm from '../NewMsgForm';
import api from '../../functions/api';
import formatTime from '../../functions/formatTime'

export default function Chat() {

  const { chatId } = useParams();

  const [chat, setChat] = useState({});

  useEffect(() => {
    api.get('chat/singleChat/' + chatId).then(setChat);
  }, [chatId]);

  if (!chat) return null;

  return (
    <div className={styles.chat}>
      <div className={styles.head}>
        <div className={styles.labels}>{chat.labels?.map(lab => <Label key={lab} text={lab} />)}</div>
        <div className={styles.icons}>
          {/* TODO: להוסיף פונקציונליות לכוכב ושאר האפשרויות */}
          <span><FontAwesomeIcon icon={faStar} /></span>
          <span><FontAwesomeIcon icon={faPrint} /></span>
          <span><FontAwesomeIcon icon={faTrash} /></span>
          <span><FontAwesomeIcon icon={faEllipsisVertical} /></span>
        </div>
      </div>
      <div className={styles.subject}>
        <p className={styles.lastDate}>{formatTime(chat?.chat?.lastDate)}</p>
        <h1>{chat?.chat?.subject}</h1>
      </div>
      <ul className={styles.msgs}>
        {chat?.chat?.messages?.map(msg => <li key={msg._id}>
          <SingleMsg image={msg.from.image} message={msg.content} sender={msg.from.userName} time={formatTime(msg.date)} />
        </li>)}
      </ul>
      <NewMsgForm chatId={chat?.chat?._id} setChat={setChat} outerChatId={chatId}/>
    </div>
  )
}
