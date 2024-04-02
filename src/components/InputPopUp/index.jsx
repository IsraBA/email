import React, { useState } from 'react'
import styles from './styles.module.css'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { usePopUp } from '../../Context/PopupContext';

export default function InputPopUp({ message, placeholder = 'Type here...', submit, labels = [], color = '#000000'}) {

    const { setPopUpComp } = usePopUp();

    const [value, setValue] = useState('');
    const [newColor, setNewColor] = useState('');
    const [beat, setBeat] = useState(false);
    const [err, setErr] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        let trimedValue = value.trim();
        if (trimedValue) {
            const isAlreadyExist = labels.find(label => label.content === trimedValue);
            if (isAlreadyExist) {
                setErr('* label already exists');
                return;
            }
            submit({ content: trimedValue, color: newColor ? newColor : color});
            setPopUpComp(false);
        }
    };

    return (
        <div className={styles.container}>
            <h3>{message}</h3>
            <form onSubmit={handleSubmit}>
                <div className={styles.textInputWrapper}>
                    <input
                        placeholder={placeholder}
                        type="text"
                        className={styles.textInput}
                        onChange={(e) => { setValue(e.target.value), setErr('') }} />
                    <button
                        className={value.trim() ? styles.addLabel : styles.hide}
                        onMouseEnter={() => setBeat(true)}
                        onMouseLeave={() => setBeat(false)}
                        type="submit">
                        <FontAwesomeIcon icon={faPlus} beat={beat} />
                    </button>
                </div>
                <label className={styles.colorInput}>
                    <input
                        type="color"
                        value={newColor ? newColor : color}
                        onChange={(e) => setNewColor(e.target.value)}
                        className={styles.colorPicker}
                    />
                    Choose label color
                </label>
            </form>
            {err && <span className={styles.error}>{err}</span>}
        </div>
    )
}
