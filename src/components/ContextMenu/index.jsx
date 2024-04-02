import React, { useEffect, useRef } from 'react'
import styles from './styles.module.css'

export default function ContextMenu({ x, y, options = [{ icon: '', title: '' }], closeMenu }) {

    const menuRef = useRef(null);

    useEffect(() => {
        const handleMouseOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                closeMenu();
            }
        };

        document.addEventListener('mousedown', handleMouseOutside);
        return () => {
            document.addEventListener('mousedown', handleMouseOutside);
        }
    }, [closeMenu])


    return (
        <ul ref={menuRef} className={styles.menu} style={{ top: y, left: x }}>
            {options.map(op => <li key={op.title}>{op.icon} {op.title}</li>)}
        </ul>
    )
}
