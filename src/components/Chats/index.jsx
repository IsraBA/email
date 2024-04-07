import React, { useState } from 'react'
import styles from './styles.module.css'
import Search from '../Search'
import Message from '../Message'
import { Outlet, useParams } from 'react-router-dom'
import api from '../../functions/api'
import { useEffect } from 'react'


export default function Chats() {

  const { type } = useParams();

  // const chats = [
  //   {
  //     profileP: 'https://newprofilepic.photo-cdn.net//assets/images/article/profile.jpg?90af0c8',
  //     chat: "Jessica Koel",
  //     time: "27.03.2024 09:25",
  //     message: "Hi, I have a new meeting opportunity...",
  //     notfNum: 147,
  //     _id: 1
  //   },
  //   {
  //     profileP: 'https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg',
  //     chat: "John Doe",
  //     time: "26.03.2024 10:11",
  //     message: "Hi, thanks for the info, of course we need to...",
  //     notfNum: 17,
  //     _id: 2
  //   },
  //   {
  //     profileP: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbfKhOuGk_Ag_8BBQ5Kc0xi1pAXxGNGP9JYQ&usqp=CAU',
  //     chat: "Emily Johnson",
  //     time: "25.03.2024 11:26",
  //     message: "Hey Jontray, Do you remember about tomorrow's meeting with new investors?",
  //     notfNum: 0,
  //     _id: 3
  //   },
  //   {
  //     profileP: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRGCg4pLQ1ckWPPMqf4s4eLyiKKMUU9bpjtA&usqp=CAU',
  //     chat: "Elon Mask",
  //     time: "15.09.2020 14:30",
  //     message: "Hello, I wanted to discuss the upcoming project deadline.",
  //     notfNum: 4,
  //     _id: 4
  //   },
  //   {
  //     profileP: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg',
  //     chat: "Mark Davis",
  //     time: "16.09.2020 08:45",
  //     message: "Hey, did you get a chance to review the latest proposal?",
  //     notfNum: 0,
  //     _id: 5
  //   },
  //   {
  //     profileP: 'https://wallpapers.com/images/hd/cool-profile-picture-minion-13pu7815v42uvrsg.jpg',
  //     chat: "Sophie Williams",
  //     time: "16.09.2020 13:20",
  //     message: "Hi, I have some ideas for improving our marketing strategy.",
  //     notfNum: 3,
  //     _id: 6
  //   },
  //   {
  //     profileP: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU',
  //     chat: "Michael Brown",
  //     time: "17.09.2020 10:05",
  //     message: "Hello, could you please provide an update on the budget for this quarter?",
  //     notfNum: 0,
  //     _id: 7
  //   },
  //   {
  //     profileP: 'https://shotkit.com/wp-content/uploads/bb-plugin/cache/cool-profile-pic-matheus-ferrero-landscape-6cbeea07ce870fc53bedd94909941a4b-zybravgx2q47.jpeg',
  //     chat: "Olivia Wilson",
  //     time: "18.09.2020 09:55",
  //     message: "Hey, I need your input on the client presentation scheduled for next week.",
  //     notfNum: 1,
  //     _id: 8
  //   }
  // ]
  const [messages, setMessages] = useState([])
  // const [filterdMessages, setFilterdMessages] = useState([]);


  useEffect(() => {
    api.get('chat/' + type).then(setMessages);
    // setFilterdMessages(messages);
  }, [type])

  const memberImages = (members = [], userId = "66128823d5cbfbbc8fa1ab14") => {
    if (members.length > 2) {
      return members.map(member => member.image);
    } else {
      // קבלת התמונה של מי שמשתתף איתנו בשיחה
      return  members.find(m => m._id !== userId)?.image;
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
          {/* <Search setFilterdMessages={setFilterdMessages} filterdMessages={filterdMessages} chats={messages} /> */}
          <Search chats={messages} />
        </div>
        <ul className={styles.msgList}>
          {messages.map(chat => {
            return (<Message
              key={chat._id}
              link={`/messages/${type}/${chat._id}`}
              image={memberImages(chat.image)}
              sender={memberNames(chat.members)}
              time={chat.chat.lastDate}
              subject={chat.subject}
              isRead={chat.isRead}
            />)
          })}
        </ul>
      </div>
      <Outlet />
    </>
  )
}
