import { useNavigate } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './quill.css'
import ButtonComp from '../ButtonComp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faImage, faPaperPlane, faPaperclip, faTrash } from '@fortawesome/free-solid-svg-icons';
import { usePopUp } from '../../Context/PopupContext';
import Confirm from '../Confirm';
import apiToast from '../../functions/apiToast';
import api from '../../functions/api';
import { useUser } from '../../Context/userContext';
import axios from 'axios';


export default function NewMsgForm({
    outerChatId = '',
    chatId = '',
    members,
    subject,
    setChat,
    setSubErr,
    setEmailErr,
    msg,
    draftId
}) {

    const { setPopUpComp } = usePopUp();
    const { user } = useUser();

    const nav = useNavigate();

    const [message, setMessage] = useState('');
    const [msgErr, setMsgErr] = useState('');
    
    const messageRef = useRef('');
    const subjectRef = useRef('');
    const membersRef = useRef('');
    // משתנה שיהיה אחראי על האם לשמור את ההודעה לטיוטות, במידה והיוזר שולח את ההודעה הוא נהיה נכון
    const isSending = useRef('');

    useEffect(() => {
        if (msg) {
            setMessage(msg);
        }
    }, [])


    const handleMessageChange = (value) => {
        messageRef.current = value;
        setMessage(value);
        setMsgErr('');
    };

    const deleteMsg = () => {
        if (message !== '') {
            setPopUpComp(<Confirm func={() => setMessage('')}
                message={'Are you sure you want to delete the message?'} />)
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // וולידציות שכל השדות מלאים
        if (subject === '') {
            setSubErr("Please enter a subject");
            return;
        }
        if (members && members.length <= 1) {
            setEmailErr("Please add members");
            return;
        }
        if (message === '') {
            setMsgErr("Please enter a message");
            return;
        }
        isSending.current = true;
        // שליחת הודעה בתוך צ'אט קיים
        if (chatId) {
            const messages = {
                date: new Date(),
                content: message,
                from: user?._id
            }
            apiToast.put('chat/' + chatId, messages, {}, "Sending Message...", "Message send", "Sending message failed")
                .then(() => {
                    api.get('chat/singleChat/' + outerChatId).then(res => setChat(res)),
                        setMessage('')
                });
        }
        // שליחת הודעה שהייתה בטיוטות
        else if (draftId) {
            const fd = new FormData();
            const messages = [{
                date: new Date(),
                content: message,
                from: user?._id
            }]

            fd.append('subject', subject);
            fd.append('messages', JSON.stringify(messages));
            fd.append('lastDate', new Date());
            fd.append('members', JSON.stringify(members));
            // fd.append('addFile', e.target.addFile.files[0]);
            // fd.append('image', e.target.image.files[0]);

            apiToast.put('chat/updateDraft/' + draftId + "/true", fd, {},
                "Sending Message...", "Message send", "Sending message failed")
                .then(() => nav('/messages/inbox'));
        }
        // שליחת הודעה חדשה לגמרי
        else {
            const fd = new FormData();
            const messages = [{
                date: new Date(),
                content: message,
                from: user?._id
            }]

            fd.append('subject', subject);
            fd.append('messages', JSON.stringify(messages));
            fd.append('lastDate', new Date());
            fd.append('members', JSON.stringify(members));
            // fd.append('addFile', e.target.addFile.files[0]);
            // fd.append('image', e.target.image.files[0]);

            apiToast.post('chat', fd, {}, "Sending Message...", "Message send", "Sending message failed")
                .then(() => nav('/messages/inbox'));
        }
    };

    // יצירת טיוטה במידה וההודעה לא נשלחה
    useEffect(() => {
        subjectRef.current = subject;
    }, [subject])
    useEffect(() => {
        membersRef.current = members
    }, [members])
    useEffect(() => {
        return () => {
            if (!chatId && !isSending.current) {
                if (subjectRef.current || messageRef.current || membersRef.current.length > 1) {
                    const fd = new FormData();
                    const messages = [{
                        date: new Date(),
                        content: messageRef.current,
                        from: user?._id
                    }]

                    fd.append('subject', subjectRef.current ? subjectRef.current : "(No subject)");
                    fd.append('messages', JSON.stringify(messages));
                    fd.append('lastDate', new Date());
                    fd.append('members', JSON.stringify(membersRef.current));
                    console.log('members', membersRef.current)

                    // עדכון הודעה שכבר הייתה טיוטה
                    if (draftId) {
                        apiToast.put('chat/updateDraft/' + draftId + "/false", fd, {},
                            "Saving to Drafts...", "Message saved to Drafts", "Saving message to Drafts failed")
                    } 
                    // יצירת טיוטה חדשה
                    else {
                        apiToast.post('chat/addDraft/', fd, {},
                            "Saving to Drafts...", "Message saved to Drafts", "Saving message to Drafts failed")
                    }
                }
            }
        }
    }, [])


    return (
        <form className={styles.newMsgInput} onSubmit={handleSubmit}>
            <ReactQuill
                className='editComp'
                value={message}
                onChange={handleMessageChange}
                theme="snow"    
                modules={{
                    toolbar: [
                        [{ 'size': [] }],
                        ['bold', 'italic', 'underline', 'blockquote'],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' },
                        { 'indent': '-1' }, { 'indent': '+1' }],
                        [{ 'align': [] }], [{ direction: 'rtl' }],
                    ],
                }}
                formats={[
                    'header', 'font', 'size',
                    'bold', 'italic', 'underline', 'strike', 'blockquote',
                    'list', 'bullet', 'indent', 'align', 'direction'
                ]}
                placeholder="Write your message..."
            />
            {/* הצגת שגיאה אם אין הודעה */}
            {msgErr && <p key={msgErr} className={styles.err}>{msgErr}</p>}
            <div className={styles.msgOption}>
                <div className={styles.options}>
                    {/* <label className={styles.option}>
                        <FontAwesomeIcon icon={faPaperclip} />
                        <input className={styles.upload} type="file" name='addFile' />
                    </label>
                    <label className={styles.option}>
                        <FontAwesomeIcon icon={faImage} />
                        <input className={styles.upload} type="file" name='image' />
                    </label> */}
                    <button type='button' className={styles.option} onClick={deleteMsg}><FontAwesomeIcon icon={faTrash} /></button>
                </div>
                <div className={styles.options}>
                    {/* <button type='button' className={styles.option} onClick={deleteMsg}><FontAwesomeIcon icon={faTrash} /></button> */}
                    {/* <button type='button' className={styles.option}><FontAwesomeIcon icon={faEllipsisVertical} /></button> */}
                    <div className={styles.send}>
                        <ButtonComp titleAndIcon={['Send', <FontAwesomeIcon icon={faPaperPlane} />]} type='submit' />
                    </div>
                </div>
            </div>
        </form>
    );
};