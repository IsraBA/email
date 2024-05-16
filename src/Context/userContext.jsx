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
        // console.log("location.pathname: ", location.pathname)
        if (location.pathname == '/register' && !localStorage.token) return;
        else if (!localStorage.token && location.pathname != '/register') {
            nav('/login');
        } else {
            api.get('getUserWithToken')
                .then(res => { setUser(res) })
                .catch(err => {
                    console.error(err);
                    nav('/login');
                })
        }
    }, [nav])

    const [user, setUser] = useState({});

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
