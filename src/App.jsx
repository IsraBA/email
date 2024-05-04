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
import { GoogleOAuthProvider } from '@react-oauth/google'

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
        <GoogleOAuthProvider clientId="13952391314-ur9sidtqcfakg5kilnl03uq0n3r5f69v.apps.googleusercontent.com">
        <Routes>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='*' element={<NotFound />} />
          <Route path='/' element={<Layout />}>
            <Route path='speed' element={<h1 className='soon'>Coming soon...</h1>} />
            <Route path='reminders' element={<h1 className='soon'>Coming soon...</h1>} />
            <Route path='views' element={<h1 className='soon'>Coming soon...</h1>} />
            <Route path='statistics' element={<h1 className='soon'>Coming soon...</h1>} />
            <Route path='videoCalls' element={<h1 className='soon'>Coming soon...</h1>} />
            <Route path='messages' element={<MailBox />}>
              {/* <Route index element={<Chats />} /> */}
              <Route path='newMessage' element={<NewMsg />} />
              <Route path=':type' element={<Chats />}>
                <Route index element={<NoChat msg={"Chats will appear here"} />} />
                <Route path=':chatId' element={<Chat />}>
                </Route>
              </Route>
            </Route>
          </Route>
        </Routes>
        </GoogleOAuthProvider>
    </div>
  )
}

export default App
