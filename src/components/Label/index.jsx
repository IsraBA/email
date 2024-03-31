import React from 'react'
import styles from './styles.module.css'

export default function Label({ text }) {

  const deleteLabel = () => { };

  return (
    <div className={styles.labelText}>
      {text}
      <button onClick={deleteLabel}>x</button>
    </div>
  )
}
