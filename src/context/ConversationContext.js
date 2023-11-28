import { createContext, useContext, useEffect, useState, useRef } from 'react';
import * as messageServices from '../services/messageServices';
import * as participantServices from '../services/participantServices';
import { AccountLoginContext } from './AccountLoginContext';

const ConversationContext = createContext({});

function ConversationProvider({ children }) {
    const { userId } = useContext(AccountLoginContext);
    let conversationList = useRef([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (userId !== 0) {
            fetchApi();
        }
        setLoading(false);
    }, [userId]);

    const fetchApi = async () => {
        conversationList.current = await participantServices.getFriendChattingWith(userId);
        conversationList.current.forEach(async (item) => {
            item.messages = await messageServices.getMessageByConversationId(item.conversation.id);
            if(item.messages !== "") {
                if(item.messages.at(-1).content !== '') {
                    item.lastAction = 'text';
                }
                else {
                    item.lastAction = item.messages.at(-1).pin !== null ? 'pin' : 'heart';
                }
            }
            else {
                item.messages = [];
            }
            delete item.id;
        });
    };

    const reloadList = () => {
        fetchApi();
        setLoading(false);
    }

    const saveConversation = () => {
        const newConv = {
            
        };
    }

    return (
        loading === false && (
            <ConversationContext.Provider value={userId !== 0 ? {conversationList: conversationList, reloadList: reloadList} : ''}>
                {children}
            </ConversationContext.Provider>
        )
    );
}

export { ConversationProvider, ConversationContext };
