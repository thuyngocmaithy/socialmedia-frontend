<<<<<<< HEAD
import styles from './MessageCard.module.scss'
import className from 'classnames/bind'
import ReceiverMessage from './ReceiverMessage';
import SenderMessage from './SenderMessage';

const cx = className.bind(styles)
function MessageCard({type, content, chatWith}) {
    const isSender = (type === 'send');
    return (
        <div className={cx('wrapper-message-card')}>
            {
                isSender
                ? <SenderMessage content={content} chatWith={chatWith}></SenderMessage>
                : <ReceiverMessage content={content}></ReceiverMessage>
            }
        </div>
    );
}

=======
import styles from './MessageCard.module.scss'
import className from 'classnames/bind'
import ReceiverMessage from './ReceiverMessage';
import SenderMessage from './SenderMessage';

const cx = className.bind(styles)
function MessageCard({ type, content, chatWith }) {
    const isSender = (type === 'send');
    return (
        <div className={cx('wrapper-message-card')}>
            {
                isSender
                    ? <SenderMessage content={content} chatWith={chatWith}></SenderMessage>
                    : <ReceiverMessage content={content}></ReceiverMessage>
            }
        </div>
    );
}

>>>>>>> 02e458a4b0c2087a9f0f05c36c23889fa7d6c641
export default MessageCard;