import Cookies from 'js-cookie';
import { createContext, useEffect, useState } from 'react';

const AccountLoginContext = createContext();

function AccountLoginProvider({ children }) {
    // const initialData = Cookies.get('userLogin') || 0;
    // const [userLogin, setUserLogin] = useState(0);

    // Hàm để lấy giá trị từ localStorage
    function getLocalStorageWithExpiration(key) {
        const data = localStorage.getItem(key);
        if (!data) {
            return null;
        }

        const parsedData = JSON.parse(data);
        const currentTime = new Date().getTime();

        if (currentTime > parsedData.expirationTime) {
            // Nếu thời gian hiện tại vượt quá thời gian hết hạn, xóa khỏi localStorage
            localStorage.removeItem(key);
            return null;
        }

        return parsedData.value;
    }

    const [userLogin, setUserLogin] = useState(() => {
        const initialData = getLocalStorageWithExpiration('userLogin');
        console.log('initialData:' + initialData);
        return initialData || 0;
    });

    useEffect(() => {
        const getUserLogin = async () => {
            const userId = await getLocalStorageWithExpiration('userLogin');
            setUserLogin(userId || 0);
        };
        getUserLogin();
    }, []);

    return <AccountLoginContext.Provider value={userLogin}>{children}</AccountLoginContext.Provider>;
}

export { AccountLoginContext, AccountLoginProvider };
