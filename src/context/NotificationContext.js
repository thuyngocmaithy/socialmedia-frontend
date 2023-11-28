import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { getCommentByNotification } from '../services/commentServices';
import { getFriendByNotification } from '../services/friendshipServices';
import { getLikeByNotification } from '../services/likeServices';
import { getAllNotifications, getNewsHub, initNotifications } from '../services/notificationService';
import { AccountLoginContext } from './AccountLoginContext';
import { StompContext } from './StompContext';
const NotificationContext = createContext([]);

function NotificationProvider({ children }) {
    const { userId } = useContext(AccountLoginContext);
    const { stompClient } = useContext(StompContext);
    const nots = useRef([]);
    const [res, setRes] = useState([]);
    const notType = { pin: 'Pin', like: 'Like', comment: 'Comment', friend: 'Friend' };
    let pinCount = parseInt(localStorage.getItem('pinCount') || 0);

    useEffect(() => {
        const fetch1 = async () => {
            stompClient.connect({}, () => {
                // console.log(pinCount);
                if (pinCount === 4) {
                    setTimeout(() => {
                        const data = { notificationType: notType.pin };
                        initNotifications(data, userId);
                    }, 5000);
                    localStorage.setItem('pinCount', 0);
                }
                stompClient.subscribe(`/room/update-nots/${userId}`, (notification) => {
                    nots.current = JSON.parse(notification.body);
                });
            });
        };
        // Load bảng thông báo
        const fetch2 = async () => {
            nots.current = await getAllNotifications(userId);
            let result = [];
            const promise = nots.current.map(async (not, index) => {
                let related = [];
                if (not.notificationType === notType.friend) {
                    related = await getFriendByNotification(not.id);
                } else if (not.notificationType === notType.like) {
                    related = await getLikeByNotification(not.id);
                } else if (not.notificationType === notType.comment) {
                    related = await getCommentByNotification(not.id);
                } else {
                    related = await getNewsHub(not.id);
                }
                return (result = [...result, { not, related }]);
            });
            Promise.all(promise).then((e) => {
                setRes(result);
            });
        };
        if (userId !== 0) {
            fetch1().then(() => {
                fetch2();
            });
        }
    }, [pinCount, userId]);

    return <NotificationContext.Provider value={res ? res : []}>{children}</NotificationContext.Provider>;
}

export { NotificationContext, NotificationProvider };
