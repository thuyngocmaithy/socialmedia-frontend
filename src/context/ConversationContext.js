import { createContext, useContext, useEffect, useState, useRef } from "react";
import * as messageServices from '../services/messageServices';
import * as participantServices from '../services/participantServices';
import { UserIdContext } from "./UserIdContext";

const ConversationContext = createContext({});

function ConversationProvider({ children }) {
    const USER_ID = useContext(UserIdContext);
    let conversations = useRef([]);
    const [load, setLoad] = useState(false);
    useEffect(() => {
        const fetchApi = async () => {
            setLoad(true);
            let temp = await participantServices.getFriendChattingWith(USER_ID);
            temp.forEach(async (item) => {
                item.messages = await messageServices.getMessageByConversationId(item.conversation.id);
                item.lastMessage = item.messages.at(-1).content;
                delete item.id;
            });
            conversations.current = [...Object.values(temp)];
            // console.log(conversations.current);
            setLoad(false);
        };
        
        fetchApi();
    },[])
    return <ConversationContext.Provider value={conversations}>{children}</ConversationContext.Provider>;
}

export { ConversationProvider, ConversationContext};