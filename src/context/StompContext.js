import { createContext } from 'react';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const StompContext = createContext(null);

function StompProvider({ children }) {
    // HANDLE SEND MESSAGE
    var socket = new SockJS('http://localhost:8080/ws');
    let stompClient = Stomp.over(socket);
    // stompClient.debug = () => {}; // Không log thông tin khi connect với websocket ở server
    stompClient.connect({}, function (frame) {
        // console.log('Connected: ' + frame);
    });
    stompClient.onStompError({}, function (frame) {
        console.log(frame);
    });
    return <StompContext.Provider value={stompClient}>{children}</StompContext.Provider>;
}

export { StompContext, StompProvider };
