import ConversationCard from './ConversationCard';
import styles from './ConversationMenu.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
function ConversationList({ handleChange, conversationList }) {
    return (
        <div className={cx('wrapper-conversation-list')}>
            {console.log(conversationList)}
            <h3 className={cx('title')}>Messages</h3>
            {conversationList.map((conversation, index) => {
                return (
                    <div key={index}>
                        <ConversationCard
                            handleChange={handleChange}
                            avatar={conversation.user.avatar}
                            senderName={conversation.user.username}
                            lastMessage={conversation.lastMessage}
                        ></ConversationCard>
                    </div>
                );
            })}
        </div>
    );
}

export default ConversationList;
