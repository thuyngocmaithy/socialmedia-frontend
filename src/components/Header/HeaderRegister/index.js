import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './HeaderRegister.module.scss';
import config from '../../../config';
import { LogoPinterest } from '../../Icons';
import Button from '../../Button';

const cx = classNames.bind(styles);

function HeaderRegister() {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                {/* LOGO */}
                <Link to={config.routes.home} className={cx('logo-link')}>
                    <LogoPinterest className={cx('gUZ', 'GjR', 'kVc')} />
                    <h1 className={cx('name')}>DATH</h1>
                </Link>
                <div className={cx('actions')}>
                    <Button red to={config.routes.login}>
                        Log in
                    </Button>
                    <Button primary className={cx('signUpBtn')} to={config.routes.register}>
                        Sign up
                    </Button>
                </div>
            </div>
        </header>
    );
}
export default HeaderRegister;
