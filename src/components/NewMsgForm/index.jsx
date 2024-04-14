import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
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


export default function NewMsgForm({ outerChatId = '', chatId = '', members = [], subject = '', setChat }) {

    const { setPopUpComp } = usePopUp();

    const nav = useNavigate();

    const [message, setMessage] = useState('');

    const handleMessageChange = (value) => {
        setMessage(value);
    };

    const deleteMsg = () => {
        if (message !== '') {
            setPopUpComp(<Confirm func={() => setMessage('')} message={'Are you sure you want to delete the message?'} />)
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (chatId) {
            const messages = {
                date: new Date(),
                content: message,
                // TODO: להחליף לאי די של השולח האמיתי
                from: "66168d588eea0054ac8a279c"
            }
            apiToast.put('chat/' + chatId, messages, {}, "Sending Message...", "Message send", "Sending message failed")
            .then(() => { 
                api.get('chat/singleChat/' + outerChatId).then(res => setChat(res)),
                 setMessage('')
                });
        } else {
            const fd = new FormData();
            const messages = [{
                    date: new Date(),
                    content: message,
                    // TODO: להחליף לאי די של השולח האמיתי
                    from: "66168d588eea0054ac8a279c"
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
            <div className={styles.msgOption}>
                <div className={styles.options}>
                    <label className={styles.option}>
                        <FontAwesomeIcon icon={faPaperclip} />
                        <input className={styles.upload} type="file" name='addFile' />
                    </label>
                    <label className={styles.option}>
                        <FontAwesomeIcon icon={faImage} />
                        <input className={styles.upload} type="file" name='image' />
                    </label>
                </div>
                <div className={styles.options}>
                    <button className={styles.option} onClick={deleteMsg}><FontAwesomeIcon icon={faTrash} /></button>
                    <button className={styles.option}><FontAwesomeIcon icon={faEllipsisVertical} /></button>
                    <div className={styles.send}>
                        <ButtonComp titleAndIcon={['Send', <FontAwesomeIcon icon={faPaperPlane} />]} type='submit' />
                    </div>
                </div>
            </div>
        </form>
    );
};