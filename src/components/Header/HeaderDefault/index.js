import { faArrowRightFromBracket, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Switch from '@mui/material/Switch';
import classNames from 'classnames/bind';
import { memo, useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import config from '../../../config';
import { AccountLoginContext } from '../../../context/AccountLoginContext';
import { ThemeContext } from '../../../context/ThemeContext';
import { getUserById } from '../../../services/userServices';
import Button from '../../Button';
import DialogConfirmLogin from '../../DialogConfirmLogin';
import { LogoPinterest, MessageIcon, NotificationIcon } from '../../Icons';
import Image from '../../Image';
import NavMenu from '../../NavMenu';
import Popper from '../../Popper';
import ConversationPopper from '../../Popper/ConversationPopper';
import NotificationPopper from '../../Popper/NotificationPopper';
import MenuSettingHeader from '../../Popup/MenuSettingHeader';
import Search from '../../Search';
import styles from './HeaderDefault.module.scss';

const cx = classNames.bind(styles);
const label = { inputProps: { 'aria-label': 'Switch demo' } };

function HeaderDefault() {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { userId } = useContext(AccountLoginContext);
    const [user, setUser] = useState({});
    const [userLoaded, setUserLoaded] = useState(false);
    const [openConfirmLogin, setOpenConfirmLogin] = useState(false);

    // MENU KHI CHƯA ĐĂNG NHẬP
    const MENU_ITEMS = [
        {
            switchToggle: <Switch {...label} onChange={toggleTheme} />,
            title: 'Dark Mode',
        },
    ];
    useEffect(() => {
        // Gửi yêu cầu GET để lấy thông tin người dùng
        if (userId !== 0) {
            getUserById(userId)
                .then((response) => {
                    setUser(response);
                    console.log(response);
                    setUserLoaded(true);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [userId]);

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
            handleClick: userId !== 0 ? null : () => setOpenConfirmLogin(true),
        },
    ];

    return (
        userLoaded && (
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

                        <Link className={cx('link-avatar')} to={`/${user.username}`}>
                            <Image
                                src={user.avatar && `data:image/jpeg;base64,${user.avatar}`}
                                className={cx('action', 'user-avatar', theme === 'dark' ? 'dark' : '')}
                                alt={user.username}
                            />
                        </Link>

                        {userId === 0 && (
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
        )
    );
}
export default memo(HeaderDefault);
