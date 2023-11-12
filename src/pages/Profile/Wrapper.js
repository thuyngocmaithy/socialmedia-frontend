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
import * as friendshipServices from '../../services/friendshipServices';
import ListFriend from '../../components/Popup/ListFriend';

const cx = classNames.bind(styles);

function Wrapper({ children, className }) {
    const [info, setInfo] = useState({});
    const [countFriend, setcountFriend] = useState(null);
    const [renderFriend, setRenderFriend] = useState(false);

    const accountOther = useContext(AccountOtherContext);

    const location = useLocation();
    const pathname = location.pathname.split('/')[1];

    useEffect(() => {
        const fetchApi = async () => {
            const resultInfo = await userServices.getUserByUsername(pathname);
            const resultFriend = await friendshipServices.getCountFriend(resultInfo.id);
            setInfo(resultInfo);
            setcountFriend(resultFriend);
        };
        fetchApi();
    }, [pathname]);

    const handleRenderFriend = () => {
        setRenderFriend(true);
    };

    const handleClose = () => {
        setRenderFriend(false);
    };

    const menuPins = [
        {
            title: 'Đã tạo',
            to: `/${info.username}/_created`,
        },
        {
            title: 'Đã lưu',
            to: `/${info.username}/_saved`,
        },
    ];

    return (
        <div className={cx('wrapper', className)}>
            {Object.keys(info).length !== 0 && countFriend !== null && (
                <>
                    <div className={cx('info')}>
                        <Image
                            src={info.avatar && `data:image/jpeg;base64,${info.avatar}`}
                            className={cx('user-avatar')}
                            alt={info.username}
                        />
                        <h1 className={cx('fullname')}>{info.fullname}</h1>
                        <p className={cx('username')}>@{info.username}</p>
                        <h4 className={cx('count-friend')} onClick={() => handleRenderFriend()}>
                            {countFriend} Bạn bè
                        </h4>
                        {renderFriend && <ListFriend onClose={handleClose} idUser={info.id} />}
                        <Button className={cx('shareBtn')} primary>
                            Chia sẻ
                        </Button>
                        {accountOther ? (
                            <Button className={cx('addFriendBtn')} primary>
                                Kết bạn
                            </Button>
                        ) : (
                            <Link to={`/${info.username}/edit-profile`}>
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
