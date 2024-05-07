import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import chatsImg from '../../assets/chatsImg.png'
import { useNavigate } from 'react-router-dom';

export default function NoChat({ msg }) {

  const nav = useNavigate();

  // משתנה שקובע האם אין צ'אט פתוח ועל פי זה ידע אם להעלים את החלון של הצ'אט
  const [isChatOpen, setisChatOpen] = useState(false);
  useEffect(() => {
    const pathParts = location.pathname.split('/')
    if (pathParts.length == 4) { setisChatOpen(true) }
    else { setisChatOpen(false) };
  }, [nav])

  return (
    <div className={isChatOpen ? styles.container : `${styles.container} ${styles.chatClose}`}>
      <img src={chatsImg} alt="choose a chat image" />
      <h2 className={styles.noChatText}>{msg}</h2>
    </div>
  )
}
