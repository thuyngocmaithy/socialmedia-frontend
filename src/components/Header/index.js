import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Switch from '@mui/material/Switch';
import classNames from 'classnames/bind';
import { Router, Route, Link, NavLink } from 'react-router-dom';

import styles from './Header.module.scss';
import Menu from '../../components/Popper/Menu';
import Image from '../../components/Image';
import Search from '../../components/Search';
import config from '../../config';
import { LogoPinterest, MessageIcon, NotificationIcon } from '../Icons';
import NavMenu from '../NavMenu';
import SimplePopper from '../SimplePopper';
import NotificationPopper from '../SimplePopper/NotificationPopper';

const cx = classNames.bind(styles);
const label = { inputProps: { 'aria-label': 'Switch demo' } };
// MENU KHI CHƯA ĐĂNG NHẬP
const MENU_ITEMS = [
    {
        switchToggle: <Switch {...label} />,
        title: 'Dark Mode',
    },
];

function Header() {
    const handleMenuChange = (menuItem) => {
        console.log(menuItem);
    };

    // MENU SAU KHI ĐĂNG NHẬP
    const userMenu = [
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
            title: 'Log out',
            to: '/logout',
            separate: true,
        },
    ];

    const menuNavbarLeft = [
        {
            title: 'Home',
            to: config.routes.home,
        },
        {
            title: 'Create',
            to: config.routes.create,
        },
    ];

    const userpage = { title: 'Userpage', to: config.routes.userProfile }
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                {/* LOGO */}
                <Link to={config.routes.home} className={cx('logo-link')}>
                    <LogoPinterest className={cx('gUZ', 'GjR', 'kVc')} />
                </Link>

                <NavMenu menu={menuNavbarLeft} />

                {/* THANH TÌM KIẾM */}
                <Search />

                {/* ACTIONS */}
                <div className={cx('actions')}>
                    <SimplePopper
                        title={<NotificationIcon className={cx('action', 'gUZ', 'ztu', 'U9O', 'kVc')} />}
                        body={<NotificationPopper />}
                        widthBody="maxContent"
                    />
                    <SimplePopper
                        title={<MessageIcon className={cx('action', 'gUZ', 'ztu', 'U9O', 'kVc')} />}
                        body={'Tin nhắn'}
                        widthBody="maxContent"
                    />

                    <Link className={cx('link-avatar')} to={config.routes.userProfile}>
                        <Image src="../avt.jpg" className={cx('action', 'user-avatar')} alt="Nguyen Van A" onClick={userpage} />
                        {/* truy cập trang cá nhân ở đây */}

                    </Link>
                    <Menu className={cx('action')} items={userMenu} onChange={handleMenuChange}>
                        <button className={cx('more-btn')}>
                            <FontAwesomeIcon icon={faChevronDown} />
                        </button>
                    </Menu>
                </div>
            </div>
        </header>
    );
}
export default Header;
