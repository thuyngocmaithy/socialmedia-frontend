import styles from './MessageCard.module.scss'
import className from 'classnames/bind'

const cx = className.bind(styles)
function SenderMessage({ content, chatWith }) {
    return (
        <div className={cx('wrapper-send-message')}>
            <div className={cx('message-content')}>
                <div className={cx('send_message_name')}>{chatWith}</div>
                <div className={cx('send-message-body')}>{content}</div>
            </div>
        </div>
    );
}

export default SenderMessage;