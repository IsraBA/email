import React, { useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import api from '../../functions/api'
import { isValidEmail } from '../../functions/isValidEmail'
import NewMsgForm from '../../components/NewMsgForm'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { useLocation } from 'react-router-dom'
import { useUser } from '../../Context/userContext'

export default function NewMsg() {

    const { user } = useUser();

    const [inputMembers, setInputMembers] = useState('');
    const [offerMembers, setOfferMembers] = useState([]);
    const [sendTo, setSendTo] = useState([]);
    const [emailErr, setEmailErr] = useState('');
    const [subErr, setSubErr] = useState('');
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [subject, setSubject] = useState('');

    const deleteAddressee = useRef(null);

    const location = useLocation();
    // console.log("location: ", location)
    const { addressee, draftSubject, draftMembers, draftMessage, draftId } = location.state || {};

    // מילוי הנמען במידה והגיעו לקומפוננטה דרך כפתור השליחה אליו
    useEffect(() => {
        if (addressee?.email) {
            setSendTo([{ email: addressee.email, _id: addressee._id }]);
        }
    }, [addressee]);

    // מילוי השדות במידה ומדובר בהודעה מהטיוטות
    useEffect(() => {
        // console.log({ draftSubject, draftMembers, draftMessage, draftId })
        if (draftSubject && draftSubject !== '(No subject)') {
            setSubject(draftSubject);
        }
        if (draftMembers) {
            setSendTo(draftMembers);
        }
    }, [draftSubject, draftMembers, draftMessage, draftId]);

    const handleInputChange = (e) => {
        let value = e.target.value;
        setEmailErr('');
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
            setEmailErr('* Invalid email address');
            return;
        }
        if (sendTo.find(member => member.email === email)) {
            return;
        }
        setOfferMembers([]);
        setInputMembers('');
        setEmailErr('');
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
                setEmailErr('Invalid email address');
            } else { return }
        }
    };

    const handleSubject = (e) => {
        setSubject(e.target.value);
        setSubErr('');
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>New message</h1>
            <div className={styles.newMsgForm}>
                <div className={styles.inputs}>
                    <label className={styles.headerLabels}>
                        <h3>Subject</h3>
                        <div className={styles.inputWrapper}>
                            <input
                                type="text"
                                name="subject"
                                className={styles.input}
                                onChange={handleSubject}
                                value={subject} />
                            {subErr && <p className={styles.err}>{subErr}</p>}
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
                            {emailErr && <p key={emailErr} className={styles.err}>{emailErr}</p>}
                            {/* כפתור השלמה אימייל אוטומטית */}
                            {offerMembers.length > 0 &&
                                <button
                                    style={{ maxWidth: deleteAddressee.current.offsetWidth, overflow: 'hidden' }}
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
                    <NewMsgForm
                        members={[{ email: user?.email, _id: user?._id }, ...sendTo]}
                        subject={subject}
                        setSubErr={setSubErr}
                        setEmailErr={setEmailErr}
                        msg={draftMessage}
                        draftId={draftId}
                    />
                </label>
            </div>
        </div>
    )
}
