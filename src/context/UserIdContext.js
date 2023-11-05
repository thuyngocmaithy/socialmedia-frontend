import { createContext } from "react";

const UserIdContext = createContext('');

function UserIdProvider({ children }) {
    const id = prompt("Nhap ID: ");
    return (
        <UserIdContext.Provider value={id}>{children}</UserIdContext.Provider>
    );
}

export default { UserIdProvider, UserIdContext};