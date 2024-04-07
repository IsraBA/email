import React from 'react'
import styles from './styles.module.css'

export default function Notifications({num = 1}) {

  function formatNumber(number) {
    return number > 99 ? "+99" : number.toString();
  }

  return (
    <div className={styles.notificationsNum}>{formatNumber(num)}</div>
  )
}
