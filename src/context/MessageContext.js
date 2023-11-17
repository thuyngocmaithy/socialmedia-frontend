import { createContext, useContext, useLayoutEffect, useState } from 'react';
import { ConversationContext } from './ConversationContext';
import { StompContext } from './StompContext';
import * as participantsService from '../services/participantServices';
import { AccountLoginContext } from './AccountLoginContext';
const MessageContext = createContext({});

function MessageProvider({ children }) {
    // const [load, setLoad] = useState(false);
    const stompClient = useContext(StompContext);
    const USER_ID = useContext(AccountLoginContext);
    var conversationJoined = [];
    useLayoutEffect(() => {
        const fetchAPI = async () => {
            // setConversationJoined();
            var temp = await participantsService.getConversationJoinedByUserId(USER_ID);
            temp.forEach(element => {
                conversationJoined = [...conversationJoined, element.conversation.id];
                
                stompClient.subscribe(
                    `/room/conversation_id/${element.conversation.id}`,
                    function (message) {
                        console.log(JSON.parse(message.body));
                        // updateMessages(JSON.parse(message.body));
                    },
                );
            });
            loadRoom();
        }
        const loadRoom = async () => {
            // conversationJoined.forEach((conversation_id) => {
            // });
        };
        if(USER_ID !== 0) {
            fetchAPI();
        }
    }, [USER_ID]);
    return <MessageContext.Provider value={stompClient}>{children}</MessageContext.Provider>;
}

export { MessageProvider, MessageContext };
