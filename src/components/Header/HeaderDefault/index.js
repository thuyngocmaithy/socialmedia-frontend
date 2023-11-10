import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Switch from '@mui/material/Switch';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './HeaderDefault.module.scss';
import MenuSettingHeader from '../../Popup/MenuSettingHeader';
import Image from '../../Image';
import Search from '../../Search';
import config from '../../../config';
import { LogoPinterest, MessageIcon, NotificationIcon } from '../../Icons';
import NavMenu from '../../NavMenu';
import Popper from '../../Popper';
import NotificationPopper from '../../Popper/NotificationPopper';
import ConversationPopper from '../../Popper/ConversationPopper';
import { ThemeContext } from '../../../context/ThemeContext';
import { useContext } from 'react';

const cx = classNames.bind(styles);

function HeaderDefault() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    // MENU KHI CHƯA ĐĂNG NHẬP
    const MENU_ITEMS = [
        {
            switchToggle: <Switch inputProps={{ 'aria-label': 'controlled' }} onChange={toggleTheme} />,
            title: 'Dark Mode',
        },
    ];
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

    return (
        <header className={cx('wrapper', theme === 'dark' ? 'dark' : '')}>
            <div className={cx('inner')}>
                {/* LOGO */}
                <Link to={config.routes.home} className={cx('logo-link')}>
                    <LogoPinterest className={cx('logo')} />
                </Link>

                <NavMenu menu={menuNavbarLeft} />

                {/* THANH TÌM KIẾM */}
                <Search />

                {/* ACTIONS */}
                <div className={cx('actions')}>
                    <Popper
                        title={<NotificationIcon className={cx('action', theme === 'dark' ? 'dark' : '')} />}
                        body={<NotificationPopper />}
                        widthBody="maxContent"
                    />
                    <Popper
                        title={<MessageIcon className={cx('action', theme === 'dark' ? 'dark' : '')} />}
                        body={<ConversationPopper />}
                        left="-48px"
                        widthBody="maxContent"
                    />

                    <Link className={cx('link-avatar')} to="/thuyngocmaithyy">
                        <Image src="../../avt.jpg" className={cx('action', 'user-avatar')} alt="Nguyen Van A" />
                    </Link>

                    <MenuSettingHeader className={cx('action')} items={userMenu}>
                        <button className={cx('more-btn', theme === 'dark' ? 'dark' : '')}>
                            <FontAwesomeIcon icon={faChevronDown} />
                        </button>
                    </MenuSettingHeader>
                </div>
            </div>
        </header>
    );
}
export default HeaderDefault;
