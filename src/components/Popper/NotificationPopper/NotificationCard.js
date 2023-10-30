import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import classNames from 'classnames/bind';
import styles from './NotificationPopper.module.scss';
import { Wrapper as PopperWrapper } from '../../Popup';

const cx = classNames.bind(styles);

function NotificationCard({ content, time, images }) {
    const renderResult = (attrs) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx('menu-popper')}>
                <div className={cx('menu-body')}>
                    <button className={cx('button-action')}>Xóa cập nhật</button>
                </div>
            </PopperWrapper>
        </div>
    );
    return (
        <div className={cx('wrapper-card')}>
            <div className={cx('info')}>
                <p className={cx('content')}>
                    {content} <span className={cx('time')}>{time}</span>
                </p>
                <Tippy
                    interactive
                    delay={[0, 200]}
                    offset={[0, 5]}
                    placement="bottom-end"
                    render={renderResult}
                    animation={false}
                >
                    <button className={cx('action')}>
                        <FontAwesomeIcon icon={faEllipsis} />
                    </button>
                </Tippy>
            </div>
            <div className={cx('images')}>
                <img src={images.image1} alt="" />
                <img src={images.image2} alt="" />
                <img src={images.image3} alt="" />
            </div>
        </div>
    );
}

export default NotificationCard;
