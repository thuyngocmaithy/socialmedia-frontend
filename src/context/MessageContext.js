import { createContext, useContext, useLayoutEffect, useState } from 'react';
import { ConversationContext } from './ConversationContext';
import { StompContext } from './StompContext';
const MessageContext = createContext({});

function MessageProvider({ children }) {
    const [load, setLoad] = useState(false);
    let stompClient = useContext(StompContext);
    const conversation = useContext(ConversationContext);
    let id = 0;
    let message = {};
    let stompObject = [];
    useLayoutEffect(() => {
        const loadRoom = () => {
            setLoad(true);
            // conversation.current.forEach((item) => {
            //     const tempObject = stompClient.subscribe(`/room/conversation_id/${item.conversation.id}`, function(message) {
            //         message = JSON.parse(message.body);
            //     })
            //     stompObject.push(tempObject);
            //     id = tempObject.id;
            //     console.log(item);
            // });

            setLoad(false);
        };
        loadRoom();
        // console.log('conversation:' + JSON.stringify(conversation));
        // console.log(conversation.current);
    });
    const stompOutputObject = {
        stompID: id,
        stompMessage: message,
    };
    return <MessageContext.Provider value={stompOutputObject}>{children}</MessageContext.Provider>;
}

export { MessageProvider, MessageContext };
