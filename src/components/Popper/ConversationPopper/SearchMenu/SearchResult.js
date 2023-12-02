import classNames from 'classnames/bind';
import styles from './SearchMenu.module.scss';
import Image from '../../../Image';

const cx = classNames.bind(styles)
function SearchResult({handleSelect, user}) {
    return ( 
        <div className={cx('search-card-container')} onClick={() => handleSelect(user.id)}>
            <Image src={user.avatar && `data:image/jpeg;base64,${user.avatar}`} className={cx('user-avatar')}></Image>
            <div className={cx('user-names-container')}>
                <h4 className={cx('user-fullname')}>{user.fullname}</h4>
                <span className={cx('user-username')}>{user.username}</span>
            </div>
        </div>
    );
}

export default SearchResult;