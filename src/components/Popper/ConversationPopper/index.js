import { useState, createContext, useContext, useEffect } from 'react';
import ConversationMenu from './ConversationMenu';
import MessageBox from './MessageBox';
import classNames from 'classnames/bind';
import styles from './ConversationPopper.module.scss';
import { ConversationContext } from '../../../context/ConversationContext';
const cx = classNames.bind(styles);
export const UserIDContext = createContext('');

function ConversationPopper() {
    const chattingWithList = useContext(ConversationContext);
    const [messageIsShown, setMessageIsShown] = useState(false);
    const [currentInfor, setCurrentInfor] = useState({});
    // useEffect(() => console.log(chattingWithList))
    const changeConversation = (chatWith = '') => {
        if (messageIsShown) {
            setMessageIsShown(false);
            setCurrentInfor({});
        } else {
            chattingWithList.current.forEach((cons) => {
                if (cons.user.id === chatWith) {
                    setCurrentInfor({
                        conversation_id: cons.conversation.id,
                        name: cons.user.fullname,
                        avatar: cons.user.avatar,
                        messages: cons.messages,
                    });
                }
            });
            setMessageIsShown(true);
        }
    };

    // Set last message again
    const handleGetNewMessage = (conversation_id, messages) => {
        chattingWithList.current.forEach((item) => {
            if(item.conversation.id === conversation_id) {
                item.lastMessage = messages.at(-1).content;
                item.messages = messages;
                // console.log(item);
            }
        });
    }
    return (
        <div className={cx('wrapper-conversation-popper')}>
            {!messageIsShown ? (
                <ConversationMenu handleChange={changeConversation} chattingWithList={chattingWithList} />
            ) : (
                <MessageBox handleChange={changeConversation} handleGetNewMessage={handleGetNewMessage} chatWith={currentInfor} />
            )}
        </div>
    );
}

export default ConversationPopper;
