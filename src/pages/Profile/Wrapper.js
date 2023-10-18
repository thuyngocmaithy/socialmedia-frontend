import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import NavMenu from '../../components/NavMenu';
import { memo } from 'react';
import Image from '../../components/Image';
import Button from '../../components/Button';
import { AccountOtherContext } from '../../context/AccountOtherContext';
import { useContext, useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import * as userServices from '../../services/userServices';

const cx = classNames.bind(styles);

function Wrapper({ children, className }) {
    const [info, setInfo] = useState({});
    const [countFriend, setcountFriend] = useState(null);

    const accountOther = useContext(AccountOtherContext);

    const location = useLocation();
    const pathname = location.pathname.split('/')[1];

    useEffect(() => {
        const fetchApi = async () => {
            const resultInfo = await userServices.getUser(pathname);
            const resultFriend = await userServices.getCountFriend(resultInfo.id);
            setInfo(resultInfo);
            setcountFriend(resultFriend);
        };
        fetchApi();
    }, [pathname]);

    const menuPins = [
        {
            title: 'Đã tạo',
            to: '/thuyngocmaithyy/_created',
        },
        {
            title: 'Đã lưu',
            to: '/thuyngocmaithyy/_saved',
        },
    ];

    return (
        <div className={cx('wrapper', className)}>
            {info && countFriend && (
                <>
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
                            <Link to="/thuyngocmaithyy/settings/edit-profile">
                                <Button className={cx('editBtn')} primary>
                                    Chỉnh sửa hồ sơ
                                </Button>
                            </Link>
                        )}
                    </div>
                    <div className={cx('pins-of-user')}>
                        <div className={cx('wrapper-menu-pin')}>
                            <NavMenu className={cx('menu-pin')} menu={menuPins} activeUnderline />
                        </div>
                        {children}
                    </div>
                </>
            )}
        </div>
    );
}

Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

export default memo(Wrapper);
