import React, { useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import api from '../../functions/api'
import { isValidEmail } from '../../functions/isValidEmail'
import NewMsgForm from '../../components/NewMsgForm'
import { faX } from '@fortawesome/free-solid-svg-icons'

export default function NewMsg() {

    const [inputMembers, setInputMembers] = useState('');
    const [offerMembers, setOfferMembers] = useState([]);
    const [sendTo, setSendTo] = useState([]);
    const [err, setErr] = useState('');
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [subject, setSubject] = useState('');

    const deleteAddressee = useRef(null);

    const handleInputChange = (e) => {
        let value = e.target.value;
        setErr('');
        setInputMembers(value);
        setOfferMembers([]);

        // Clear the previous timeout
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }

        if (value) {
            const newTimeout = setTimeout(() => {
                api.get('user/emails/' + value).then(setOfferMembers);
            }, 300);
            setSearchTimeout(newTimeout);
        }
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
        setInputMembers('');
        setErr('');
        setSendTo([{ email, _id }, ...sendTo]);
        deleteAddressee.current.value = '';
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Tab' || e.key == 'Enter') {
            e.preventDefault(); // מניעה מהטאב לעשות את הפעולה הרגילה שלו
            const relevantMember = offerRelevant();
            if (relevantMember) {
                handleAdd(relevantMember);
            } else if (isValidEmail(inputMembers)) {
                handleAdd({ email: inputMembers, _id: null });
            } else if (inputMembers) {
                setErr('* Invalid email address');
            } else { return }
        }
    };

    const handleSubject = (e) => {
        setSubject(e.target.value);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>New message</h1>
            <div className={styles.newMsgForm}>
                <div className={styles.inputs}>
                    <label className={styles.headerLabels}>
                        <h3>Subject</h3>
                        <div className={styles.inputWrapper}>
                            <input type="text" name="subject" className={styles.input} onChange={handleSubject}/>
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
                            {/* כפתור הסרת הנמען מהרשימה */}
                            <button
                                onClick={() => setSendTo(prev => [...prev.filter(m => m.email !== member.email)])}
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
                                    {/* להחליף למייל של היוזר */}
                    <NewMsgForm members={[{email: "user2@example.com",_id:"66168d588eea0054ac8a279c"}, ...sendTo]} subject={subject} />
                </label>
            </div>
        </div>
    )
}
