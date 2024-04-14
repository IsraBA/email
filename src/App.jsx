import './styles.css'
import Layout from './Layout'
import { Route, Routes } from 'react-router-dom'
import MailBox from './components/MailBox'
import Chats from './components/Chats'
import Chat from './components/Chat'
import Popup from './components/Popup'
import NewMsg from './pages/NewMsg'
import { Bounce, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <div className='app'>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <Popup />
      <Routes>
        <Route path='login' element={<>Login</>} />
        <Route path='/' element={<Layout />}>
          <Route path='speed' element={<>speed</>} />
          <Route path='reminders' element={<>reminders</>} />
          <Route path='views' element={<>views</>} />
          <Route path='statistics' element={<>statistics</>} />
          <Route path='videoCalls' element={<>videoCalls</>} />
          <Route path='messages' element={<MailBox />}>
            <Route path='newMessage' element={<NewMsg />} />
            <Route path=':type' element={<Chats />}>
              <Route path=':chatId' element={<Chat />}>
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
