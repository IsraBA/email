import React, { useState } from 'react'
import styles from './styles.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTag, faTrash } from '@fortawesome/free-solid-svg-icons'
import ContextMenu from '../ContextMenu';
import { usePopUp } from '../../Context/PopupContext';
import Confirm from '../Confirm';
import InputPopUp from '../AddLabelPopUp';
import { NavLink } from 'react-router-dom';
import apiToast from '../../functions/apiToast';
import { useUser } from '../../Context/userContext';

export default function ListLabel({ lab }) {

    const { user, setUser } = useUser();

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
            () => apiToast.del('user/deleteLabelFromUser/' + labelName, {}, {},
                'Deleting label', 'Label deleted', 'Error deleting label')
                .then((res) => setUser(prev => ({ ...prev, labels: res.data })))
        } />)
    };

    const changeLabelName = (oldLabel) => {
        setPopUpComp(<InputPopUp
            message={'Change label name'}
            submit={(updatedLabel) => apiToast.put('user/changeLabelName', updatedLabel, {},
            'Updating label...', 'Label successfully updated', 'Error updating label')
            .then(res => setUser(prev => ({ ...prev, labels: res.data })))}
            placeholder='Type here'
            labels={user?.labels}
            color={oldLabel.color}
            _id={oldLabel._id}
        />)
    };

    return (
        <NavLink to={'/messages/' + lab.title} className={styles.labelLink}>
            <li className={styles.label} onContextMenu={openMenu}>
                <span><FontAwesomeIcon icon={faTag} color={lab.color} /></span>
                <p>{lab.title}</p>
                {menu && <ContextMenu x={menuPosition.x} y={menuPosition.y}
                    direction={'down-right'}
                    closeMenu={() => setMenu(false)}
                    options={[
                        {
                            icon: <FontAwesomeIcon icon={faPen} />,
                            title: 'Change name',
                            func: () => changeLabelName(lab)
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
