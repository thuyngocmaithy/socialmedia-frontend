import { createContext, useState } from 'react';

const AccountLoginContext = createContext();

function AccountLoginProvider({ children }) {
    const initialData = JSON.parse(localStorage.getItem('userLogin')) || {};
    const [userLogin, setUserLogin] = useState(initialData);

    return <AccountLoginContext.Provider value={userLogin}>{children}</AccountLoginContext.Provider>;
}

export { AccountLoginContext, AccountLoginProvider };
