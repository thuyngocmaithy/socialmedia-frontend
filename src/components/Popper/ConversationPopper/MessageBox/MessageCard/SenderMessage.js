import styles from './MessageCard.module.scss';
import className from 'classnames/bind';
import Image from '../../../../Image';

const cx = className.bind(styles);
function SenderMessage({ content, message }) {
    const avatar = message.user.avatar;
    // console.log(message.user);
    return (
        <div className={cx('wrapper-sender-message')}>
            <Image src={avatar && `data:image/jpeg;base64,${avatar}`} alt="no" className={cx('sender-avatar')}></Image>
            <div className={cx('message-content')}>
                <div className={cx('message-name')}>{message.user.fullname}</div>
                <div className={cx('message-body')}>{content}</div>
            </div>
        </div>
    );
}

export default SenderMessage;
