import classNames from 'classnames/bind';
import EnhancedTable from '../../../components/Table';
import styles from './Post.module.scss';

const cx = classNames.bind(styles);

function Post() {
    const handleSave = (rows) => { };
    const headCells = [
        {
            id: 'id',
            numeric: false,
            disablePadding: true,
            label: 'ID',
        },
        {
            id: 'image_post',
            numeric: true,
            disablePadding: false,
            label: 'Hình ảnh',
        },
        {
            id: 'content_post',
            numeric: true,
            disablePadding: false,
            label: 'Nội dung bài viết',
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
        image_post,
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
            image_post,
            content_post,
            content_report,
            username_approve,
            reject,
            approve,
        };
    }

    const rows = [
        createData(1, 1, 'Cupcake', 67, 4.3, true, false),

    ];
    return (
        <div className={cx('wrapper')}>
            <EnhancedTable headCells={headCells} rows={rows} noedit={true} title="Quản lý báo cáo bài đăng" />
        </div>
    );
}

export default Post;
