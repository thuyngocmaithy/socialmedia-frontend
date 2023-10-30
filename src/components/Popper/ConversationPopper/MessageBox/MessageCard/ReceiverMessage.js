import styles from './MessageCard.module.scss'
import className from 'classnames/bind'

const cx = className.bind(styles)
function ReceiverMessage({ content }) {
    return (
        <div className={cx('wrapper-receiver-message')}>
            <div className={cx('message-content')}>
                <div className={cx('message_name')}>You</div>
                <div style={{textAlign:'right'}} className={cx('message_body')}>{content}</div>
            </div>
        </div>
    );
}

export default ReceiverMessage;