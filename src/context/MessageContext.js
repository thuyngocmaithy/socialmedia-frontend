import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { ConversationContext } from './ConversationContext';
import { StompContext } from './StompContext';
import * as participantsService from '../services/participantServices';
import { AccountLoginContext } from './AccountLoginContext';
import * as messageServices from '../services/messageServices';
const MessageContext = createContext({});

function MessageProvider({ children }) {
    const stompClient = useContext(StompContext);
    const { userId } = useContext(AccountLoginContext);
    let conversations = useContext(ConversationContext);
    let conversationJoined = [];
    const [messageCount, setMessageCount] = useState(0);
    const [newMessage, setNewMessage] = useState({});
    useEffect(() => {
        const fetchAPI = async () => {
            var temp = await participantsService.getConversationJoinedByUserId(userId);
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
                countMessage();
            }, 1500);
        };
        if(userId !== 0) {
            fetchAPI();
        }
    }, [userId]);

    const countMessage = () => {
        let count = 0;
        conversations.current.forEach((item) => {
            item.messages.forEach((message) => {
                if(!message.seen && message.user.id !== userId) {
                    count ++;
                }
            });
        });
        setMessageCount(count);
    };

    const updateMessages = (message) => {
        conversations.current.forEach((item) => {
            if(item.conversation.id === message.conversation.id) {
                item.messages = [...item.messages, message];
                item.lastMessage = message.content;
            }
        });
        if(!message.seen && message.user.id !== userId) {
            setMessageCount(count => count+1);
        }
        setNewMessage(message);
    }

    const setAllSeen = (conversation_id) => {
        conversations.current.forEach((item) => {
            if(item.conversation.id === conversation_id) {
                item.messages.forEach(async (message) => {
                    const res = await messageServices.update(message);
                })
            }
        });
    }

    return <MessageContext.Provider value={{messageCount: messageCount, setAllSeen: setAllSeen, setMessageCount: setMessageCount, newMessage: newMessage}}>{children}</MessageContext.Provider>;
}

export { MessageProvider, MessageContext };
