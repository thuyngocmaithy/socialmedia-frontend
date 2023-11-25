import classNames from 'classnames/bind';
import styles from './SearchMenu.module.scss';
import Image from '../../../Image';
import Tippy from '@tippyjs/react';

const cx = classNames.bind(styles)
function SearchResult({user}) {
    return ( 
        <Tippy delay={[0, 100]} content={user.fullname} placement='bottom-end' arrow={false} followCursor={'default'}>
            <div className={cx('search-card-container')}>
                <Image src={user.avatar && `data:image/jpeg;base64,${user.avatar}`} className={cx('user-avatar')}></Image>
                <div className={cx('user-names-container')}>
                    <h4 className={cx('user-fullname')}>{user.fullname}</h4>
                    <span className={cx('user-username')}>{user.username}</span>
                </div>
            </div>
        </Tippy>
    );
}

export default SearchResult;