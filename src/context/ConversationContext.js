import { createContext, useContext, useEffect, useState, useRef } from "react";
import * as messageServices from '../services/messageServices';
import * as participantServices from '../services/participantServices';
import { UserIdContext } from "./UserIdContext";

const ConversationContext = createContext({});

function ConversationProvider({ children }) {
    const USER_ID = useContext(UserIdContext);
    let conversationList = useRef();
    const [load, setLoad] = useState(false);
    useEffect(() => {
        const fetchApi = async () => {
            setLoad(true);
            conversationList.current = await participantServices.getFriendChattingWith(USER_ID);
            conversationList.current.forEach(async (item) => {
                item.messages = await messageServices.getMessageByConversationId(item.conversation.id);
                item.lastMessage = item.messages.at(-1).content;
                delete item.id;
            })
            setLoad(false);
        };
        fetchApi();
    })
    return <ConversationContext.Provider value={conversationList}>{children}</ConversationContext.Provider>;
}

export { ConversationProvider, ConversationContext};