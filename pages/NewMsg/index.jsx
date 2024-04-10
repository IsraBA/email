import React, { useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'
import InputPopUp from '../../src/components/InputPopUp'
import ButtonComp from '../../src/components/ButtonComp'
import ReactQuill from 'react-quill'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical, faImage, faPaperPlane, faPaperclip, faTrash, faX } from '@fortawesome/free-solid-svg-icons'
import { usePopUp } from '../../src/Context/PopupContext'
import Confirm from '../../src/components/Confirm'
import api from '../../src/functions/api'
import { isValidEmail } from '../../src/functions/isValidEmail'

export default function NewMsg() {

    const { setPopUpComp } = usePopUp();

    const [inputMembers, setInputMembers] = useState('');
    const [offerMembers, setOfferMembers] = useState([]);
    const [sendTo, setSendTo] = useState([]);
    const [message, setMessage] = useState('');
    const [err, setErr] = useState('');
    const [searchTimeout, setSearchTimeout] = useState(null);

    const deleteAddressee = useRef(null);

    const handleInputChange = (e) => {
        let value = e.target.value;
        setErr('');
        setInputMembers(value);

        if (value === '') {
            setOfferMembers([]);
            return;
        }

        // Clear the previous timeout
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }

        const newTimeout = setTimeout(() => {
            api.get('user/emails/' + value).then(setOfferMembers);
        }, 300);

        setSearchTimeout(newTimeout);
    };    

    const offerRelevant = () => {
        // מציאת המייל הראשון שנמצא במערך ההצעות אבל לא במערך הנמענים
        return offerMembers.find(member => !sendTo.some(m => m.email === member.email));
    };

    const handleAdd = ({ email, _id }) => {
        if (!email) return;
        if (!isValidEmail(email)) {
            setErr('* Invalid email address');
            return;
        }
        if (sendTo.find(member => member.email === email)) {
            return;
        }
        setOfferMembers([]);
        setSendTo([{ email, _id }, ...sendTo]);
        deleteAddressee.current.value = '';
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Tab' || e.key == 'Enter') {
            e.preventDefault(); // מניעה מהטאב לעשות את הפעולה הרגילה שלו
            const relevantMember = offerRelevant();
            if (relevantMember) {
                handleAdd(relevantMember);
            }
        }
    };

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
            <form className={styles.newMsgForm} onSubmit={handleSubmit}>
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
                            <input
                                ref={deleteAddressee}
                                type="email"
                                name="members"
                                className={styles.input}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                            />
                            <button
                                onClick={() => handleAdd({ email: inputMembers, _id: null })}
                                className={styles.btn}
                                type='button'>
                                Add
                            </button>
                            {/* הצגת שגיאה אם האימייל שהוכנס לא תקין */}
                            {err && <p className={styles.err}>{err}</p>}
                            {/* כפתור השלמה אימייל אוטומטית */}
                            {offerMembers.length > 0 &&
                                <button
                                    onClick={() => handleAdd(offerRelevant())}
                                    type='button'
                                    className={styles.offer}>
                                    {offerRelevant()?.email}
                                </button>}
                        </div>
                    </label>
                    {sendTo.length >= 1 && <ul className={styles.adrss}>
                        {sendTo.map(member => <li key={member.email} className={styles.adrs}>
                            <button
                                onClick={() => setSendTo(prev => [...prev.filter(m => m._id !== member._id)])}
                                type='button'>
                                <FontAwesomeIcon icon={faX} />
                            </button>
                            {member.email}
                        </li>
                        )}
                    </ul>}
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
