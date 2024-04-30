import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical, faPlus, faTag } from '@fortawesome/free-solid-svg-icons'
import { usePopUp } from '../../Context/PopupContext';
import AddLabelPopUp from '../AddLabelPopUp';
import ListLabel from '../ListLabel';
import api from '../../functions/api';
import apiToast from '../../functions/apiToast';
import { useUser } from '../../Context/userContext';

export default function Labels() {

    const { user, setUser } = useUser();

    const { setPopUpComp } = usePopUp();

    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        api.get('user/getAllLabels').then(res => setUser(prev => ({ ...prev, labels: res })))
    }, []);

    const addLabel = () => {
        setPopUpComp(<AddLabelPopUp
            message={'Add a new label'}
            submit={(newLabel) => apiToast.post('user/addLabelToUser', newLabel, {},
                'Adding label...', 'Label added successfully', 'Error adding label')
                .then(res => setUser(prev => ({ ...prev, labels: res.data })))}
            labels={user.labels ? user.labels : []}
        />)
    };

    return (
        <div className={styles.labels}>
            <div className={styles.header}>
                <h3>Labels</h3>
                <button
                    id={styles.add}
                    onClick={addLabel}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}>
                    <FontAwesomeIcon icon={faPlus} beat={isHovered} /></button>
            </div>
            <ul className={styles.labelList}>
                {user.labels && user.labels.map(lab => <ListLabel lab={lab} key={lab.title} />)}
            </ul>
        </div>
    )
}
