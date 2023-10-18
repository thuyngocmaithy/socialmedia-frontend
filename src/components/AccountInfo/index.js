import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Image from '../../components/Image';
import styles from './AccountInfo.module.scss';

const cx = classNames.bind(styles);

function AccountInfo({ userImage, username }) {
    return (
        username && (
            <div className={cx('info-user')}>
                <Link className={cx('link-avatar')} to="">
                    <Image src={userImage} className={cx('user-avatar')} alt={username} />
                    <span>{username}</span>
                </Link>
            </div>
        )
    );
}

export default AccountInfo;
