import styles from './MessageCard.module.scss';
import className from 'classnames/bind';
import Image from '../../../../Image';

const cx = className.bind(styles);
function TextMessage({ message, messageOwner }) {
    const avatar = message.user.avatar;
    const content = message.content;
    const haveImage = messageOwner === 'my-message' ? false : true;
    return (
        <div className={cx(messageOwner)}>
            {
                haveImage ?
                    <Image src={avatar && `data:image/jpeg;base64,${avatar}`} alt="no" className={cx('sender-avatar')}></Image>
                : ''
            }
            <div className={cx('message-content')}>
                {
                    haveImage ?
                        <div className={cx('message-name')}>{message.user.fullname}</div>
                    :
                        <div className={cx('message-name')}>You</div>
                }
                <div className={cx('message-body')}>{content}</div>
            </div>
        </div>
    );
}

export default TextMessage;
