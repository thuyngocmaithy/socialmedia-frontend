import classNames from 'classnames/bind';
import styles from './Card.module.scss';

const cx = classNames.bind(styles);

function Card({ icon, iconDescription, title, data, percent }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container-title')}>
                <span className={cx('container-icon')}>{icon}</span>
                <span className={cx('title')}>{title}</span>
            </div>
            <h2 className={cx('content')}>{data}</h2>
            <div className={cx('description')}>
                <span className={cx('container-icon-description')}>{iconDescription}</span>
                <span className={cx('data')}>{percent}%</span>
                <span className={cx('detail')}> vs last 7 days</span>
            </div>
        </div>
    );
}

export default Card;
