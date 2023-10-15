import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Switch from '@mui/material/Switch';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Header.module.scss';
import Menu from '../../components/Popper/Menu';
import Image from '../../components/Image';
import Search from '../../components/Search';
import config from '../../config';
import { LogoPinterest, MessageIcon, NotificationIcon } from '../Icons';
import NavMenu from '../NavMenu';
import SimplePopper from '../SimplePopper';
import NotificationPopper from '../SimplePopper/NotificationPopper';
// import Register from '../Register/Register';

const cx = classNames.bind(styles);
const label = { inputProps: { 'aria-label': 'Switch demo' } };
// MENU
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
            // to: <Resiter/>,
            to: config.routes.register,
        },
    ];

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                {/* LOGO */}
                <Link to={config.routes.home} className={cx('logo-link')}>
                    <LogoPinterest className={cx('gUZ', 'GjR', 'kVc')} />
                </Link>

                <NavMenu menu={menuNavbarLeft} />

                
            </div>
        </header>
    );
}
export default Header;
