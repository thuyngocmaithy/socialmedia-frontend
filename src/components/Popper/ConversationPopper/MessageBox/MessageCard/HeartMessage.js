import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './MessageCard.module.scss';
import className from 'classnames/bind';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const cx = className.bind(styles);
function HeartMessage() {
    return (
        <div className={cx('wrapper-receiver-message')}>
            <div className={cx('message-content')}>
                <div className={cx('message_name')}>You</div>
                <div style={{ textAlign: 'right', minWidth: 'auto' }} className={cx('message_body')}>
                    <FontAwesomeIcon icon={faHeart} />
                </div>
            </div>
        </div>
    );
}

export default HeartMessage;
