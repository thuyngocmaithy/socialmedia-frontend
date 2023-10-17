<<<<<<< HEAD
import styles from './MessageCard.module.scss'
import className from 'classnames/bind'

const cx = className.bind(styles)
function ReceiverMessage({content}) {
    return (
        <div className={cx('wrapper-receive-message')}>
            <div className={cx('message-content')}>
                <div className={cx('send_message_name')}>You</div>
                <div className={cx('send-message-body')}>{content}</div>
            </div>
        </div>
    );
}

=======
import styles from './MessageCard.module.scss'
import className from 'classnames/bind'

const cx = className.bind(styles)
function ReceiverMessage({ content }) {
    return (
        <div className={cx('wrapper-receive-message')}>
            <div className={cx('message-content')}>
                <div className={cx('send_message_name')}>You</div>
                <div className={cx('send-message-body')}>{content}</div>
            </div>
        </div>
    );
}

>>>>>>> 02e458a4b0c2087a9f0f05c36c23889fa7d6c641
export default ReceiverMessage;