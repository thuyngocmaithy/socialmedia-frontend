import styles from './MessageCard.module.scss'
import className from 'classnames/bind'
import ReceiverMessage from './ReceiverMessage';
import SenderMessage from './SenderMessage';

const cx = className.bind(styles)
const USER_ID = 1;
function MessageCard({ message }) {
    // console.log(message.user.id)
    const isSender = (message.user.id===USER_ID?false:true);
    return (
        <div className={cx('wrapper-message-card')}>
            {
                isSender
                    ? <SenderMessage content={message.content} message={message}></SenderMessage>
                    : <ReceiverMessage content={message.content}></ReceiverMessage>
            }
        </div>
    );
}

export default MessageCard;