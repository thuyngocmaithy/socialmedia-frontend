<<<<<<< HEAD
import ConversationCard from "./ConversationCard";
import styles from './ConversationMenu.module.scss'
import classNames from 'classnames/bind';

const cx = classNames.bind(styles)
function ConversationList({handleChange, conversationList}) {
    return ( 
        <div className={cx('wrapper-conversation-list')}>
            <h3 className={cx('title')}>Messages</h3>
            {
                conversationList.map((conversation, index) => {
                    return <div key={index}>
                        <ConversationCard handleChange={handleChange} avatar={conversation.avatar} senderName={conversation.senderName} lastMessage={conversation.lastMessage}></ConversationCard>
                    </div>
                    
                })
            }
        </div>
    );
}

=======
import ConversationCard from "./ConversationCard";
import styles from './ConversationMenu.module.scss'
import classNames from 'classnames/bind';

const cx = classNames.bind(styles)
function ConversationList({ handleChange, conversationList }) {
    return (
        <div className={cx('wrapper-conversation-list')}>
            <h3 className={cx('title')}>Messages</h3>
            {
                conversationList.map((conversation, index) => {
                    return <div key={index}>
                        <ConversationCard handleChange={handleChange} avatar={conversation.avatar} senderName={conversation.senderName} lastMessage={conversation.lastMessage}></ConversationCard>
                    </div>

                })
            }
        </div>
    );
}

>>>>>>> 02e458a4b0c2087a9f0f05c36c23889fa7d6c641
export default ConversationList;