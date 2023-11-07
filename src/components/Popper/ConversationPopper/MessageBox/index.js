import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './MessageBox.module.scss';
import { faAngleLeft, faHeart, faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import MessageCard from './MessageCard';
import { useState, useLayoutEffect, useContext, useEffect, useRef } from 'react';
import * as messageServices from '../../../../services/messageServices';
import { UserIdContext } from '../../../../context/UserIdContext';
import { StompContext } from '../../../../context/StompContext';

const cx = classNames.bind(styles);

function MessageBox({ handleChange, handleGetNewMessage, chatWith }) {
    let stompClient = useContext(StompContext);
    let USER_ID = useContext(UserIdContext);
    let message = useRef({});
    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(scrollToBottom, [chatWith.messages]);

    // Get lastest message id
    let [lastestMessageId, setLastestMessageId] = useState(0);
    useLayoutEffect(() => {
        // sendMessage()
        const fetchApi = async () => {
            const messages = await messageServices.getAllConversations();
            setLastestMessageId(messages.at(-1).id +1);
        };
        fetchApi();

        const stompObject = stompClient.subscribe(`/room/conversation_id/${chatWith.conversation_id}`, function(message) {
            handleSendMessage(JSON.parse(message.body));
        })
        
        return () => {
            stompClient.unsubscribe(stompObject.id);
        };
    }, []);

    // Change chat icon
    const [isEntering, setIsEntering] = useState(false);
    const handleChatting = (e) => {
        if(e.target.value.length >= 1) {
            setIsEntering(true);
            setNewMessage(e.target.value);
        }
        else {
            setIsEntering(false);
            setNewMessage('');
        }
    }

    // Add new message
    const [newMessage, setNewMessage] = useState('');
    const formattedDate = () => {
        let today = (new Date()).toLocaleString("vi-VN").split(' ');
        let date = today[1].split('/');
        if(date[0].length === 1) {
            date[0] = '0'+date[0];
        }
        today[1] = date.reverse().join('-');
        return today.reverse().join('T')+".000+00:00";
    };
    const handleSendMessage = (message) => {
        chatWith.messages = [...chatWith.messages, message];
        setNewMessage('');
        setIsEntering(false);
        setLastestMessageId(lastestMessageId => lastestMessageId+1);
        handleGetNewMessage(chatWith.conversation_id, chatWith.messages);
    }   
        
    const sendMessage = () => {
        chatWith.messages.forEach(element => {
            if(element.user.id === USER_ID) {
                message.current = {...element};
            }
        });
        message.current.content = newMessage;
        message.current.id = lastestMessageId;
        message.current.send_at = formattedDate();
        stompClient.publish({
            destination: `/app/chat/conversation/${chatWith.conversation_id}`,
            body: JSON.stringify({
                "id": lastestMessageId,
                "user": message.current.user,
                "content": newMessage,
                "send_at": formattedDate(),
                "conversation": message.current.conversation
            })
        });
    }
    const handleKeyDown = (e) => {
        if(e.key === 'Enter') {
            sendMessage();
            setIsEntering(false);
        }
    }

    return (
        <div className={cx('wrapper-message')}>
            <div className={cx('message-header')}>
                <div className={cx('wrapper-back-btn')}
                    onClick={() => handleChange()}
                >
                    <button className={cx('back-btn')}>
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </button>
                </div>
                <h3 className={cx('sender-name')}>{chatWith.name}</h3>
            </div>

            <div className={cx('wrapper-message-list')}>
                <div className={cx('message-list')}>
                    {
                        chatWith.messages.map((message) => {
                            return <MessageCard key={message.id} message={message}></MessageCard>
                        })
                    }
                    <div ref={messagesEndRef} />
                </div>
            </div>

            <div className={cx('message-send-option')}>
                <input className={cx('message-input')} type='text' placeholder='Send a message' onKeyDown={(e) => {handleKeyDown(e)}} onChange={(e) => handleChatting(e)} value={newMessage}></input>
                <div className={cx('wrapper-send_heart-btn')} onClick={()=>{sendMessage()}}>
                    <button className={cx('send_heart-btn')}>
                        { isEntering ?
                            <FontAwesomeIcon style={{color: 'red'}} icon={faCircleArrowRight} />
                            : 
                            <FontAwesomeIcon icon={faHeart}/>
                        }
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MessageBox;