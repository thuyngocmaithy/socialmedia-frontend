import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Switch from '@mui/material/Switch';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
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
import { memo, useContext, useEffect, useState } from 'react';
import { AccountLoginContext } from '../../../context/AccountLoginContext';
import { getUserById } from '../../../services/userServices';
import Button from '../../Button';

const cx = classNames.bind(styles);
const label = { inputProps: { 'aria-label': 'Switch demo' } };
// MENU KHI CHƯA ĐĂNG NHẬP
const MENU_ITEMS = [
    {
        switchToggle: <Switch {...label} />,
        title: 'Dark Mode',
    },
];

function HeaderDefault() {
    const navigate = useNavigate();
    const userLogin = useContext(AccountLoginContext);
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [userLoaded, setUserLoaded] = useState(false);

    useEffect(() => {
        // Gửi yêu cầu GET để lấy thông tin người dùng
        if (userLogin !== 0) {
            getUserById(userLogin)
                .then((response) => {
                    setUser(response);
                    console.log(response);
                    setUserLoaded(true);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        // setLoading(false);
    }, [userLogin]);

    const handleMenuChange = (menuItem) => {
        console.log(menuItem);
    };
    // LOGOUT
    function logout() {
        localStorage.removeItem('userLogin');
        navigate('/login');
    }
    // MENU SAU KHI ĐĂNG NHẬP
    const userMenu = [
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
            title: 'Log out',
            handleClickMenuItem: logout,
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
        // loading === false && (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                {/* LOGO */}
                <Link to={config.routes.home} className={cx('logo-link')}>
                    <LogoPinterest className={cx('logo', 'gUZ', 'GjR', 'kVc')} />
                </Link>

                <NavMenu menu={menuNavbarLeft} />

                {/* THANH TÌM KIẾM */}
                <Search />

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
                    {userLoaded && (
                        <Link className={cx('link-avatar')} to={`/${user.username}`}>
                            <Image
                                src={user.avatar && `data:image/jpeg;base64,${user.avatar}`}
                                className={cx('action', 'user-avatar')}
                                alt={user.username}
                            />
                        </Link>
                    )}
                    {userLogin === 0 && (
                        <Button red to={config.routes.login}>
                            Log in
                        </Button>
                    )}

                    <MenuSettingHeader className={cx('action')} items={userMenu} onChange={handleMenuChange}>
                        <button className={cx('more-btn')}>
                            <FontAwesomeIcon icon={faChevronDown} />
                        </button>
                    </MenuSettingHeader>
                </div>
            </div>
        </header>
        // )
    );
}
export default memo(HeaderDefault);
