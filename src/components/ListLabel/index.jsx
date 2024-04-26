import React, { useState } from 'react'
import styles from './styles.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTag, faTrash } from '@fortawesome/free-solid-svg-icons'
import ContextMenu from '../ContextMenu';
import { usePopUp } from '../../Context/PopupContext';
import Confirm from '../Confirm';
import InputPopUp from '../AddLabelPopUp';
import { NavLink } from 'react-router-dom';

export default function ListLabel({ lab, labels, setLabels }) {

    const { setPopUpComp } = usePopUp();

    const [menu, setMenu] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

    const openMenu = (e) => {
        e.preventDefault();
        setMenuPosition({ x: e.clientX, y: e.clientY });
        setMenu(true);
    };

    const deleteLabel = (labelName) => {
        setPopUpComp(<Confirm message={`Are you sure you want to delete "${labelName}" label?`} func={
            () => setLabels(prev => prev.filter(l => l.title !== labelName))
        } />)
    };

    const changeLabelName = (oldName) => {
        setPopUpComp(<InputPopUp
            message={'Change label name'}
            submit={(newName) => setLabels(prev => [newName, ...prev.filter(l => l.title !== oldName)])}
            labels={labels}
            placeholder='Type here'
            color={lab.color}
        />)
    };

    return (
        <NavLink to={'/messages/' + lab.title} className={styles.labelLink}>
            <li className={styles.label} onContextMenu={openMenu}>
                <span><FontAwesomeIcon icon={faTag} color={lab.color} /></span>
                <p>{lab.title}</p>
                {menu && <ContextMenu x={menuPosition.x} y={menuPosition.y}
                    direction={'up-right'}
                    closeMenu={() => setMenu(false)}
                    options={[
                        {
                            icon: <FontAwesomeIcon icon={faPen} />,
                            title: 'Change name',
                            func: () => changeLabelName(lab.title)
                        },
                        {
                            icon: <FontAwesomeIcon icon={faTrash} />,
                            title: 'Delete label',
                            func: () => deleteLabel(lab.title)
                        },
                    ]} />}
            </li>
        </NavLink>
    )
}
