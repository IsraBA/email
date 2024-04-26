import React, { useState } from 'react'
import styles from './styles.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import api from '../../functions/api';

export default function Label({ text, color, chatId, setChat }) {

  const [isDeleting, setIsDeleting] = useState(false);

  const deleteLabel = () => {
    api.del(`chat/removeLabel/${chatId}/${text}`)
      .then(res => {
        setIsDeleting(true);
        setTimeout(() => {
          setChat(prev => ({ ...prev, labels: res }));
        }, 400);
      });
  };

  return (
    <div className={`${styles.labelText} ${isDeleting ? styles.deleted : ''}`} style={{ '--color': color }}>
      {text}
      <button onClick={deleteLabel}><FontAwesomeIcon icon={faX} size='xs' /></button>
    </div>
  )
}
