import React, { createContext, useContext, useState } from 'react'

const PopupContext = createContext();

export const usePopUp = () => useContext(PopupContext);

export const PopupProvider = ({ children }) => {
    const [popUpComp, setPopUpComp] = useState(false);

    return (
        <PopupContext.Provider value={{ popUpComp, setPopUpComp }}>
            {children}
        </PopupContext.Provider>
    );
};
