import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Switch from '@mui/material/Switch';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './HeaderRegister.module.scss';
import config from '../../../config';
import { LogoPinterest } from '../../Icons';
import Button from '../../Button';

const cx = classNames.bind(styles);
const label = { inputProps: { 'aria-label': 'Switch demo' } };
// MENU
const MENU_ITEMS = [
    {
        switchToggle: <Switch {...label} />,
        title: 'Dark Mode',
    },
];

function HeaderRegister() {
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
                    <h1 className={cx('name')}>DATH</h1>
                </Link>
                <div className={cx('actions')}>
                    <Button red>Log in</Button>
                    <Button primary className={cx('signUpBtn')}>
                        Sign up
                    </Button>
                </div>
            </div>
        </header>
    );
}
export default HeaderRegister;
