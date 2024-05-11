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
import Settings from './pages/Settings'
import usePreferences from './Context/Preferences'
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


  const { darkMode, siteColor, colorOptions } = usePreferences();
  // קביעת ערכת נושא לאתר
  useEffect(() => {
    // console.log({ darkMode, siteColor, colorOptions })
    let mainColor = colorOptions ? colorOptions[siteColor][0] : '#7d49ed';
    let lightMainColor = colorOptions ? colorOptions[siteColor][1] : '#8b5ded';
    document.documentElement.style.setProperty('--main-color', mainColor);
    document.documentElement.style.setProperty('--light-main-color', lightMainColor);

    let subColor;
    if (darkMode) {
      subColor = colorOptions ? colorOptions[siteColor][2]?.dark : '#48415a';
      document.documentElement.style.setProperty('--sub-color', subColor);
      document.documentElement.style.setProperty('--bg-color', '#1c1c1c');
      document.documentElement.style.setProperty('--text-color', '#ffffff');
      document.documentElement.style.setProperty('--icons-color', '#ffffff');
      document.documentElement.style.setProperty('--gray-bg', '#383838');
      document.documentElement.style.setProperty('--active-bg', '#ffffff1f');
    } else {
      subColor = colorOptions ? colorOptions[siteColor][2]?.light : '#e5dff4';
      document.documentElement.style.setProperty('--sub-color', subColor);
      document.documentElement.style.setProperty('--bg-color', '#ffffff');
      document.documentElement.style.setProperty('--text-color', '#000000');
      document.documentElement.style.setProperty('--icons-color', '#404040');
      document.documentElement.style.setProperty('--gray-bg', '#e9e9e9');
      document.documentElement.style.setProperty('--active-bg', '#ffffffb3');
    }
  }, [darkMode, siteColor])
  

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
        theme={darkMode ? "dark" : "light"}
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
            <Route path='settings' element={<Settings />} />
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
