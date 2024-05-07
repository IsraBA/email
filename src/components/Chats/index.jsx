import React, { useState } from 'react'
import styles from './styles.module.css'
import Search from '../Search'
import ListChat from '../ListChat'
import { Outlet, useNavigate, useOutletContext, useParams } from 'react-router-dom'
import api from '../../functions/api'
import { useEffect } from 'react'
import Loader from '../Loader'
import { useUser } from '../../Context/userContext'
import NoChat from '../../pages/NoChat'


export default function Chats() {

  const nav = useNavigate();

  const { user } = useUser();
  const { setUnreadObj } = useOutletContext();

  const { type } = useParams();

  const [chats, setChats] = useState([]);
  const [loadChats, setLoadChats] = useState(true);

  // משתנה שקובע האם יש צ'אט פתוח ועל פי זה ידע אם להעלים את הצ'אטים או לא
  const [isChatOpen, setisChatOpen] = useState(false);
  useEffect(() => {
    const pathParts = location.pathname.split('/')
    if (pathParts.length == 4) { setisChatOpen(true) }
    else { setisChatOpen(false) };
  }, [nav])


  const resetChats = () => {
    setChats([]);
    setLoadChats(true);
    const boxes = ['inbox', 'sent', 'favorite', 'draft', 'deleted'];
    if (boxes.includes(type)) {
      api.get('chat/' + type).then(res => { setChats(res), setLoadChats(false) });
    } else {
      api.get('chat/label/' + type).then(res => { setChats(res), setLoadChats(false) });
    }
  };

  useEffect(() => {
    resetChats();
  }, [type]);

  const memberImages = (members = []) => {
    if (members.length > 2) {
      return members.map(member => member.image);
    } else if (members.length === 2) {
      // קבלת התמונה של מי שמשתתף איתנו בשיחה
      return members.find(m => m._id !== user._id)?.image;
    } else {
      return members[0].image;
    }
  };

  const memberNames = (members = []) => {
    if (members.length > 2) {
      return members.map(member => member.userName);
    } else if (members.length === 2) {
      // קבלת השם של מי שמשתתף איתנו בשיחה
      return members.find(m => m._id !== user._id)?.userName;
    } else {
      return members[0].userName;
    }
  };

  // רינדור שונה של עמוד הטיוטות
  if (type === 'draft') {
    return (
      <div className={isChatOpen ? `${styles.drafts} ${styles.chatOpen}` : styles.drafts}>
        <div className={styles.search}>
          <Search setChats={setChats} resetChats={resetChats} setLoadChats={setLoadChats} />
        </div>
        {loadChats ? <Loader /> :
          chats.length === 0 ? <NoChat msg={"There are no Drafts"} /> :
            <ul className={styles.msgList}>
              {chats.map(chat => {
                return (<ListChat
                  key={chat._id}
                  id={chat._id}
                  link={`/messages/newMessage`}
                  image={memberImages(chat.chat?.members)}
                  sender={memberNames(chat.chat?.members)}
                  time={chat.chat?.lastDate}
                  subject={chat.chat?.subject}
                  isRead={chat.isRead}
                  isFavorite={chat.isFavorite}
                  chats={chats}
                  isDraft={true}
                  members={chat.chat?.members}
                  msg={chat.chat?.messages[0].content}
                  setChats={setChats}
                />)
              })}
            </ul>
        }
      </div>
    )
  }

  return (
    <>
      <div className={isChatOpen ? `${styles.chats} ${styles.chatOpen}` : styles.chats}>
        <div className={styles.search}>
          <Search setChats={setChats} resetChats={resetChats} setLoadChats={setLoadChats} />
        </div>
        {loadChats ? <Loader /> :
          chats.length === 0 ? <NoChat msg={"There are no chats yet"} /> :
            <ul className={styles.msgList}>
              {chats.map(chat => {
                return (<ListChat
                  key={chat._id}
                  id={chat._id}
                  link={`/messages/${type}/${chat._id}`}
                  image={memberImages(chat.chat?.members)}
                  sender={memberNames(chat.chat?.members)}
                  time={chat.chat?.lastDate}
                  subject={chat.chat?.subject}
                  isRead={chat.isRead}
                  isFavorite={chat.isFavorite}
                  chats={chats}
                />)
              })}
            </ul>
        }
      </div>
      <Outlet context={{ setChats, setUnreadObj }} />
    </>
  )
}
