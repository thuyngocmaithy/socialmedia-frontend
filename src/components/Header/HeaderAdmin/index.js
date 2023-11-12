import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faArrowRightFromBracket, faBars } from '@fortawesome/free-solid-svg-icons';
import Switch from '@mui/material/Switch';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './HeaderAdmin.module.scss';
import MenuSettingHeader from '../../Popup/MenuSettingHeader';
import Image from '../../Image';
import { MessageIcon, NotificationIcon, LogoPinterest } from '../../Icons';
import Popper from '../../Popper';
import NotificationPopper from '../../Popper/NotificationPopper';
import ConversationPopper from '../../Popper/ConversationPopper';
import config from '../../../config';

const cx = classNames.bind(styles);
const label = { inputProps: { 'aria-label': 'Switch demo' } };
// MENU KHI CHƯA ĐĂNG NHẬP
const MENU_ITEMS = [
    {
        switchToggle: <Switch {...label} />,
        title: 'Dark Mode',
    },
];

function HeaderAdmin({ className, account, handleOpenMenu }) {
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

    return (
        <header className={cx(className, 'wrapper')}>
            <div className={cx('inner')}>
                {/* LEFT MENU */}
                {account ? (
                    <div className={cx('container-title')}>
                        <Link to={config.routes.admin} className={cx('logo-link')}>
                            <LogoPinterest className={cx('icon')} />
                            <h1 className={cx('name')}>DATH</h1>
                        </Link>
                    </div>
                ) : (
                    <button className={cx('menu')} onClick={handleOpenMenu}>
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                )}

                {/* ACTIONS */}
                <div className={cx('actions')}>
                    <Popper
                        title={<NotificationIcon className={cx('action', 'gUZ', 'ztu', 'U9O', 'kVc')} />}
                        body={<NotificationPopper />}
                        widthBody="maxContent"
                    />
                    <Popper
                        title={<MessageIcon className={cx('action', 'gUZ', 'ztu', 'U9O', 'kVc')} />}
                        body={<ConversationPopper />}
                        left="-48px"
                        widthBody="maxContent"
                    />

                    <Link className={cx('link-avatar')} to="/admin/thuyngocmaithyy/edit-profile">
                        <Image src="../../avt.jpg" className={cx('action', 'user-avatar')} alt="Nguyen Van A" />
                    </Link>

                    <MenuSettingHeader className={cx('action')} items={userMenu} onChange={handleMenuChange}>
                        <button className={cx('more-btn')}>
                            <FontAwesomeIcon icon={faChevronDown} />
                        </button>
                    </MenuSettingHeader>
                </div>
            </div>
        </header>
    );
}
export default HeaderAdmin;
