import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import classNames from 'classnames/bind';
import styles from './Pin.module.scss';
import { ShareIcon, DownloadIcon, AccessIcon } from '../Icons';
import SimplePopper from '../SimplePopper';
import { Link } from 'react-router-dom';
import Image from '../../components/Image';

const cx = classNames.bind(styles);

function Pin({ image, linkImage, title, userImage, username }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container-image')}>
                <img className={cx('image')} src={image} alt="" />
                <div className={cx('option-top')}>
                    <button className={cx('saveBtn')}>Lưu</button>
                </div>
                <div className={cx('option-bottom')}>
                    {linkImage && (
                        <button className={cx('btn-text')}>
                            <AccessIcon className={cx('action', 'gUZ', 'R19', 'U9O', 'kVc')} />
                            <span className={cx('link-image')}>{linkImage}</span>
                        </button>
                    )}
                    <Tippy delay={[0, 100]} content="Chia sẻ" placement="bottom">
                        <button className={cx('btn')}>
                            <ShareIcon className={cx('action', 'gUZ', 'R19', 'U9O', 'kVc')} />
                        </button>
                    </Tippy>
                    <Tippy delay={[0, 100]} content="Lưu ảnh" placement="bottom">
                        <button className={cx('btn-end')}>
                            <DownloadIcon className={cx('action', 'gUZ', 'R19', 'U9O', 'kVc')} />
                        </button>
                    </Tippy>
                </div>
            </div>
            <div className={cx('info-pin')}>
                {title && <h3>{title}</h3>}
                {username && (
                    <div className={cx('info-user')}>
                        <Link className={cx('link-avatar')} to="">
                            <Image src={userImage} className={cx('user-avatar')} alt={username} />
                            <span>{username}</span>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Pin;
