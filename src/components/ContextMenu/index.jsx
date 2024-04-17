import React, { useEffect, useRef } from 'react'
import styles from './styles.module.css'

export default function ContextMenu({ x, y, options = [{ icon: '', title: '', func: () => { } }], closeMenu, direction }) {

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

    const directionToStyle = (direction) => {
        switch (direction) {
            case 'up-right':
                return { top: `${y}px`, left: `${x}px` };
            case 'up-left':
                return { top: `${y}px`, right: `calc(100vw - ${x}px)` };
            case 'down-right':
                return { bottom: `${window.innerHeight - y}px`, left: `${x}px` };
            case 'down-left':
                return { bottom: `${window.innerHeight - y}px`, right: `calc(100vw - ${x}px)` };
            default:
                return { top: `${y}px`, left: `${x}px` };
        }
    };
    

    return (
        <ul ref={menuRef} className={styles.menu} style={directionToStyle(direction)} onClick={(e) => e.preventDefault()}>
            {options.map(op => <li key={op.title} onClick={op.func}>{op.icon} {op.title}</li>)}
        </ul>
    )
}
