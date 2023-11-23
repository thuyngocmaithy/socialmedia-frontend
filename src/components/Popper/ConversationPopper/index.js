import { useState, useContext } from 'react';
import ConversationMenu from './ConversationMenu';
import MessageBox from './MessageBox';
import classNames from 'classnames/bind';
import styles from './ConversationPopper.module.scss';
import { ConversationContext } from '../../../context/ConversationContext';
import { ThemeContext } from '../../../context/ThemeContext';
import { MessageContext } from '../../../context/MessageContext';

const cx = classNames.bind(styles);
function ConversationPopper() {
    const { theme } = useContext(ThemeContext);
    const conversationList = useContext(ConversationContext);
    const { setAllSeen } = useContext(MessageContext);
    const [messageIsShown, setMessageIsShown] = useState(false);
    const [currentInfor, setCurrentInfor] = useState({});

    const changeConversation = (chatWith = '', conversation_id ) => {
        if (messageIsShown) {
            setMessageIsShown(false);
            setCurrentInfor({});
        } else {
            conversationList.current.forEach((conv) => {
                if (conv.user.username === chatWith) {
                    setCurrentInfor({
                        conversation_id: conv.conversation.id,
                        name: conv.user.fullname,
                        avatar: conv.user.avatar,
                        messages: conv.messages,
                    });
                }
                if(conv.conversation.id === conversation_id) {
                    conv.messages.forEach((message) => {
                        message.seen = true;
                        setAllSeen(conversation_id);
                    })
                }
            });
            setMessageIsShown(true);
        }
    };

    return (
        <div className={cx('wrapper-conversation-popper', theme === 'dark' ? 'dark' : '')}>
            {!messageIsShown ? (
                <ConversationMenu handleChange={changeConversation} conversationList={conversationList.current} />
            ) : (
                <MessageBox
                    handleChange={changeConversation}
                    chatWith={currentInfor}
                />
            )}
        </div>
    );
}

export default ConversationPopper;
