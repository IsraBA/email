import styles from './styles.module.css'
import SideBar from '../components/SideBar'
import { Outlet, useNavigate } from 'react-router-dom'
import { UserProvider } from '../Context/userContext'
import { useEffect, useState } from 'react';

export default function Layout() {

  const nav = useNavigate();

    // משתנה שקובע האם אין צ'אט פתוח ועל פי זה ידע אם להעלים את החלון של הצ'אט
    const [isChatOpen, setisChatOpen] = useState(false);
    useEffect(() => {
      const pathParts = location.pathname.split('/');
      if (pathParts.length == 4) { setisChatOpen(true) }
      else { setisChatOpen(false) };
    }, [nav])

  return (
    <UserProvider>
      <div className={isChatOpen ? `${styles.layout} ${styles.chatOpen}` : styles.layout}>
        <SideBar />
        <Outlet />
      </div>
    </UserProvider>
  )
}
