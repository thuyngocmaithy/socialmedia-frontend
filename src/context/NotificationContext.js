import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { getCommentByNotification } from '../services/commentServices';
import { getFriendByNotification } from '../services/friendshipServices';
import { getLikeByNotification } from '../services/likeServices';
import { getAllNotifications, getNewsHub } from '../services/notificationService';
import { AccountLoginContext } from './AccountLoginContext';
import { StompContext } from './StompContext';
const NotificationContext = createContext({});

function NotificationProvider({ children }) {
    const UserID = useContext(AccountLoginContext);
    const stompClient = useContext(StompContext);
    const [res, setRes] = useState([]);
    const nots = useRef([]);
    const [pinCount, setPinCount] = useState([]);
    const notType = { pin: 'Pin', like: 'Like', comment: 'Comment', friend: 'Friend' };

    const updatePinCount = (value) => {
        setPinCount(value);
    }
    useEffect(() => {
        const fetch1 = async () => {
            if (pinCount.length === 4) {
                try {
                    setTimeout(() => {
                        const data = JSON.stringify({ notifications: { notificationType: 'Pin' }, listPins: pinCount });
                        stompClient.send(`/app/sendNot/${UserID}`, {}, data);
                    }, 5000);

                    stompClient.subscribe(`/room/updateNots/${UserID}`, (result) => {
                        nots.current = [...nots.current, (JSON.parse(result.body).notifications)];
                        console.log(result.body);
                    });
                } catch (error) {
                    console.log('Error in stomp: ', error);
                }
                localStorage.setItem('pinCount', []);
            }

        }
        // Load bảng thông báo
        const fetch2 = async () => {
            nots.current = await getAllNotifications(UserID);
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
        fetch1().then(() => {
            fetch2();
        });
    }, [UserID, notType.comment, notType.friend, notType.like, pinCount, stompClient])
    return <NotificationContext.Provider value={{ updatePinCount, res }}> {children} </NotificationContext.Provider>;
}
export { NotificationContext, NotificationProvider };
