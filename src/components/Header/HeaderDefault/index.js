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
import { ThemeContext } from '../../../context/ThemeContext';
import { MessageContext } from '../../../context/MessageContext';
import DialogConfirmLogin from '../../DialogConfirmLogin';

const cx = classNames.bind(styles);
const label = { inputProps: { 'aria-label': 'Switch demo' } };

function HeaderDefault() {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useContext(ThemeContext);
    const userLogin = useContext(AccountLoginContext);
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [userLoaded, setUserLoaded] = useState(false);
    const [openConfirmLogin, setOpenConfirmLogin] = useState(false);
    const messages = useContext(MessageContext);
    let newMessageCount = messages.length;

    // MENU KHI CHƯA ĐĂNG NHẬP
    const MENU_ITEMS = [
        {
            switchToggle: <Switch {...label} onChange={toggleTheme} />,
            title: 'Dark Mode',
        },
    ];
    useEffect(() => {
        // Gửi yêu cầu GET để lấy thông tin người dùng
        if (userLogin !== 0) {
            getUserById(userLogin)
                .then((response) => {
                    setUser(response);
                    // console.log(response);
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
            handleClick: userLogin !== 0 ? null : () => setOpenConfirmLogin(true),
        },
    ];

    return (
        // loading === false && (
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
                    {userLoaded && (
                        <>
                            <Popper
                                title={<NotificationIcon className={cx('action', theme === 'dark' ? 'dark' : '')} />}
                                body={<NotificationPopper />}
                                widthBody="maxContent"
                            />
                            <Popper
                                title={<MessageIcon newMessageCount={newMessageCount} className={cx('action', theme === 'dark' ? 'dark' : '')} />}
                                body={<ConversationPopper />}
                                left="-48px"
                                widthBody="maxContent"
                            />

                            <Link className={cx('link-avatar')} to={`/${user.username}`}>
                                <Image
                                    src={user.avatar && `data:image/jpeg;base64,${user.avatar}`}
                                    className={cx('action', 'user-avatar', theme === 'dark' ? 'dark' : '')}
                                    alt={user.username}
                                />
                            </Link>
                        </>
                    )}
                    {userLogin === 0 && (
                        <Button red to={config.routes.login}>
                            Log in
                        </Button>
                    )}

                    <MenuSettingHeader className={cx('action')} items={userMenu} onChange={handleMenuChange}>
                        <button className={cx('more-btn', theme === 'dark' ? 'dark' : '')}>
                            <FontAwesomeIcon icon={faChevronDown} />
                        </button>
                    </MenuSettingHeader>
                </div>
            </div>
            {openConfirmLogin && <DialogConfirmLogin open={openConfirmLogin} setOpen={setOpenConfirmLogin} />}
        </header>
        // )
    );
}
export default memo(HeaderDefault);
