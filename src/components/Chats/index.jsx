import React, { useState } from 'react'
import styles from './styles.module.css'
import Search from '../Search'
import Message from '../Message'
import { Outlet, useParams } from 'react-router-dom'


export default function Chats() {

  const {type} = useParams();

  const senders = [
    {
      profileP: 'https://newprofilepic.photo-cdn.net//assets/images/article/profile.jpg?90af0c8',
      sender: "Jessica Koel",
      time: "27.03.2024 09:25",
      message: "Hi, I have a new meeting opportunity...",
      notfNum: 147,
      _id: 1
    },
    {
      profileP: 'https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg',
      sender: "John Doe",
      time: "26.03.2024 10:11",
      message: "Hi, thanks for the info, of course we need to...",
      notfNum: 17,
      _id: 2
    },
    {
      profileP: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbfKhOuGk_Ag_8BBQ5Kc0xi1pAXxGNGP9JYQ&usqp=CAU',
      sender: "Emily Johnson",
      time: "25.03.2024 11:26",
      message: "Hey Jontray, Do you remember about tomorrow's meeting with new investors?",
      notfNum: 0,
      _id: 3
    },
    {
      profileP: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRGCg4pLQ1ckWPPMqf4s4eLyiKKMUU9bpjtA&usqp=CAU',
      sender: "Elon Mask",
      time: "15.09.2020 14:30",
      message: "Hello, I wanted to discuss the upcoming project deadline.",
      notfNum: 4,
      _id: 4
    },
    {
      profileP: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg',
      sender: "Mark Davis",
      time: "16.09.2020 08:45",
      message: "Hey, did you get a chance to review the latest proposal?",
      notfNum: 0,
      _id: 5
    },
    {
      profileP: 'https://wallpapers.com/images/hd/cool-profile-picture-minion-13pu7815v42uvrsg.jpg',
      sender: "Sophie Williams",
      time: "16.09.2020 13:20",
      message: "Hi, I have some ideas for improving our marketing strategy.",
      notfNum: 3,
      _id: 6
    },
    {
      profileP: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU',
      sender: "Michael Brown",
      time: "17.09.2020 10:05",
      message: "Hello, could you please provide an update on the budget for this quarter?",
      notfNum: 0,
      _id: 7
    },
    {
      profileP: 'https://shotkit.com/wp-content/uploads/bb-plugin/cache/cool-profile-pic-matheus-ferrero-landscape-6cbeea07ce870fc53bedd94909941a4b-zybravgx2q47.jpeg',
      sender: "Olivia Wilson",
      time: "18.09.2020 09:55",
      message: "Hey, I need your input on the client presentation scheduled for next week.",
      notfNum: 1,
      _id: 8
    }
  ]

  const [filterdSenders, setFilterdSenders] = useState(senders);

  return (
    <>
      <div className={styles.chats}>
        <div className={styles.search}>
          <Search setFilterdSenders={setFilterdSenders} filterdSenders={filterdSenders} senders={senders} />
        </div>
        <ul className={styles.msgList}>
          {filterdSenders.map(sender => {
            return (<Message
              key={sender._id}
              link={`/messages/${type}/${sender._id}`}
              image={sender.profileP}
              sender={sender.sender}
              time={sender.time}
              message={sender.message}
              notfNum={sender.notfNum}
            />)
          })}
        </ul>
      </div>
      <Outlet />
    </>
  )
}
