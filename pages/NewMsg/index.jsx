import React, { useState } from 'react'
import styles from './styles.module.css'
import InputPopUp from '../../src/components/InputPopUp'
import ButtonComp from '../../src/components/ButtonComp'
import ReactQuill from 'react-quill'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical, faImage, faPaperPlane, faPaperclip, faTrash } from '@fortawesome/free-solid-svg-icons'
import { usePopUp } from '../../src/Context/PopupContext'
import Confirm from '../../src/components/Confirm'

export default function NewMsg() {

    const { setPopUpComp } = usePopUp();

    const [message, setMessage] = useState('');

    const handleMessageChange = (value) => {
        setMessage(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: send the message
        console.log(message);
    };

    const deleteMsg = () => {
        if (message !== '') {
            setPopUpComp(<Confirm func={() => setMessage('')} message={'Are you sure you want to delete the message?'} />)
        }
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>New message</h1>
            <form className={styles.newMsgForm}>
                <div className={styles.inputs}>
                    <label className={styles.headerLabels}>
                        <h3>Subject</h3>
                        <div className={styles.inputWrapper}>
                            <input type="text" name="subject" className={styles.input} />
                        </div>
                    </label>
                    <label className={styles.headerLabels}>
                        <h3>Members</h3>
                        <div className={styles.inputWrapper}>
                            <input type="text" name="members" className={styles.input} />
                            <button className={styles.btn} type='button'>Add</button>
                        </div>
                    </label>
                </div>
                <label className={styles.msgContent}>
                    <h3>Message</h3>
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
                </label>
                <div className={styles.msgOption}>
                    <div className={styles.options}>
                        <label className={styles.option}>
                            <FontAwesomeIcon icon={faPaperclip} />
                            <input className={styles.upload} type="file" />
                        </label>
                        <label className={styles.option}>
                            <FontAwesomeIcon icon={faImage} />
                            <input className={styles.upload} type="file" />
                        </label>
                    </div>
                    <div className={styles.options}>
                        <button type='button' className={styles.option} onClick={deleteMsg}><FontAwesomeIcon icon={faTrash} /></button>
                        <button type='button' className={styles.option}><FontAwesomeIcon icon={faEllipsisVertical} /></button>
                        <div className={styles.send}>
                            <ButtonComp titleAndIcon={['Send', <FontAwesomeIcon icon={faPaperPlane} />]} click={handleSubmit} />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
