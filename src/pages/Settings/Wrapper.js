import classNames from 'classnames/bind';
import styles from './Settings.module.scss';
import SideBar from '../../components/SideBar';
import BottomBar from '../../components/BottomBar';
import { UserIcon, AccountSettingIcon, KeyIcon } from '../../components/Icons';

const cx = classNames.bind(styles);

function Wrapper({ children, bottom = true, admin = false }) {
    const SideBarItems = [
        {
            title: 'Chỉnh sửa hồ sơ',
            to: admin ? '/admin/thuyngocmaithyy/edit-profile' : '/thuyngocmaithyy/edit-profile',
            icon: <UserIcon />,
        },
        {
            title: 'Quản lý tài khoản',
            to: admin ? '/admin/thuyngocmaithyy/account-setting' : '/thuyngocmaithyy/account-setting',
            icon: <AccountSettingIcon />,
        },
        {
            title: 'Đổi mật khẩu',
            to: admin ? '/admin/thuyngocmaithyy/password' : '/thuyngocmaithyy/password',
            icon: <KeyIcon />,
        },
    ];

    return (
        <>
            <div className={cx('wrapper')}>
                <SideBar SideBarItems={SideBarItems} />
                {children}
            </div>
            {bottom && <BottomBar />}
        </>
    );
}
export default Wrapper;
