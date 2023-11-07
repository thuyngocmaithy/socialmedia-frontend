import styles from './MessageCard.module.scss'
import className from 'classnames/bind'
import ReceiverMessage from './ReceiverMessage';
import SenderMessage from './SenderMessage';
import HeartMessage from './HeartMessage';
import { useContext } from 'react';
import { UserIdContext } from '../../../../../context/UserIdContext'

const cx = className.bind(styles)

function MessageCard({ message }) {
    const USER_ID = useContext(UserIdContext);
    const isSender = (message.user.id===USER_ID?false:true);
    const isHeartMessage = (message.content===''?true:false);
    return (
        <div className={cx('wrapper-message-card')}>
            {
                isHeartMessage ?
                    <HeartMessage></HeartMessage>
                : isSender
                    ? <SenderMessage content={message.content} message={message}></SenderMessage>
                    : <ReceiverMessage content={message.content}></ReceiverMessage>
            }
        </div>
    );
}

export default MessageCard;