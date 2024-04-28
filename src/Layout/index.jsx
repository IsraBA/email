import React from 'react'
import styles from './styles.module.css'
import SideBar from '../components/SideBar'
import { Outlet } from 'react-router-dom'
import { UserProvider } from '../Context/userContext'

export default function Layout() {
  return (
    <UserProvider>
      <div className={styles.layout}>
        <SideBar />
        <Outlet />
      </div>
    </UserProvider>
  )
}
