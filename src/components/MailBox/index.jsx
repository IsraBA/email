import React from 'react'
import styles from './styles.module.css'
import ButtonComp from '../ButtonComp'
import MailBoxOption from '../MailBoxOption'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faEnvelope, faInbox, faPaperPlane, faPen, faStar, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Outlet } from 'react-router-dom'
import { usePopUp } from '../../Context/PopupContext'
import Labels from '../Labels'
import api from '../../functions/api'


export default function MailBox() {

  const { setPopUpComp } = usePopUp();

  return (
    <>
      <div className={styles.mailBox}>
        <div className={styles.head}>
          <div className={styles.headline}>
            <button className={styles.back}><FontAwesomeIcon icon={faArrowLeft} /></button>
            <h1>MailBox</h1>
          </div>
          <ButtonComp titleAndIcon={[<FontAwesomeIcon icon={faEnvelope} />, 'New message']} click={() => setPopUpComp(<>hello</>)} />
        </div>
        <ul className={styles.subjects}>
          <li><MailBoxOption
            icon={<FontAwesomeIcon icon={faInbox} />}
            title='Inbox'
            link='/messages/inbox'
            notificationsNum={0}
          /></li>
          <li><MailBoxOption
            icon={<FontAwesomeIcon icon={faPaperPlane} />}
            title='Sent Emails'
            link='/messages/sent'
            notificationsNum={0}
          /></li>
          <li><MailBoxOption
            icon={<FontAwesomeIcon icon={faStar} />}
            title='Favourites'
            link='/messages/favorite'
            notificationsNum={0}
          /></li>
          <li><MailBoxOption
            icon={<FontAwesomeIcon icon={faPen} />}
            title='Draft'
            link='/messages/draft'
            notificationsNum={0}
          /></li>
          <li><MailBoxOption
            icon={<FontAwesomeIcon icon={faTrash} />}
            title='Deleted'
            link='/messages/deleted'
            notificationsNum={0}
          /></li>
        </ul>
        <Labels />
      </div>
      <Outlet />
    </>
  )
}
