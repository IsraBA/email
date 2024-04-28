import './styles.css'
import Layout from './Layout'
import { Route, Routes } from 'react-router-dom'
import MailBox from './components/MailBox'
import Chats from './components/Chats'
import Chat from './components/Chat'
import Popup from './components/Popup'
import NewMsg from './pages/NewMsg'
import { Bounce, Slide, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login'
import Register from './pages/Register'
import NoChat from './pages/NoChat'
import NotFound from './pages/NotFound'

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
        transition={Slide}
      />
      <Popup />
      <Routes>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='*' element={<NotFound />} />
        <Route path='/' element={<Layout />}>
          <Route path='speed' element={<>speed</>} />
          <Route path='reminders' element={<>reminders</>} />
          <Route path='views' element={<>views</>} />
          <Route path='statistics' element={<>statistics</>} />
          <Route path='videoCalls' element={<>videoCalls</>} />
          <Route path='messages' element={<MailBox />}>
            <Route path='newMessage' element={<NewMsg />} />
            <Route path=':type' element={<Chats />}>
              <Route index element={<NoChat msg={"Chats will appear here"} />} />
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
