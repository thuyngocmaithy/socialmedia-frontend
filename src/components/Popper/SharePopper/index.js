import { LinkedIcon, People, SearchIcon } from '../../Icons';
import classNames from 'classnames/bind';
import styles from './SharePopper.module.scss';
import { useContext, useEffect, useState } from 'react';
import * as userServices from '../../../services/userServices';
import Image from '../../Image';
import { AccountLoginContext } from '../../../context/AccountLoginContext';
import { CircularProgress } from '@mui/material';

const cx = classNames.bind(styles);

function SharePopper() {
    const { userId } = useContext(AccountLoginContext);
    const [listUser, setListUser] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchApi = async () => {
            let result = await userServices.getAllUser();
            result = result.filter((item) => item.permission === null && item.id !== parseInt(userId));
            setListUser(result);
            setLoading(false);
        };
        if (userId !== 0) {
            fetchApi();
        } else {
            setLoading(false);
        }
    }, [userId]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>Gửi trên Pinterest </div>
            <div
                className={cx('option-share-container')}
                style={{ justifyContent: listUser.length !== 0 ? '' : 'center' }}
            >
                {listUser.length !== 0 && (
                    <div className={cx('find-option')}>
                        <SearchIcon className={cx('grey-button')} />
                        <span>Tìm kiếm</span>
                    </div>
                )}
                {loading && <CircularProgress />}
                {listUser.map((user, index) => {
                    return (
                        <div className={cx('people-option')} key={index}>
                            <Image
                                src={user.avatar && `data:image/jpeg;base64,${user.avatar}`}
                                className={cx('user-avatar')}
                                alt={user.username}
                            />
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
