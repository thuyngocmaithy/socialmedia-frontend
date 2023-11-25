import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './MessageCard.module.scss';
import className from 'classnames/bind';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const cx = className.bind(styles);
function HeartMessage({messageOwner}) {
    return (
        <div className={cx(messageOwner)}>
            <div className={cx('message-content')}>
                <div className={cx('message-name')}>You</div>
                <div style={{ textAlign: 'right', minWidth: 'auto' }} className={cx('heart-message-body')}>
                    <FontAwesomeIcon className={cx('heart-icon')} icon={faHeart} />
                </div>
            </div>
        </div>
    );
}

export default HeartMessage;
