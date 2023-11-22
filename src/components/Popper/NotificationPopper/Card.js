import classNames from 'classnames/bind';
import 'tippy.js/dist/tippy.css';
import styles from './NotificationPopper.module.scss';

const cx = classNames.bind(styles);

function Card({ detail, title }) {
    return (<div className={cx('card')}>
        <div className={cx('avatar')}>
            <img src={detail.avatar} alt="" />
        </div>
        <span style={{ margin: '0px 8px' }}><b>{detail.fullname}</b> {title}</span>
    </div >)
}
export default Card;
