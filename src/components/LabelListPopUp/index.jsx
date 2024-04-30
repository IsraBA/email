import { useEffect, useState } from 'react'
import styles from './styles.module.css'
import api from '../../functions/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';

export default function LabelListPopUp({ labels = [], chatId, setChat }) {

    const [updateLabs, setUpdateLabs] = useState(labels);

    const toggleLabel = (label) => {
        // שינוי מצב הצ'ק בוקס ולאחר מכן שליחת עדכון לשרת
        setUpdateLabs(prev => [...prev.map(lab => {
            if (lab.title === label.title) {
                return { ...lab, checked: !lab.checked };
            }
            return lab;
        })]);

        if (label.checked) {
            api.del(`chat/removeLabel/${chatId}/${label.title}`)
                .then(res => setChat(prev => ({ ...prev, labels: res })));
        } else {
            api.post(`chat/addLabel/${chatId}/${label.title}`)
                .then(res => setChat(prev => ({ ...prev, labels: res })));
        }
    };

    return (
        <ul className={styles.container}>
            <h2 className={styles.title}>Add/Remove label:</h2>
            {updateLabs.map(lab => {
                return (
                    <li className={styles.label} key={lab.title} onClick={() => toggleLabel(lab)}>
                        <span><FontAwesomeIcon icon={faTag} color={lab.color} /></span>
                        <h3 className={styles.labelName}>{lab.title}</h3>
                        <div className={styles.checkboxWrapper}>
                            <div className={styles.cbx}>
                                <input
                                    type="checkbox"
                                    id={`cbx-${lab.title}`}
                                    checked={lab.checked}
                                    onChange={() => toggleLabel(lab)}
                                />
                                <label htmlFor={`cbx-${lab.title}`}></label>
                                <svg fill="none" viewBox="0 0 15 14" height="14" width="15">
                                    <path d="M2 8.36364L6.23077 12L13 2"></path>
                                </svg>
                            </div>
                        </div>
                    </li>)
            })}
        </ul>
    )
}
