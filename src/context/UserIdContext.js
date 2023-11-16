import { createContext } from 'react';

const UserIdContext = createContext('');

function UserIdProvider({ children }) {
    const id = prompt('Nhap ID: ');
    return <UserIdContext.Provider value={parseInt(id)}>{children}</UserIdContext.Provider>;
}

export { UserIdProvider, UserIdContext };
