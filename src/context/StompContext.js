import { createContext, useState, useEffect } from 'react';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const StompContext = createContext(null);

function StompProvider({ children }) {
    const [stompClient, setStompClient] = useState(null);

    useEffect(() => {
        // Chỉ kết nối khi stompClient chưa được thiết lập
        if (!stompClient) {
            const socket = new SockJS('http://localhost:8080/ws');
            const client = Stomp.over(socket);

            client.connect({}, function (frame) {
                console.log('Connected: ' + frame);
            });

            setStompClient(client);
        }

        // Clean up function
        return () => {
            // Ngắt kết nối khi component unmount
            if (stompClient) {
                stompClient.disconnect();
            }
        };
    }, [stompClient]); // useEffect sẽ chạy lại khi stompClient thay đổi

    return <StompContext.Provider value={stompClient}>{children}</StompContext.Provider>;
}

export { StompContext, StompProvider };
