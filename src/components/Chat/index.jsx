import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './styles.module.css'
import Label from '../Label';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faPrint, faStar, faTag, faTrash, faUsers } from '@fortawesome/free-solid-svg-icons';
import SingleMsg from '../SingleMsg';
import NewMsgForm from '../NewMsgForm';
import api from '../../functions/api';
import formatTime from '../../functions/formatTime'
import { usePopUp } from '../../Context/PopupContext';
import Confirm from '../Confirm';
import apiToast from '../../functions/apiToast';
import ContextMenu from '../ContextMenu';

export default function Chat() {

  const { setPopUpComp } = usePopUp();

  const { chatId } = useParams();

  const nav = useNavigate();

  const menuBtn = useRef(null);

  const [chat, setChat] = useState({});
  const [menu, setMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    api.get('chat/singleChat/' + chatId).then(setChat);
  }, [chatId]);

  if (!chat) return null;

  const openMenu = () => {
    // העברת המיקום של הכפתור לתפריט הנפתח
    const rect = menuBtn.current.getBoundingClientRect();
    setMenuPosition({ x: rect.left, y: rect.bottom });
    setMenu(true);
  };

  const deleteChat = () => {
    if (chat.isDeleted) {
      setPopUpComp(<Confirm message={`Are you sure you want to delete this chat FOREVER?`} func={
        () => apiToast.del('chat/' + chatId, {}, {},
          "Deleting chat...", "Chat deleted", "Error deleting chat")
          .then(() => {
            setChat({}),
              nav(location.pathname.substring(0, location.pathname.lastIndexOf('/')))
          })
      } />)
    } else {
      setPopUpComp(<Confirm message={`Are you sure you want to delete this chat?`} func={
        () => apiToast.put('chat/deleteChat/' + chatId, {}, {},
          "Deleting chat...", "Chat deleted", "Error deleting chat")
          .then(() => {
            setChat({}),
              nav(location.pathname.substring(0, location.pathname.lastIndexOf('/')))
          })
      } />)
    }
  }

  return (
    <div className={styles.chat}>
      <div className={styles.head}>
        <div className={styles.labels}>{chat.labels?.map(lab => <Label key={lab} text={lab} />)}</div>
        <div className={styles.icons}>
          {/* TODO: להוסיף פונקציונליות לכוכב ושאר האפשרויות */}
          <button><FontAwesomeIcon icon={faStar} /></button>
          <button><FontAwesomeIcon icon={faPrint} /></button>
          <button onClick={deleteChat}><FontAwesomeIcon icon={faTrash} /></button>
          <button ref={menuBtn} onClick={openMenu}><FontAwesomeIcon icon={faEllipsisVertical} /></button>
          {menu && <ContextMenu x={menuPosition.x} y={menuPosition.y}
            direction={"up-left"}
            closeMenu={() => setMenu(false)}
            options={[
              {
                icon: <FontAwesomeIcon icon={faUsers} />,
                title: 'Members list',
                func: () => { }
              },
              {
                icon: <FontAwesomeIcon icon={faTag} />,
                title: 'Add label',
                func: () => { }
              },
            ]} />}
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
      <NewMsgForm chatId={chat?.chat?._id} setChat={setChat} outerChatId={chatId} />
    </div>
  )
}
