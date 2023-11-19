import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { ConversationContext } from './ConversationContext';
import { StompContext } from './StompContext';
import * as participantsService from '../services/participantServices';
import { AccountLoginContext } from './AccountLoginContext';
const MessageContext = createContext({});

function MessageProvider({ children }) {
    const stompClient = useContext(StompContext);
    const USER_ID = useContext(AccountLoginContext);
    let conversations = useContext(ConversationContext);
    let conversationJoined = [];
    let unSeenMessageCount = useRef(0);
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
                conversationJoined.forEach((conversation_id) => {
                    stompClient.subscribe(
                        `/room/conversation_id/${conversation_id}`,
                        function (message) {
                            updateMessages(JSON.parse(message.body));
                        },
                    );
                });
                stompClient.subscribe(
                    '/room/testUnsubscribe',
                    (response) => {
                        console.log(response.body)
                    }
                );
            }, 1500);
        };
        if(USER_ID !== 0) {
            fetchAPI();
        }
    }, [USER_ID]);

    const countUnSeenMessage = () => {
        conversations.current.forEach((item) => {
            item.messages.forEach((m) => {
                if(!m.seen) {
                    unSeenMessageCount.current = unSeenMessageCount.current+1;
                }
            })
        });
        setMessageCount(unSeenMessageCount.current);
    };

    const updateMessages = (message) => {
        conversations.current.forEach((item) => {
            if(item.conversation.id === message.conversation.id) {
                item.messages = [...item.messages, message];
                item.lastMessage = message.content;
            }
        });
        countUnSeenMessage();
    }

    useEffect(() => {
        console.log(`New Message: ${messageCount}`);
        console.log(conversations);
    },[messageCount]);

    return <MessageContext.Provider value={unSeenMessageCount.current}>{children}</MessageContext.Provider>;
}

export { MessageProvider, MessageContext };
