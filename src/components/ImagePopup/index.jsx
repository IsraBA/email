import React from 'react'
import styles from './styles.module.css'

export default function ImagePopup({ img, title, x, y }) {
    return (
        <img
            // style={{
            //     transformOrigin: `${x}px ${y}px`
            // }}
            className={styles.img}
            src={img}
            alt={title}
        />
    )
}
