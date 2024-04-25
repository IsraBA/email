import { useEffect, useState } from 'react'
import styles from './styles.module.css'
import api from '../../functions/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';

export default function LabelListPopUp() {

    const [existingLabels, setExistingLabels] = useState([]);

    useEffect(() => {
        api.get('user/getAllLabels').then(setExistingLabels);
    }, [])

    return (
        <ul className={styles.container}>
            <h2 className={styles.title}>Add a label to the chat:</h2>
            {existingLabels.map(lab => <li className={styles.label} key={lab.title}>
                <span><FontAwesomeIcon icon={faTag} color={lab.color} /></span>
                <h3 className={styles.labelName}>{lab.title}</h3>
            </li>)}
        </ul>
    )
}
