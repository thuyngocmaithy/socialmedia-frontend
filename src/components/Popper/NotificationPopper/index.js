import classNames from 'classnames/bind';
import { useContext, useEffect, useState } from 'react';
import { AccountLoginContext } from '../../../context/AccountLoginContext';
import { NotificationContext } from '../../../context/NotificationContext';
import { StompContext } from '../../../context/StompContext';
import getTimeCreated from '../../../utils/getTimeCreated';
import NotificationCard from './NotificationCard';
import styles from './NotificationPopper.module.scss';
const cx = classNames.bind(styles);

function NotificationPopper() {
    const notificationList = useContext(NotificationContext);
    const UserID = useContext(AccountLoginContext);
    const stompClient = useContext(StompContext);
    const [notifications, setNotifications] = useState([]);
    // userId lấy từ session
    useEffect(() => {
        const fetch = async () => {
            let result = [];
            (notificationList ? notificationList : []).map((e, index) => {
                return result = [...result, e];
            })
            return result;
        }
        fetch().then(e => {
            setNotifications(e);
        })
    }, [UserID, notificationList, stompClient])

    return (
        <div className={cx('wrapper-notification-popper')} >
            <h2 className={cx('title')} > Updates </h2>
            {notifications.map((notification, key) => {
                return (
                    <NotificationCard
                        key={notification.not.id}
                        id={notification.not.id}
                        type={notification.not.notificationType}
                        time={getTimeCreated(notification.not.notificationAt)}
                        detail={notification.related}
                        not={notification.not}
                    />)
            })}
        </div>);
}

export default NotificationPopper;
