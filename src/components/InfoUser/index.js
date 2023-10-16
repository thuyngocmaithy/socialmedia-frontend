import classNames from 'classnames/bind';
import styles from './InfoUser.module.scss';
import Image from '../../components/Image';
import Button from '../../components/Button';
import { AccountOtherContext } from '../../context/AccountOtherContext';
import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as userServices from '../../services/userServices';

const cx = classNames.bind(styles);

function InfoUser() {
    const [info, setInfo] = useState({});
    const [countFriend, setcountFriend] = useState(null);

    const accountOther = useContext(AccountOtherContext);

    const location = useLocation();
    const pathname = location.pathname.split('/')[1];

    useEffect(() => {
        const fetchApi = async () => {
            const resultInfo = await userServices.getUser(pathname);
            const resultFriend = await userServices.getCountFriend(resultInfo.userId);
            setInfo(resultInfo);
            setcountFriend(resultFriend);
        };
        fetchApi();
    }, [pathname]);

    return (
        info &&
        countFriend && (
            <div className={cx('info')}>
                <Image src={info.avatar} className={cx('user-avatar')} alt={info.username} />
                <h1 className={cx('fullname')}>{info.fullname}</h1>
                <p className={cx('username')}>@{info.username}</p>
                <h4 className={cx('count-friend')}>{countFriend} Bạn bè</h4>
                <Button className={cx('shareBtn')} primary>
                    Chia sẻ
                </Button>
                {accountOther ? (
                    <Button className={cx('addFriendBtn')} primary>
                        Kết bạn
                    </Button>
                ) : (
                    <Button className={cx('editBtn')} primary>
                        Chỉnh sửa hồ sơ
                    </Button>
                )}
            </div>
        )
    );
}

export default InfoUser;
