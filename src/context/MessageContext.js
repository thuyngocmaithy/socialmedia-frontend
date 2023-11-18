import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { ConversationContext } from './ConversationContext';
import { StompContext } from './StompContext';
import * as participantsService from '../services/participantServices';
import { AccountLoginContext } from './AccountLoginContext';
const MessageContext = createContext({});

function MessageProvider({ children }) {
    // const [load, setLoad] = useState(false);
    const stompClient = useContext(StompContext);
    const USER_ID = useContext(AccountLoginContext);
    let conversations = useContext(ConversationContext);
    let conversationJoined = [];
    let messages = useRef([]);
    const [messageCount, setMessageCount] = useState(0);
    useEffect(() => {
        const fetchAPI = async () => {
            var temp = await participantsService.getConversationJoinedByUserId(USER_ID);
            temp.forEach(element => {
                conversationJoined = [...conversationJoined, element.conversation.id];
            });
            loadRoom();
        }
        const loadRoom = async () => {
            setTimeout(() => {
                conversationJoined.forEach(conversation_id => {
                    stompClient.subscribe(
                        `/room/conversation_id/${conversation_id}`,
                        function (message) {
                            updateMessages(JSON.parse(message.body));
                        },
                    );
                });
                // console.log(conversations);
            }, 100);
        };
        if(USER_ID !== 0) {
            fetchAPI();
        }
    }, [USER_ID]);

    const updateMessages = (message) => {
        messages.current = [...messages.current,message];
        conversations.current.forEach((item) => {
            if(item.conversation.id === message.conversation.id) {
                item.messages = [...item.messages, message];
                item.lastMessage = message.content;
            }
        });
        setMessageCount(messages.current.length);
    }

    useEffect(() => {
        // setMessageCount(messages.current.length);
        console.log(`New Message: ${messageCount}`);
        console.log(conversations);
    },[messageCount]);

    return <MessageContext.Provider value={messages.current}>{children}</MessageContext.Provider>;
}

export { MessageProvider, MessageContext };
