import React, { useState } from 'react'
import styles from './styles.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTag, faTrash } from '@fortawesome/free-solid-svg-icons'
import ContextMenu from '../ContextMenu';

export default function ListLabel({ lab }) {

    const [menu, setMenu] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

    const openMenu = (e) => {
        e.preventDefault();
        setMenuPosition({ x: e.pageX, y: e.pageY });
        setMenu(true);
    };

    return (
        <li className={styles.label} onContextMenu={openMenu}>
            <span><FontAwesomeIcon icon={faTag} color={lab.color} /></span>
            <p>{lab.content}</p>
            {menu && <ContextMenu x={menuPosition.x} y={menuPosition.y}
            closeMenu={() => setMenu(false)}
            options={[
                { icon: <FontAwesomeIcon icon={faPen} />, title: 'Change name' },
                { icon: <FontAwesomeIcon icon={faTrash} />, title: 'Delete label' },
            ]} />}
        </li>
    )
}
