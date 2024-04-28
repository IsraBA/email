import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../functions/api";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {

    const nav = useNavigate();

    // בדיקה שהטוקן תקין בעת עליית האפליקציה
    useEffect(() => {
        if (!localStorage.token) {
            nav('/login');
        } else {
            api.get('getUserWithToken')
                .then(setUser)
                .catch(err => {
                    console.log(err);
                    nav('/login');
                })
        }
    }, [])

    const [user, setUser] = useState({});

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
