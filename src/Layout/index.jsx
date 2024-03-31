import React from 'react'
import styles from './styles.module.css'
import SideBar from '../components/SideBar'
import MailBox from '../components/MailBox'
import Chats from '../components/Chats'
import Chat from '../components/Chat'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className={styles.layout}>
      <SideBar />
      <Outlet />
    </div>
  )
}
