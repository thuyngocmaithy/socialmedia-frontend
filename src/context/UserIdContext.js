<<<<<<< HEAD
import { createContext } from "react";

const UserIdContext = createContext('');

function UserIdProvider({ children }) {
    const id = prompt("Nhap ID: ");
    return (
        <UserIdContext.Provider value={parseInt(id)}>{children}</UserIdContext.Provider>
    );
}

export { UserIdProvider, UserIdContext };
=======
import { createContext } from 'react';

const UserIdContext = createContext('');

function UserIdProvider({ children }) {
    const id = prompt('Nhap ID: ');
    return <UserIdContext.Provider value={parseInt(id)}>{children}</UserIdContext.Provider>;
}

export { UserIdProvider, UserIdContext };
>>>>>>> 314505d7d6575d92a690e7e4eec041b98f0ca63c
