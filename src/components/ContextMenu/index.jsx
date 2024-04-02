import React, { useEffect, useRef } from 'react'
import styles from './styles.module.css'

export default function ContextMenu({ x, y, options = [{ icon: '', title: '', func: () => { } }], closeMenu }) {

    const menuRef = useRef(null);

    useEffect(() => {
        const handleMouseOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                closeMenu();
            }
        };

        document.addEventListener('mousedown', handleMouseOutside);
        return () => {
            document.removeEventListener('mousedown', handleMouseOutside);
        }
    }, [closeMenu])


    return (
        <ul ref={menuRef} className={styles.menu} style={{ top: y, left: x }} onClick={(e) => e.preventDefault()}>
            {options.map(op => <li key={op.title} onClick={op.func}>{op.icon} {op.title}</li>)}
        </ul>
    )
}
