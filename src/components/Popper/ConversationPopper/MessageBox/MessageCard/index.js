import styles from './MessageCard.module.scss';
import className from 'classnames/bind';
import ReceiverMessage from './ReceiverMessage';
import SenderMessage from './SenderMessage';
import HeartMessage from './HeartMessage';
import { useContext } from 'react';
import { AccountLoginContext } from '../../../../../context/AccountLoginContext';

const cx = className.bind(styles);

function MessageCard({ message }) {
    const USER_ID = useContext(AccountLoginContext);
    const isSender = message.user.id === USER_ID ? false : true;
    const isHeartMessage = message.content === '' ? true : false;
    return (
        <div className={cx('wrapper-message-card')}>
            {isHeartMessage ? (
                <HeartMessage></HeartMessage>
            ) : isSender ? (
                <div className={cx('container-sender')}>
                    <SenderMessage content={message.content} message={message}></SenderMessage>
                </div>
            ) : (
                <div className={cx('container-reveiver')}>
                    <ReceiverMessage content={message.content}></ReceiverMessage>
                </div>
            )}
        </div>
    );
}

export default MessageCard;
