import React from 'react'
import styles from './styles.module.css'
import chatsImg from '../../assets/chatsImg.png'

export default function NoChat({msg}) {
  return (
    <div className={styles.container}>
        <img src={chatsImg} alt="choose a chat image" />
        <h2 className={styles.noChatText}>{msg}</h2>
    </div>
  )
}
