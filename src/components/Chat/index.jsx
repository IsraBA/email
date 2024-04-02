import React from 'react'
import styles from './styles.module.css'
import Label from '../Label';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faPrint, faStar, faTrash } from '@fortawesome/free-solid-svg-icons';
import SingleMsg from '../SingleMsg';
import MessageInput from '../NewMsgText';

export default function Chat() {

  const fakeData = {
    image: 'https://newprofilepic.photo-cdn.net//assets/images/article/profile.jpg?90af0c8',
    labels: ["Work", "Promising offers"],
    subject: "Meeting with new investors",
    messages: [
      {
        sender: "Jessica Koel",
        time: "14.09.2020 09:25",
        message: "Hi, I have a new meeting opportunity Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi velit quibusdam ad aliquid, suscipit et voluptatum dolorem ullam placeat excepturi illo, neque sunt quia, qui iste iure ut ea minima! Eius sed perferendis atque laborum voluptatem, temporibus quasi. Laborum fuga impedit earum temporibus ipsum nesciunt beatae nihil velit, illo, voluptas architecto vitae doloribus incidunt eaque perspiciatis aut fugiat rem eius! Eligendi adipisci voluptas odio quo ipsum ut ullam reiciendis fuga cupiditate repellat sunt illo, aliquid officiis harum et repellendus temporibus quidem itaque delectus expedita quibusdam veniam. Consectetur, quisquam fugiat magni similique quam sed reiciendis aut! Id numquam architecto quibusdam accusantium",
        _id: 1
      },
      {
        sender: "You",
        time: "14.09.2020 10:11",
        message: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi velit quibusdam ad aliquid, suscipit et voluptatum dolorem ullam placeat excepturi illo, neque sunt quia, qui iste iure ut ea minima! Eius sed perferendis atque laborum voluptatem, temporibus quasi. Laborum fuga impedit earum temporibus ipsum nesciunt beatae nihil velit, illo, voluptas architecto vitae doloribus incidunt eaque perspiciatis aut fugiat rem eius! Eligendi adipisci voluptas odio quo ipsum ut ullam reiciendis fuga cupiditate repellat sunt illo, aliquid officiis harum et repellendus temporibus quidem itaque delectus expedita quibusdam veniam. Consectetur, quisquam fugiat magni similique quam sed reiciendis aut! Id numquam architecto quibusdam accusantium.",
        _id: 2
      },
      {
        sender: "Jessica Koel",
        time: "Today, 16.09.2020, 11:26",
        message: "Hey Jontray, Do you remember about tomorrow's meeting with new investors? Here you have more information about the conference at which we will be together with the client",
        _id: 3
      }
    ],
    lastMsgTime: "Today, 16.09.2020, 11:26"
  }

  const { image, labels, lastMsgTime, subject, messages } = fakeData;

  return (
    <div className={styles.chat}>
      <div className={styles.head}>
        <div className={styles.labels}>{labels.map(lab => <Label key={lab} text={lab} />)}</div>
        <div className={styles.icons}>
          <span><FontAwesomeIcon icon={faStar} /></span>
          <span><FontAwesomeIcon icon={faPrint} /></span>
          <span><FontAwesomeIcon icon={faTrash} /></span>
          <span><FontAwesomeIcon icon={faEllipsisVertical} /></span>
        </div>
      </div>
      <div className={styles.subject}>
        <p className={styles.lastMsgTime}>{lastMsgTime}</p>
        <h1>{subject}</h1>
      </div>
      <ul className={styles.msgs}>
        {messages.map(msg => <li key={msg._id}>
          <SingleMsg image={image} message={msg.message} sender={msg.sender} time={msg.time}/>
        </li>)}
      </ul>
      <MessageInput/>
    </div>
  )
}
