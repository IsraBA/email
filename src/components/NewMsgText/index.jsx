import React, { useState } from 'react';
import styles from './styles.module.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './quill.css'
import ButtonComp from '../ButtonComp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faImage, faPaperPlane, faPaperclip, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function MessageInput() {
    const [message, setMessage] = useState('');

    const handleMessageChange = (value) => {
        setMessage(value);
    };

    const handleSubmit = () => {
        // TODO: send the message
        console.log(message);
    };

    return (
        <div className={styles.newMsgInput}>
            <ReactQuill
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
                    <form>
                        <label className={styles.option}>
                            <FontAwesomeIcon icon={faPaperclip} />
                            <input className={styles.upload} type="file" />
                        </label>
                        <label className={styles.option}>
                            <FontAwesomeIcon icon={faImage} />
                            <input className={styles.upload} type="file" />
                        </label>
                    </form>
                </div>
                <div className={styles.options}>
                    <button className={styles.option} onClick={() => setMessage('')}><FontAwesomeIcon icon={faTrash} /></button>
                    <button className={styles.option}><FontAwesomeIcon icon={faEllipsisVertical} /></button>
                    <div className={styles.send}>
                        <ButtonComp titleAndIcon={['Send', <FontAwesomeIcon icon={faPaperPlane} />]} click={handleSubmit} />
                    </div>
                </div>
            </div>
        </div>
    );
};