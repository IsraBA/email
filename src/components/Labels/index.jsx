import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical, faPlus, faTag } from '@fortawesome/free-solid-svg-icons'
import { usePopUp } from '../../Context/PopupContext';
import AddLabelPopUp from '../AddLabelPopUp';
import ListLabel from '../ListLabel';
import api from '../../functions/api';

export default function Labels() {

    const { setPopUpComp } = usePopUp();

    const [labels, setLabels] = useState([]);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        api.get('user/getAllLabels').then(setLabels)
    }, []);

    const addLabel = () => {
        setPopUpComp(<AddLabelPopUp
            message={'Add a new label'}
            submit={(newLabel) => setLabels(prev => [newLabel, ...prev])}
            labels={labels}
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
                <button><FontAwesomeIcon icon={faEllipsisVertical} /></button>
            </div>
            <ul className={styles.labelList}>
                {labels.map(lab => <ListLabel lab={lab} key={lab.title} setLabels={setLabels} labels={labels}/>)}
            </ul>
        </div>
    )
}
