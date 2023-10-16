import { createContext } from 'react';

const AccountOtherContext = createContext();

function AccountOtherProvider({ children }) {
    const accountOther = false;
    return <AccountOtherContext.Provider value={accountOther}>{children}</AccountOtherContext.Provider>;
}

export { AccountOtherContext, AccountOtherProvider };
