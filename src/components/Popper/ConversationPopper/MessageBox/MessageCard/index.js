import styles from './MessageCard.module.scss';
import className from 'classnames/bind';
import TextMessage from './TextMessage';
import HeartMessage from './HeartMessage';
import PinMessage from './PinMessage';
import { useContext } from 'react';
import { AccountLoginContext } from '../../../../../context/AccountLoginContext';

const cx = className.bind(styles);

function MessageCard({ message }) {
    const { userId } = useContext(AccountLoginContext);
    const isPinMessage = message.pin !== null ? true : false;
    const isTextMessage = message.content !== '' ? true : false;
    const messageOwner = message.user.id === userId ? 'my-message' : 'friend-message';
    return (
        <div className={cx('wrapper-message-card')}>
            {
                isTextMessage ?
                    <TextMessage message={message} messageOwner={messageOwner}></TextMessage>
                :
                    isPinMessage ?
                        <PinMessage pin={message.pin} messageOwner={messageOwner}></PinMessage>
                    :
                        <HeartMessage messageOwner={messageOwner}></HeartMessage>
            }
        </div>
    );
}

export default MessageCard;
