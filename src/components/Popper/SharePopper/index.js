import { LinkedIcon, SearchIcon } from '../../Icons';
import classNames from 'classnames/bind';
import styles from './SharePopper.module.scss';
import { useContext, useEffect, useState } from 'react';
import * as participantServices from '../../../services/participantServices';
import Image from '../../Image';
import { AccountLoginContext } from '../../../context/AccountLoginContext';
import { CircularProgress } from '@mui/material';
import { StompContext } from '../../../context/StompContext';
import { ConversationContext } from '../../../context/ConversationContext';

const cx = classNames.bind(styles);

function SharePopper({ pin_id }) {
    const { userId } = useContext(AccountLoginContext);
    const [listUser, setListUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const stompClient = useContext(StompContext);
    const {conversationList} = useContext(ConversationContext);

    useEffect(() => {
        const fetchApi = async () => {
            let result = await participantServices.getFriendChattingWith(userId);
            result = result.map((item) => {return item.user});
            // result = result.filter((item) => item.permission === null && item.id !== parseInt(userId));
            setListUser(result);
            setLoading(false);
        };
        let stompList = [];
        const loginToChat = () => {
            const conv = conversationList.current.map(e => e.conversation);
            conv.forEach((e) => {
                let stompObject = stompClient.subscribe(
                    `/app/login/${e.id}`,
                    (response) => {
                        // console.log(`Conversation ID: ${JSON.parse(response.body)}`);
                    }
                );
                stompList = [...stompList, stompObject.id];
            });
        };
        if (userId !== 0) {
            fetchApi();
            loginToChat();
        } else {
            setLoading(false);
        }
        return () => {
            stompList.forEach((id) => {
                stompClient.unsubscribe(id);
            })
        }
    }, [userId]);

    const sharePin = (e) => {
        const senderId = parseInt(e.target.getAttribute("value"));
        const conv = conversationList.current.find((conv) => conv.user.id === senderId);
        let tempList = [];
        conversationList.current.forEach((item) => {
            tempList = [...tempList, ...item.messages];
        });
        tempList.sort((a,b) => a.id - b.id);
        let messageID = tempList.at(-1).id+1;

        stompClient.publish({
            destination: `/app/chat/conversation_id/${conv.conversation.id}`,
            body: JSON.stringify({
                id: messageID,
                user_id: userId,
                conversation_id: conv.conversation.id,
                content: '',
                pin_id: pin_id
            }),
        });
    }

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
                        <div 
                            className={cx('people-option')} key={index}
                            value={user.id}
                            onClick={(e) => sharePin(e)}
                        >
                            <Image
                                src={user.avatar && `data:image/jpeg;base64,${user.avatar}`}
                                className={cx('user-avatar')}
                                alt={user.username}
                                value={user.id}
                            />
                            <span
                                value={user.id}
                            >
                                {user.username}
                            </span>
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
