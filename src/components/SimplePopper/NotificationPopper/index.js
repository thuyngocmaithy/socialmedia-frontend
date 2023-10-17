import classNames from 'classnames/bind';
import styles from './NotificationPopper.module.scss';
import NotificationCard from './NotificationCard';
import Search from '../../Search';

const cx = classNames.bind(styles);
const NEWS_HUB = [
    {
        content: 'Ghim lấy cảm hứng từ bạn',
        images: {
            image1: 'https://i.pinimg.com/originals/ef/93/7c/ef937cb4693549464aeb381d711725f7.jpg',
            image2: 'https://i.pinimg.com/originals/f0/bf/99/f0bf9997db4ec8f78c99ecdc2c80756f.jpg',
            image3: 'https://i.pinimg.com/originals/e1/39/09/e1390902b235f26ccbd0db45b512b0c2.jpg',
        },
        time: '5 ngày',
    },
    {
        content: 'Bảng tin nhà của bạn có các Ghim mới',
        images: {
            image1: 'https://i.pinimg.com/originals/ef/93/7c/ef937cb4693549464aeb381d711725f7.jpg',
            image2: 'https://i.pinimg.com/originals/f0/bf/99/f0bf9997db4ec8f78c99ecdc2c80756f.jpg',
            image3: 'https://i.pinimg.com/originals/e1/39/09/e1390902b235f26ccbd0db45b512b0c2.jpg',
        },
        time: '1 tuần',
    },
    {
        content: 'Cân bằng màu, Cảm hứng màu sắc và các sở thích khác để theo dõi',
        images: {
            image1: 'https://i.pinimg.com/originals/ef/93/7c/ef937cb4693549464aeb381d711725f7.jpg',
            image2: 'https://i.pinimg.com/originals/f0/bf/99/f0bf9997db4ec8f78c99ecdc2c80756f.jpg',
            image3: 'https://i.pinimg.com/originals/e1/39/09/e1390902b235f26ccbd0db45b512b0c2.jpg',
        },
        time: '2 tháng',
    },
];
function NotificationPopper() {
    return (
        <div className={cx('wrapper-notification-popper')}>
            <h2 className={cx('title')}>Updates</h2>
            {NEWS_HUB.map((news, index) => {
                return <NotificationCard key={index} content={news.content} time={news.time} images={news.images} />;
            })}
        </div>
    );
}

export default NotificationPopper;
