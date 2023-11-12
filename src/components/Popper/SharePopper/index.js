import { LinkedIcon, People, SearchIcon } from '../../Icons';
import classNames from 'classnames/bind';
import styles from './SharePopper.module.scss';
import { useEffect, useState } from 'react';
import * as userServices from '../../../services/userServices';
import Image from '../../Image';

const cx = classNames.bind(styles);

function SharePopper() {
    const [listUser, setListUser] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            let result = await userServices.getAllUser();
            result = result.filter((item) => item.permission === null);
            setListUser(result);
        };
        fetchApi();
    }, []);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>Gửi trên Pinterest </div>
            <div className={cx('option-share-container')}>
                <div className={cx('find-option')}>
                    <SearchIcon className={cx('grey-button')} />
                    <span>Tìm kiếm</span>
                </div>
                {listUser.map((user, index) => {
                    return (
                        <div className={cx('people-option')} key={index}>
                            <Image src={user.avatar} className={cx('user-avatar')} alt={user.username} />
                            <span>{user.username}</span>
                        </div>
                    );
                })}
                {listUser.map((user, index) => {
                    return (
                        <div className={cx('people-option')} key={index}>
                            <Image src={user.avatar} className={cx('user-avatar')} alt={user.username} />
                            <span>{user.username}</span>
                        </div>
                    );
                })}
                <div className={cx('copy-link-option')}>
                    <LinkedIcon className={cx('grey-button')} />
                    <span>Sao chép liên kết</span>
                </div>
            </div>
        </div>
    );
}

export default SharePopper;
