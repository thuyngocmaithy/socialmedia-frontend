import classNames from 'classnames/bind';
import styles from './SearchPopup.module.scss';
import Search from '../../Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function SearchPopup({ onClose }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('header')}>
                    <h2 className={cx('title')}>Tìm kiếm</h2>
                    <button className={cx('closeBtn')} onClick={onClose}>
                        <span className={cx('icon')}>
                            <FontAwesomeIcon icon={faXmark} />
                        </span>
                    </button>
                </div>
                <Search className={cx('search-component')} />
            </div>
        </div>
    );
}

export default SearchPopup;
