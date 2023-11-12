import classNames from 'classnames/bind';
import styles from './Statistic.module.scss';
import ItemStatistic from '../../../components/ItemStatistic';

const cx = classNames.bind(styles);

function Statistic() {
    const DATA_STATISTIC = [
        {
            id: '1',
            title: 'Người dùng đăng ký',
            detail: [
                { title: 'Hôm nay', data: '10' },
                { title: 'Tuần này', data: '20' },
                { title: 'Tháng này', data: '30' },
                { title: 'Tổng cộng', data: '60' },
            ],
        },
        {
            id: '2',
            title: 'Số bài đăng',
            detail: [
                { title: 'Hôm nay', data: '10' },
                { title: 'Tuần này', data: '20' },
                { title: 'Tháng này', data: '30' },
                { title: 'Tổng cộng', data: '60' },
            ],
        },
        {
            id: '3',
            title: 'Số lượt yêu thích',
            detail: [
                { title: 'Hôm nay', data: '10' },
                { title: 'Tuần này', data: '20' },
                { title: 'Tháng này', data: '30' },
                { title: 'Tổng cộng', data: '60' },
            ],
        },
        {
            id: '4',
            title: 'Số lượt bình luận',
            detail: [
                { title: 'Hôm nay', data: '10' },
                { title: 'Tuần này', data: '20' },
                { title: 'Tháng này', data: '30' },
                { title: 'Tổng cộng', data: '60' },
            ],
        },
    ];
    const DATA_REPORT = [
        {
            id: '1',
            title: 'Báo cáo (Bài đăng và bình luận)',
            detail: [
                { title: 'Tổng số báo cáo', data: '10' },
                { title: 'Báo cáo đang chờ xử lý', data: '20' },
                { title: 'Báo cáo đã duyệt', data: '30' },
            ],
        },
        {
            id: '2',
            title: 'Báo cáo bài đăng',
            detail: [
                { title: 'Tổng số báo cáo', data: '10' },
                { title: 'Báo cáo đang chờ xử lý', data: '20' },
                { title: 'Báo cáo đã duyệt', data: '30' },
            ],
        },
        {
            id: '3',
            title: 'Báo cáo bình luận',
            detail: [
                { title: 'Tổng số báo cáo', data: '10' },
                { title: 'Báo cáo đang chờ xử lý', data: '20' },
                { title: 'Báo cáo đã duyệt', data: '30' },
            ],
        },
    ];
    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('title')}>Số liệu thống kê</h3>
            <ItemStatistic data={DATA_STATISTIC} line={true} />
            <ItemStatistic data={DATA_REPORT} line={false} />
        </div>
    );
}

export default Statistic;
