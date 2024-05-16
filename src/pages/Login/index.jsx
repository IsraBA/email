import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import airplane from '../../assets/airplane.png'
import api from '../../functions/api';
import { NavLink, useNavigate } from 'react-router-dom';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import Loader from '../../components/Loader';
import { useUser } from '../../Context/userContext';

export default function Login() {

    const { user } = useUser();

    useEffect(() => {
        if (user.userName) {
            nav('/messages/inbox');
        }
        return () => { window.location.reload() }
    }, [user])

    const nav = useNavigate();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;
        setLoading(true);
        api.post('/login', { email, password })
            .then(res => {
                localStorage.token = res.token;
                nav('/messages/inbox');
            })
            .catch(err => {
                console.error(err)
                setError('Username or password incorrect')
                setLoading(false);
            })
    }

    const handleGoogleSubmit = (res) => {
        setLoading(true);
        api.post('/googleLogin', res)
            .then(res => {
                localStorage.token = res.token;
                nav('/messages/inbox');
                setLoading(false);
            })
            .catch(err => {
                console.log(err)
                setError('Username or password incorrect')
                setLoading(false);
            })
    };

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <h6 className={styles.header}>TalkLane - communicate full-world</h6>
                <div className={styles.divider}></div>
                <div className={styles.body}>
                    <form className={styles.loginForm} onSubmit={e => handleSubmit(e)}>
                        {error && <p className={styles.error}>{error}</p>}
                        <h1 className={styles.title}>Welcome to TalkLane</h1>
                        <div className={styles.group}>
                            <p className={styles.icon}>@</p>
                            <input
                                className={styles.input}
                                name='email'
                                type="email"
                                placeholder="Email"
                            />
                        </div>
                        <div className={styles.group}>
                            <svg className={styles.icon} stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" >
                                <path d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" strokeLinejoin="round" strokeLinecap="round"></path>
                            </svg>
                            <input
                                className={styles.input}
                                name='password'
                                type="password"
                                placeholder="Password"
                            />
                        </div>
                        {!loading && <>
                            <button className={styles.forgot} type='button' onClick={() => alert("כרגע הפיצ'ר עדיין לא פותח אז פחות או יותר אכלתם אותה, תפתחו חשבון חדש")}>Forgot password ?</button>
                            <button className={styles.animatedButton} type='submit'>
                                <svg xmlns="http://www.w3.org/2000/svg" className={styles.arr2} viewBox="0 0 24 24">
                                    <path
                                        d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                                    ></path>
                                </svg>
                                <span className={styles.text}>Sign in</span>
                                <span className={styles.circle}></span>
                                <svg xmlns="http://www.w3.org/2000/svg" className={styles.arr1} viewBox="0 0 24 24">
                                    <path
                                        d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                                    ></path>
                                </svg>
                            </button>
                        </>}
                    </form>
                    {loading ?
                        <>
                            {/* <button className={styles.google} onClick={() => alert("כן זה עדיין לא עובד, תמתינו")}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /><path d="M1 1h22v22H1z" fill="none" />
                        </svg>
                        <p>Sign in with Google</p>
                    </button> */}
                            {/* <button className={styles.google} onClick={() => login()}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /><path d="M1 1h22v22H1z" fill="none" />
                        </svg>
                        <p>Sign in with Google</p>
                    </button> */}
                            <div className={styles.loading}><Loader /></div>
                            <p className={styles.register}>
                                Getting your account ready! Just a moment...
                            </p>
                        </> :
                        <>
                            <p className={styles.register}>
                                Don't have an account?&nbsp;&nbsp;
                                <NavLink className={styles.nav} to={'/register'}>Register Here</NavLink>
                            </p>
                            <h4 className={styles.or}><span></span>OR<span></span></h4>
                            <GoogleLogin
                                onSuccess={credentialResponse => {
                                    handleGoogleSubmit(credentialResponse);
                                }}
                                onError={() => {
                                    console.error('Login Failed');
                                }}
                            />
                        </>
                    }
                </div>
            </div>
            <div className={styles.bgImg}>
                <img src={airplane} alt="Login screen image" />
            </div>
        </div>
    )
}
