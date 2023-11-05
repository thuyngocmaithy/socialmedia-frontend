import { createContext } from 'react';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const StompContext = createContext(null);

function StompProvider({ children }) {
    let stompClient = null;
    // HANDLE SEND MESSAGE
    var socket = new SockJS('http://localhost:8080/gs-guide-websocket');
    stompClient = Stomp.over(socket);
    // stompClient.connect({}, function(frame) {
    //     console.log('Connected: ' + frame);
    //     stompClient.subscribe('/topic/greetings', function(greeting){
    //         addMessage(greeting);
    //         console.log(JSON.parse(greeting.body).content)
    //         addMessage(JSON.parse(greeting.body).content )
    //     });
    // });
    //
    return <StompContext.Provider value={stompClient}>{children}</StompContext.Provider>;
}

export { StompContext, StompProvider };
