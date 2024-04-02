import React, { useState } from 'react'
import styles from './styles.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical, faPlus, faTag } from '@fortawesome/free-solid-svg-icons'
import { usePopUp } from '../../Context/PopupContext';
import InputPopUp from '../InputPopUp';
import ListLabel from '../ListLabel';

export default function Labels() {

    const { setPopUpComp } = usePopUp();

    const [labels, setLabels] = useState([
        // מערך זמני
        { content: 'work', color: 'gray' },
        { content: 'Promising offers', color: 'lightcoral' },
        { content: 'Work in progress', color: 'seagreen' },
        { content: 'In acceptance', color: 'lightskyblue' },
        { content: 'Read later', color: 'mediumpurple' },
    ])
    const [isHovered, setIsHovered] = useState(false);

    const addLabel = () => {
        setPopUpComp(<InputPopUp
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
                {labels.map(lab => <ListLabel lab={lab} key={lab.content} setLabels={setLabels} labels={labels}/>)}
            </ul>
        </div>
    )
}
