import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import 'tippy.js/dist/tippy.css';
import { NotificationContext } from '../../../context/NotificationContext';
import { deleted } from '../../../services/notificationService';
import Popper from '../../Popper';
import Cards from './Card';
import styles from './NotificationPopper.module.scss';

const cx = classNames.bind(styles);

function NotificationCard({ time, detail, id, type, not }) {
    const { updatePinCount } = useContext(NotificationContext);
    const contents = [
        { content: <Cards detail={detail.user} title="đã like bài viết của bạn" />, link: '/pins/' + detail.id },
        { content: <Cards detail={detail.user} title="đã bình luận về bài viết của bạn" />, link: '/pins/' + id },
        { content: <Cards detail={detail.user1} title="đã gửi cho bạn lời mời kết bạn" />, link: '/friendship/' + id }
    ];

    // Xóa thông báo
    const handleDelete = (e) => {
        deleted(not.id);
    };
    const renderResult = (attrs) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <Popper className={cx('menu-popper')}>
                <div className={cx('menu-body')}>
                    <button className={cx('button-action')} onClick={handleDelete}>
                        Xóa cập nhật
                    </button>
                </div>
            </Popper>
        </div>
    );
    switch (type) {
        // Tùy thuộc theo loại mà detail sẽ mang theo những biến detail tương ứng
        case 'Like':
            type = contents[0];
            break;
        case 'Comment':
            type = contents[1];
            break;
        case 'Friend':
            type = contents[2];
            break;
        default:
            type = {
                content: (
                    <div className={cx('images')}>
                        {detail.slice(0, 3).map((detail, key) => (
                            <img src={detail.image && `data:image/jpeg;base64,${detail.image}`}
                                key={key} alt="" />
                        ))}
                    </div>
                ),
                title: 'Ghim lấy cảm hứng từ bạn',
                link: '/news_hub/' + id,
            };
    }
    return (
        <div className={cx('wrapper-card')}>
            <Link to={type.link}>
                <div className={cx('info')}>
                    <div>
                        {type.title} <div className={cx('time')}>{time}</div>
                    </div>
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
                <div className={cx('content')}>{type.content}</div>
            </Link>
        </div>
    );
}

NotificationCard.propTypes = {
    id: PropTypes.number,
};
export default NotificationCard;
