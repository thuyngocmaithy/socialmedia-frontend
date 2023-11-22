import classNames from 'classnames/bind';
import ConversationCard from './ConversationCard';
import styles from './ConversationMenu.module.scss';

const cx = classNames.bind(styles);
function ConversationList({ handleChange, conversationList }) {
    return (
        <div className={cx('wrapper-conversation-list')}>
            <h3 className={cx('title')}>Messages</h3>
            {conversationList.map((conversation, index) => {
                let isSeen = true;
                if(conversation.messages.find((element) => element.seen === false) !== undefined) {
                    isSeen = false;
                }
                return (
                    <div key={index}>
                        <ConversationCard
                            handleChange={handleChange}
                            avatar={conversation.user.avatar}
                            senderName={conversation.user.username}
                            lastMessage={conversation.lastMessage}
                            isSeen={isSeen}
                        ></ConversationCard>
                    </div>
                );
            })}
        </div>
    );
}

export default ConversationList;
