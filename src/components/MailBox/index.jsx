import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import ButtonComp from '../ButtonComp'
import MailBoxOption from '../MailBoxOption'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faEnvelope, faInbox, faPaperPlane, faPen, faStar, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Outlet } from 'react-router-dom'
import Labels from '../Labels'
import { useNavigate } from 'react-router-dom'
import api from '../../functions/api'


export default function MailBox() {

  const nav = useNavigate();

  const [unreadObj, setUnreadObj] = useState({
    inbox: 0,
    favorite: 0,
    deleted: 0
  })

  useEffect(() => {
    api.get('chat/unreadCount/unreadObj').then(setUnreadObj)
  }, [])


  return (
    <>
      <div className={styles.mailBox}>
        <div className={styles.head}>
          <div className={styles.headline}>
            <button className={styles.back}><FontAwesomeIcon icon={faArrowLeft} /></button>
            <h1>MailBox</h1>
          </div>
          <ButtonComp titleAndIcon={[<FontAwesomeIcon icon={faEnvelope} />, 'New message']} click={() => nav('newMessage')} />
        </div>
        <ul className={styles.subjects}>
          <li><MailBoxOption
            icon={<FontAwesomeIcon icon={faInbox} />}
            title='Inbox'
            link='/messages/inbox'
            notificationsNum={unreadObj.inbox}
          /></li>
          <li><MailBoxOption
            icon={<FontAwesomeIcon icon={faPaperPlane} />}
            title='Sent Emails'
            link='/messages/sent'
          /></li>
          <li><MailBoxOption
            icon={<FontAwesomeIcon icon={faStar} />}
            title='Favourites'
            link='/messages/favorite'
            notificationsNum={unreadObj.favorite}
          /></li>
          <li><MailBoxOption
            icon={<FontAwesomeIcon icon={faPen} />}
            title='Draft'
            link='/messages/draft'
          /></li>
          <li><MailBoxOption
            icon={<FontAwesomeIcon icon={faTrash} />}
            title='Deleted'
            link='/messages/deleted'
            notificationsNum={unreadObj.deleted}
          /></li>
        </ul>
        <Labels />
      </div>
      <Outlet context={{ setUnreadObj }} />
    </>
  )
}
