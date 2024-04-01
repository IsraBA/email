import React from 'react'
import { usePopUp } from '../../Context/PopupContext';
import styles from './styles.module.css'

export default function Confirm({ message, func }) {

  const { setPopUpComp } = usePopUp();

  return (
    <div className={styles.container} onClick={(e) => e.stopPropagation()}>
      <h3>{message}</h3>
      <div>
        <button onClick={() => { setPopUpComp(false), func() }} className={`${styles.btn} ${styles.yes}`}>Yes</button>
        <button onClick={() => setPopUpComp(false)} className={`${styles.btn} ${styles.cancel}`}>Cancel</button>
      </div>
    </div>
  )
}
