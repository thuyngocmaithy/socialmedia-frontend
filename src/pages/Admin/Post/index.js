import EnhancedTable from '../../../components/Table';
import classNames from 'classnames/bind';
import styles from './Post.module.scss';
import { useState, useEffect } from 'react';
import * as report_PostServices from '../../../services/ReportPostServices';
import Image from '../../../components/Image';
const cx = classNames.bind(styles);

function Post() {
    const [listPost, setListPost] = useState([]);
    const [approveState, setApproveState] = useState(true);
    const headCells = [
        {
            id: 'id',
            numeric: false,
            disablePadding: true,
            label: 'ID',
        },
        {
            id: 'image_post',
            numeric: false,
            disablePadding: false,
            width: '100px',
            height : '100px',
            label: 'Hình ảnh',
            type: 'image'
        },
        {
            id:'title_post',
            numeric : false,
            disablePadding:true,
            label : 'Chủ đề',
        },
        // {
        //     id: 'content_post',
        //     numeric: true,
        //     disablePadding: false,
        //     label: 'Nội dung bài viết',
        // },

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
    // const base64ToImageUrl = (base64) => `data:image/png;base64,${base64}`;


    useEffect(() => {
        const fetchApi = async () => {
            try {
                const result = await report_PostServices.getPin();
    
                // Sử dụng hàm mới để chuyển đổi base64 thành URL hình ảnh
                const base64ToImageUrl = (base64) => `data:image/png;base64,${base64}`;
                
                setListPost(
                    result.map((row) => ({
                        id: row[0],
                        image_post: <Image src={base64ToImageUrl(row[2]) } height='100px' width='100px'/>, // Chuyển đổi base64 thành URL hình ảnh
                        title_post: row[1],
                        content_report: row[3],
                        username_approve: row[4],
                        approve: row[5],
                        reject: row[6],
                    }))
                );
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        fetchApi();
    }, []);
    
    const handleApproval = async (id, approveState) => {
        try {
            const base64ToImageUrl = (base64) => `data:image/png;base64,${base64}`;

            await report_PostServices.changeApprove(id, approveState);
            // Cập nhật lại danh sách sau khi thay đổi trạng thái
            const result = await report_PostServices.getPin();
            setListPost(
                result.map((row) => ({
                    id: row[0],
                    image_post: <Image src={base64ToImageUrl(row[2]) } height='100px' width='100px'/>, // Chuyển đổi base64 thành URL hình ảnh
                    title_post: row[1],
                    content_report: row[3],
                    username_approve: row[4],
                    approve: row[5],
                    reject: row[6],
                })),
            );
        } catch (error) {
            console.error('Error updating approval status:', error);
        }
    };

     return (
        <div className={cx('wrapper')}>
            <EnhancedTable headCells={headCells} rows={listPost} noedit={true}  title="Quản lý báo cáo bài đăng" handleSelectFunction={handleApproval} />
        </div>
    );
}

export default Post;
