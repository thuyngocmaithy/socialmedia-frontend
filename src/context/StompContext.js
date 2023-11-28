import { createContext, useContext, useEffect } from 'react';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { AccountLoginContext } from './AccountLoginContext';

const StompContext = createContext(null);

function StompProvider({ children }) {
    const { userId } = useContext(AccountLoginContext);
    var socket = new SockJS('http://localhost:8080/ws');
    let stompClient = Stomp.over(socket);
    // stompClient.debug = () => {}; // Không log thông tin khi connect với websocket ở server
    stompClient.connect({}, function (frame) {
        
    });

    return <StompContext.Provider value={{stompClient}}>{children}</StompContext.Provider>;
}

export { StompContext, StompProvider };
