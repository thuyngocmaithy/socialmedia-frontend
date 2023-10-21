import classNames from 'classnames/bind';
import styles from './SideBar.module.scss';
import {
    UserActiveIcon,
    UserIcon,
    AccountSettingIcon,
    AccountSettingActiveIcon,
    KeyIcon,
    KeyActiveIcon,
} from '../Icons';
import Menu from './Menu';
import MenuItem from './Menu/MenuItem';

const cx = classNames.bind(styles);

function SideBar() {
    const SideBarItems = [
        {
            title: 'Chỉnh sửa hồ sơ',
            to: '/thuyngocmaithyys/edit-profile',
            icon: <UserIcon />,
            activeIcon: <UserActiveIcon />,
        },
        {
            title: 'Quản lý tài khoản',
            to: '/thuyngocmaithyys/account-setting',
            icon: <AccountSettingIcon />,
            activeIcon: <AccountSettingActiveIcon />,
        },
        {
            title: 'Đổi mật khẩu',
            to: '/thuyngocmaithyys/password',
            icon: <KeyIcon />,
            activeIcon: <KeyActiveIcon />,
        },
    ];

    return (
        <aside className={cx('wrapper')}>
            <Menu>
                {SideBarItems.map((item, index) => {
                    return (
                        <MenuItem
                            key={index}
                            title={item.title}
                            to={item.to}
                            icon={item.icon}
                            activeIcon={item.activeIcon}
                        />
                    );
                })}
            </Menu>
        </aside>
    );
}
export default SideBar;
