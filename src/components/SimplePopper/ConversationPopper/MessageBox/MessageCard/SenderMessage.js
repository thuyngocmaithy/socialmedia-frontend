import styles from './MessageCard.module.scss'
import className from 'classnames/bind'
import Image from '../../../../Image'

const cx = className.bind(styles)
function SenderMessage({ content, chatWith }) {
    const avatar = "../../" + chatWith.avatar;
    console.log(avatar);
    return (
        <div className={cx('wrapper-send-message')}>
            <Image src={avatar} alt='no' className={cx('sender-avatar')}></Image>
            <div className={cx('message-content')}>
                <div className={cx('send_message_name')}>{chatWith.name}</div>
                <div className={cx('send-message-body')}>{content}</div>
            </div>
        </div>
    );
}

export default SenderMessage;