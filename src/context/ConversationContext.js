import { createContext, useContext, useEffect, useState, useRef } from 'react';
import * as messageServices from '../services/messageServices';
import * as participantServices from '../services/participantServices';
import { AccountLoginContext } from './AccountLoginContext';

const ConversationContext = createContext({});

function ConversationProvider({ children }) {
    const USER_ID = useContext(AccountLoginContext);
    let conversationList = useRef();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchApi = async () => {
            conversationList.current = await participantServices.getFriendChattingWith(USER_ID);
            conversationList.current.forEach(async (item) => {
                item.messages = await messageServices.getMessageByConversationId(item.conversation.id);
                item.lastMessage = item.messages.at(-1).content;
                delete item.id;
            });
        };
        if (USER_ID !== 0) {
            fetchApi();
        }
        setLoading(false);
    }, [USER_ID]);
    return (
        loading === false && (
            <ConversationContext.Provider value={USER_ID !== 0 ? conversationList : ''}>
                {children}
            </ConversationContext.Provider>
        )
    );
}

export { ConversationProvider, ConversationContext };
