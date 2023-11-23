import classNames from 'classnames/bind';
import ConversationCard from './ConversationCard';
import styles from './ConversationMenu.module.scss';
import { useContext } from 'react';
import { AccountLoginContext } from '../../../../context/AccountLoginContext';

const cx = classNames.bind(styles);
function ConversationList({ handleChange, conversationList }) {
    const { userId } = useContext(AccountLoginContext);
    return (
        <div className={cx('wrapper-conversation-list')}>
            <h3 className={cx('title')}>Messages</h3>
            {conversationList.map((item, index) => {
                let isSeen = true;
                item.messages.forEach((item) => {
                    if(item.seen === false && item.user.id !== userId) {
                        isSeen = false;
                    }
                });
                return (
                    <div key={index}>
                        <ConversationCard
                            handleChange={handleChange}
                            avatar={item.user.avatar}
                            senderName={item.user.username}
                            lastMessage={item.lastMessage}
                            isSeen={isSeen}
                            conversation_id={item.conversation.id}
                        ></ConversationCard>
                    </div>
                );
            })}
        </div>
    );
}

export default ConversationList;
