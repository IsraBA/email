import './styles.css'
import Layout from './Layout'
import { Route, Routes, useNavigate } from 'react-router-dom'
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
import { useEffect, useState } from 'react'
// const clientId = import.meta.env.VITE_APP_CLIENT_ID

function App() {

  const nav = useNavigate();

  // משתנה שקובע איזה חלונות להציג על פי הקישור
  const [isToTabs, setIsToTabs] = useState(false);
  useEffect(() => {
    const pathParts = location.pathname.split('/');
    if (pathParts.length == 2) { setIsToTabs(true) }
    else { setIsToTabs(false) };
  }, [nav])

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
            <Route path='speed' element={<h1 className={isToTabs ? 'soon twoTabs' : 'soon'}>Coming soon...</h1>} />
            <Route path='reminders' element={<h1 className={isToTabs ? 'soon twoTabs' : 'soon'}>Coming soon...</h1>} />
            <Route path='views' element={<h1 className={isToTabs ? 'soon twoTabs' : 'soon'}>Coming soon...</h1>} />
            <Route path='statistics' element={<h1 className={isToTabs ? 'soon twoTabs' : 'soon'}>Coming soon...</h1>} />
            <Route path='videoCalls' element={<h1 className={isToTabs ? 'soon twoTabs' : 'soon'}>Coming soon...</h1>} />
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
      </GoogleOAuthProvider>
    </div>
  )
}

export default App
