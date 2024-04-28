import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import styles from './styles.module.css'
import Label from '../Label';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faPrint, faTag, faStar, faTrash, faUsers, faTrashArrowUp, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import SingleMsg from '../SingleMsg';
import NewMsgForm from '../NewMsgForm';
import api from '../../functions/api';
import formatTime from '../../functions/formatTime'
import { usePopUp } from '../../Context/PopupContext';
import Confirm from '../Confirm';
import apiToast from '../../functions/apiToast';
import ContextMenu from '../ContextMenu';
import MemberList from '../MemberList';
import Loader from '../Loader';
import AddLabelPopUp from '../AddLabelPopUp';
import LabelListPopUp from '../LabelListPopUp';

export default function Chat() {

  const { setChats, setUnreadObj } = useOutletContext();

  const { setPopUpComp } = usePopUp();

  const { chatId } = useParams();

  const nav = useNavigate();

  const menuBtn = useRef(null);

  const [chat, setChat] = useState({});
  const [menu, setMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [isFavChat, setIsFavChat] = useState(false);

  useEffect(() => {
    setChat({});
    api.get('chat/singleChat/' + chatId).then(setChat);
  }, [chatId]);

  useEffect(() => {
    if (chat.chat) {
      setIsFavChat(chat.isFavorite)
    }
  }, [chat]);

  if (!chat.chat) return <Loader />;

  const openMenu = () => {
    // העברת המיקום של הכפתור לתפריט הנפתח
    const rect = menuBtn.current.getBoundingClientRect();
    const middleX = rect.left + rect.width / 2;
    const middleY = rect.top + rect.bottom / 2;
    setMenuPosition({ x: middleX, y: middleY });
    setMenu(true);
  };

  const deleteChat = () => {
    if (chat.isDeleted) {
      setPopUpComp(<Confirm message={`Are you sure you want to delete this chat FOREVER?`} func={
        () => apiToast.del('chat/' + chatId, {}, {},
          "Deleting chat...", "Chat deleted", "Error deleting chat")
          .then(() => {
            setChats(prev => prev.filter(chat => chat._id !== chatId));
            setChat({});
            nav(location.pathname.substring(0, location.pathname.lastIndexOf('/')));
          })
      } />)
    } else {
      setPopUpComp(<Confirm message={`Are you sure you want to delete this chat?`} func={
        () => apiToast.put('chat/deleteChat/' + chatId, {}, {},
          "Deleting chat...", "Chat deleted", "Error deleting chat")
          .then(() => {
            setChats(prev => prev.filter(chat => chat._id !== chatId));
            setChat({});
            nav(location.pathname.substring(0, location.pathname.lastIndexOf('/')));
          })
      } />)
    }
  }

  const toggleFavorite = () => {
    if (isFavChat) {
      apiToast.put('chat/removeFromFavorite/' + chatId, {}, {},
        "Removing from favorite...", "Removed from favorite", "Error removing from favorite")
        .then(() => setIsFavChat(false));

    } else {
      apiToast.put('chat/addToFavorite/' + chatId, {}, {},
        "Adding to favorite...", "Added to favorite", "Error adding to favorite")
        .then(() => setIsFavChat(true));
    }
  }

  const restoreChat = () => {
    apiToast.put('chat/restoreChat/' + chatId, {}, {},
      "Restoring chat...", "Chat restored", "Error restoring chat")
      .then(() => {
        setChats(prev => prev.filter(chat => chat._id !== chatId));
        setChat({});
        nav(location.pathname.substring(0, location.pathname.lastIndexOf('/')));
      })
  };

  const MarkAsUnread = () => {
    apiToast.put('chat/markAsUnread/' + chatId, {}, {},
      "Marking as unread...", "Marked as unread", "Error marking as unread")
      .then(() => {
        setChats(prev => prev.map(chat => chat._id == chatId ? { ...chat, isRead: false } : chat));
        api.get('chat/unreadCount/unreadObj').then(setUnreadObj);
      })
  };

  const openMemberList = () => {
    setPopUpComp(<MemberList members={chat?.chat?.members} />)
  }

  const openLabelList = () => {
    setPopUpComp(<LabelListPopUp existingChatLabels={chat.labels} chatId={chatId} setChat={setChat} />)
  }

  return (
    <div className={styles.chat}>
      <div className={styles.head}>
        <div className={styles.labels}>{chat.labels?.map(lab => (
          <Label key={lab.title} text={lab.title} color={lab.color} chatId={chatId} setChat={setChat} />)
        )}</div>
        <div className={styles.icons}>
          <label className={styles.container}>
            <input type="checkbox" checked={isFavChat} onChange={toggleFavorite} />
            <svg className={styles.starRegular} xmlns="http://www.w3.org/2000/svg" height="17px" viewBox="0 0 576 512"><path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.6 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"></path></svg>
            <svg className={styles.starSolid} xmlns="http://www.w3.org/2000/svg" height="17px" viewBox="0 0 576 512"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path></svg>
          </label>

          <button onClick={() => window.print()}><FontAwesomeIcon icon={faPrint} /></button>

          <button onClick={deleteChat}><FontAwesomeIcon icon={faTrash} /></button>

          <button className={menu ? styles.active : ''} ref={menuBtn} onClick={openMenu}>
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </button>

          {menu && <ContextMenu x={menuPosition.x} y={menuPosition.y}
            direction={"up-left"}
            closeMenu={() => setMenu(false)}
            options={[
              {
                icon: <FontAwesomeIcon icon={faUsers} />,
                title: 'Members list',
                func: () => openMemberList()
              },
              {
                icon: <FontAwesomeIcon icon={faTag} />,
                title: 'Manage labels',
                func: () => openLabelList()
              },
              {
                icon: <FontAwesomeIcon icon={faEnvelope} />,
                title: 'Mark as unread',
                func: () => MarkAsUnread()
              },
              chat.isDeleted ? {
                icon: <FontAwesomeIcon icon={faTrashArrowUp} />,
                title: 'Restore chat',
                func: () => restoreChat()
              } : null,
            ].filter(option => option !== null)} />}
        </div>
      </div>
      <div className={styles.subject}>
        <p className={styles.lastDate}>{formatTime(chat?.chat?.lastDate)}</p>
        <h1>{chat?.chat?.subject}</h1>
      </div>
      <ul className={styles.msgs}>
        {chat?.chat?.messages?.map(msg => <li key={msg._id}>
          <SingleMsg
            image={msg.from.image}
            message={msg.content}
            sender={msg.from.userName}
            senderId={msg.from._id}
            time={formatTime(msg.date)}
          />
        </li>)}
      </ul>
      <NewMsgForm chatId={chat?.chat?._id} setChat={setChat} outerChatId={chatId} />
    </div>
  )
}
