import React from 'react'
import styles from './styles.module.css'


export default function ButtonComp({titleAndIcon = [], click = () => {}}) {
  return (
    <button className={styles.btn} onClick={click}>
        <span>{titleAndIcon[0]}</span>
        <span>{titleAndIcon[1]}</span>
    </button>
  )
}
