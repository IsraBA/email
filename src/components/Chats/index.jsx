import React, { useState } from 'react'
import styles from './styles.module.css'
import Search from '../Search'
import ListChat from '../ListChat'
import { Outlet, useOutletContext, useParams } from 'react-router-dom'
import api from '../../functions/api'
import { useEffect } from 'react'
import Loader from '../Loader'


export default function Chats() {

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

  const memberImages = (members = [], userId = "66128823d5cbfbbc8fa1ab14") => {
    if (members.length > 2) {
      return members.map(member => member.image);
    } else {
      // קבלת התמונה של מי שמשתתף איתנו בשיחה
      return members.find(m => m._id !== userId)?.image;
    }
  };
  //                                               להחליף בקונטקסט
  const memberNames = (members = [], userId = "66128823d5cbfbbc8fa1ab14") => {
    if (members.length > 2) {
      return members.map(member => member.userName);
    } else {
      // קבלת השם של מי שמשתתף איתנו בשיחה
      return members.find(m => m._id !== userId)?.userName;
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
