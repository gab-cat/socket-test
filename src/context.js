import React, { useEffect, useState, useContext, createContext } from "react";

const MyContext = createContext();

export const ContextProvider = ({ children }) => {
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');
    const [room, setRoom] = useState('');
    const [doneSetup, setDoneSetup] = useState(false)

    return (
        <MyContext.Provider value={{ message, setMessage, username, setUsername, room, setRoom, doneSetup, setDoneSetup }}>
            {children}
        </MyContext.Provider>
    );
};

export const useContextProvider = () => {
    const context = useContext(MyContext);
    if (!context) {
        throw new Error('Context error');
    }
    return context;
};
