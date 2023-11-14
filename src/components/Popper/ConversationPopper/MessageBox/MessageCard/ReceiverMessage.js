import styles from './MessageCard.module.scss';
import className from 'classnames/bind';

const cx = className.bind(styles);
function ReceiverMessage({ content }) {
    return (
        <div className={cx('wrapper-receive-message')}>
            <div className={cx('message-content')}>
                <div className={cx('message-name')}>You</div>
                <div className={cx('message-body')}>{content}</div>
            </div>
        </div>
    );
}

export default ReceiverMessage;
