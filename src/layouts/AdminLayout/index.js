import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { HeaderAdmin } from '../../components/Header';
import styles from './AdminLayout.module.scss';
import SideBar from '../../components/SideBar';
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
import { Link } from 'react-router-dom';
import { AccountLoginContext } from '../../context/AccountLoginContext';

import config from '../../config';
import '@fortawesome/react-fontawesome';
import { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { getUserById } from '../../services/userServices';
const cx = classNames.bind(styles);

function AdminLayout({ children, account = false }) {
    const { theme } = useContext(ThemeContext);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [displayMenu, setDisplayMenu] = useState('none');
    const userLogin = useContext(AccountLoginContext);
    const [user, setUser] = useState('');
    console.log(userLogin);

    useEffect(() => {
        getUserById(userLogin).then((user) => { setUser(user) })
            .catch((error) => {
                console.log(error);
            });
    }, [userLogin]);

    // Sử dụng useEffect để theo dõi thay đổi của screenWidth
    useEffect(() => {
        // Hàm xử lý khi screenWidth thay đổi
        function handleResize() {
            setScreenWidth(window.innerWidth);
        }

        // Thêm một sự kiện lắng nghe sự thay đổi của cửa sổ
        window.addEventListener('resize', handleResize);

        // Loại bỏ sự kiện lắng nghe khi component bị hủy
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const SideBarItems = [
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

        // {
        //     title: 'Chỉnh sửa hồ sơ',
        //     to: account === false ? `/admin/${user.username}/edit-profile` : `/${user.username}/edit-profile`,

        //     icon: <UserIcon />,
        // },
        // {
        //     title: 'Quản lý tài khoản',
        //     to: account === false ? `/admin/${user.username}/account-setting` : `/${user.username}/account-setting`,
        //     icon: <AccountSettingIcon />,

        // },
        // {
        //     title: 'Chỉnh sửa mật khẩu',
        //     to: account === false ? `/admin/${user.username}/password` : `/${user.username}/password`,
        //     icon: <KeyIcon />,
        // }
    ];

    const handleOpenMenu = () => {
        setDisplayMenu(prevDisplayMenu => (prevDisplayMenu === 'none' ? 'block' : 'none'));
    };
    const handleOnclickMenuItem = () => {
        setDisplayMenu('none');
    };
    return (
        <div className={cx('wrapper')} style={{ backgroundColor: account ? 'transparent' : '#f0f4fd' }}>
            {account === false && (
                <SideBar
                    className={cx('sidebar', theme === 'dark' ? 'dark' : '')}
                    style={{
                        display: screenWidth <= 768 ? (displayMenu === 'none' ? 'none' : 'block') : 'block',
                        position: screenWidth <= 768 && displayMenu === 'block' && 'absolute',
                        zIndex: screenWidth <= 768 && displayMenu === 'block' && '5',
                        height: screenWidth <= 768 && displayMenu === 'block' && '100%',
                    }}
                    SideBarItems={SideBarItems}
                    onclickMenuItem={handleOnclickMenuItem}
                >

                    <div className={cx('container-title')}>
                        <Link to={config.routes.admin} className={cx('logo-link')}>
                            <LogoPinterest className={cx('icon')} />
                            <h1 className={cx('name')}>DATH</h1>
                        </Link>
                        <button className={cx('menu')} onClick={handleOpenMenu}>
                            <FontAwesomeIcon icon={faBars} />
                        </button>
                    </div>
                </SideBar>
            )}

            <div className={cx('container', theme === 'dark' ? 'dark' : '')}>
                {/* {console.log(theme)} */}
                <HeaderAdmin
                    account={account}
                    className={cx('header', theme === 'dark' ? 'dark' : '')}
                    handleOpenMenu={handleOpenMenu}
                />
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

PropTypes.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AdminLayout;
