import React, { useState } from 'react'
import styles from './styles.module.css'
import Search from '../Search'
import ListChat from '../ListChat'
import { Outlet, useOutletContext, useParams } from 'react-router-dom'
import api from '../../functions/api'
import { useEffect } from 'react'
import Loader from '../Loader'
import { useUser } from '../../Context/userContext'


export default function Chats() {

  const { user } = useUser();
  const { setUnreadObj } = useOutletContext();

  const { type } = useParams();

  const [chats, setChats] = useState([]);
  const [loadChats, setLoadChats] = useState(true);

  const resetChats = () => {
    setChats([]);
    setLoadChats(true);
    api.get('chat/' + type).then(res => { setChats(res), setLoadChats(false) });
  };

  useEffect(() => {
    resetChats();
  }, [type])

  // useEffect(() => {
  //   console.log("chats: ", chats)
  // }, [chats])

  const memberImages = (members = []) => {
    if (members.length > 2) {
      return members.map(member => member.image);
    } else if (members.length === 2)  {
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

  return (
    <>
      <div className={styles.chats}>
        <div className={styles.search}>
          <Search setChats={setChats} resetChats={resetChats} setLoadChats={setLoadChats} />
        </div>
        {loadChats ? <Loader /> :
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
