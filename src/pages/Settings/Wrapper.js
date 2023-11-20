import classNames from 'classnames/bind';
import styles from './Settings.module.scss';
import SideBar from '../../components/SideBar';
import BottomBar from '../../components/BottomBar';
import {
    HomeIcon,
    UserIcon,
    AccountSettingIcon,
    BarsIcon,
    PostIcon,
    LogoPinterest,
    CommentIcon,
    ChartLineIcon,
    PermissionIcon,
    ReportIcon,
    KeyIcon
} from '../../components/Icons';
import { useContext, useEffect, useState } from 'react';
import { AccountLoginContext } from '../../context/AccountLoginContext';
import { getUserById } from '../../services/userServices';

const cx = classNames.bind(styles);

function Wrapper({ children, bottom = true, admin = false, onSave, account = true }) {
    const userLogin = useContext(AccountLoginContext);
    const [user, setUser] = useState({});

    useEffect(() => {
        // Gửi yêu cầu GET để lấy thông tin người dùng
        getUserById(userLogin)
            .then((response) => {
                setUser(response);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [userLogin]);

    const SideBarItems1 = [
        {
            title: 'Chỉnh sửa hồ sơ',
            to: admin ? `/admin/${user.username}/edit-profile` : `/${user.username}/edit-profile`,
            icon: <UserIcon />,
        },
        {
            title: 'Quản lý tài khoản',
            to: admin ? `/admin/${user.username}/account-setting` : `/${user.username}/account-setting`,
            icon: <AccountSettingIcon />,
        },
        {
            title: 'Đổi mật khẩu',
            to: admin ? `/admin/${user.username}/password` : `/${user.username}/password`,
            icon: <KeyIcon />,
        },
    ];

    const SideBarItems2 = [
        {
            title: 'Dashboard',
            to: '/admin/dashboard',
            icon: <HomeIcon />,
        },

        {
            title: 'Quản lý loại bài đăng',
            to: '/admin/type-post',
            icon: <BarsIcon />,
        },
        {
            title: 'Quản lý báo cáo',
            to: '/admin/content-report',
            icon: <ReportIcon />,
        },
        {
            title: 'Quản lý bài đăng',
            to: '/admin/post',
            icon: <PostIcon />,
        },
        {
            title: 'Quản lý bình luận',
            to: '/admin/comment',
            icon: <CommentIcon />,
        },
        {
            title: 'Thống kê',
            to: '/admin/statistic',
            icon: <ChartLineIcon />,
        },
        {
            title: 'Quản lý người dùng',
            to: '/admin/user',
            icon: <UserIcon />,
        },
        {
            title: 'Quản lý chức năng',
            to: '/admin/function',
            icon: <AccountSettingIcon />,
        },
        {
            title: 'Cài đặt quyền',
            to: '/admin/permission',
            icon: <PermissionIcon />,
        },

        {
            title: 'Chỉnh sửa hồ sơ',
            to: `/admin/${user.username}/edit-profile`,

            icon: <UserIcon />,
        },
        {
            title: 'Quản lý tài khoản',
            to: `/admin/${user.username}/account-setting`,
            icon: <AccountSettingIcon />,

        },
        {
            title: 'Chỉnh sửa mật khẩu',
            to: `/admin/${user.username}/password`,
            icon: <KeyIcon />,
        }
    ];
    return (
        <>
            <div className={cx('wrapper')}>
                {(admin === false && account === true) && <SideBar SideBarItems={SideBarItems1} />}
                {(admin === true || account === false) && <SideBar SideBarItems={SideBarItems2} />}

                {children}
            </div>
            {bottom && <BottomBar onSave={onSave} />}
        </>
    );
}
export default Wrapper;