import { createContext, useContext, useEffect, useRef, useState } from 'react';
import * as messageServices from '../services/messageServices';
import * as participantServices from '../services/participantServices';
import { AccountLoginContext } from './AccountLoginContext';

const ConversationContext = createContext({});

function ConversationProvider({ children }) {
    const { userId } = useContext(AccountLoginContext);
    let conversationList = useRef();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchApi = async () => {
            conversationList.current = await participantServices.getFriendChattingWith(userId);
            conversationList.current.forEach(async (item) => {
                item.messages = await messageServices.getMessageByConversationId(item.conversation.id);
                item.lastMessage = item.messages.at(-1).content;
                delete item.id;
            });
        };
        if (userId !== 0) {
            fetchApi();
        }
        setLoading(false);
    }, [userId]);
    return loading === false && <ConversationContext.Provider value={123}> {children} </ConversationContext.Provider>;
}

export { ConversationContext, ConversationProvider };
