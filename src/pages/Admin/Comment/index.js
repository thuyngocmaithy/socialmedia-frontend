import EnhancedTable from '../../../components/Table';
import classNames from 'classnames/bind';
import styles from './Comment.module.scss';

const cx = classNames.bind(styles);

function Comment() {
    const headCells = [
        {
            id: 'id',
            numeric: false,
            disablePadding: true,
            label: 'ID',
        },
        // {
        //     id: 'username_reporting',
        //     numeric: true,
        //     disablePadding: false,
        //     label: 'Người dùng báo cáo',
        // },
        // {
        //     id: 'username_reported',
        //     numeric: true,
        //     disablePadding: false,
        //     label: 'Người dùng bị báo cáo',
        // },
        {
            id: 'content_post',
            numeric: true,
            disablePadding: false,
            label: 'Nội dung bình luận',
        },
        {
            id: 'content_report',
            numeric: true,
            disablePadding: false,
            label: 'Nội dung báo cáo',
        },
        {
            id: 'username_approve',
            numeric: true,
            disablePadding: false,
            label: 'Tài khoản phê duyệt',
        },
        {
            id: 'reject',
            numeric: true,
            disablePadding: false,
            label: 'Không duyệt',
        },
        {
            id: 'approve',
            numeric: true,
            disablePadding: false,
            label: 'Duyệt',
        },
    ];
    function createData(
        id,
        // username_reporting,
        // username_reported,
        content_post,
        content_report,
        username_approve,
        reject,
        approve,
    ) {
        return {
            id,
            // username_reporting,
            // username_reported,
            content_post,
            content_report,
            username_approve,
            reject,
            approve,
        };
    }

    const rows = [
        createData(1, 'Cupcake', 67, 4.3, true, false),
        createData(2, 'Donut', 51, 4.9, true, false),
        createData(3, 'Eclair', 24, 6.0, true, false),
        createData(4, 'Frozen yoghurt', 24, 4.0, true, false),
        createData(5, 'Gingerbread', 49, 3.9, true, false),
        createData(6, 'Honeycomb', 87, 6.5, true, false),
        createData(7, 'Ice cream sandwich', 37, 4.3, true, false),
        createData(8, 'Jelly Bean', 94, 0.0, true, false),
        createData(9, 'KitKat', 65, 7.0, true, false),
        createData(10, 'Lollipop', 98, 0.0, true, false),
        createData(11, 'Marshmallow', 81, 2.0, true, false),
        createData(12, 'Nougat', 9, 37.0, true, false),
        createData(13, 'Oreo', 63, 4.0, true, false),
    ];
    return (
        <div className={cx('wrapper')}>
            <EnhancedTable report={true} headCells={headCells} rows={rows} title="Quản lý báo cáo bình luận" />
        </div>
    );
}

export default Comment;
