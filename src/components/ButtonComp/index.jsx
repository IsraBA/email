import React from 'react'
import styles from './styles.module.css'


export default function ButtonComp({titleAndIcon = [], click = () => {}, type='button'}) {
  return (
    <button type={type} className={styles.btn} onClick={click}>
        <span>{titleAndIcon[0]}</span>
        <span>{titleAndIcon[1]}</span>
    </button>
  )
}
