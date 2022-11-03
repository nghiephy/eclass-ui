import { createContext, useState } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [classData, setClassData] = useState(JSON.parse(localStorage.getItem('classData')));

    const handleSetClassData = (data) => {
        setClassData(data);
        localStorage.setItem('classData', JSON.stringify(data));
    };

    return (
        <AuthContext.Provider value={{ auth, setAuth, classData, handleSetClassData }}>{children}</AuthContext.Provider>
    );
};

export default AuthContext;
