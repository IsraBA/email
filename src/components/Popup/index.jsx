import React from 'react'
import styles from './styles.module.css'
import { usePopUp } from '../../Context/PopupContext';

export default function Popup() {

    const { popUpComp, setPopUpComp } = usePopUp();

    return (
        <div className={popUpComp ? styles.popup : styles.close} onClick={() => setPopUpComp(false)}>
            {popUpComp}
        </div>
    )
}
