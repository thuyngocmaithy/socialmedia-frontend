import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './MessageBox.module.scss';
import { faAngleLeft, faHeart, faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import MessageCard from './MessageCard';
import { useState, useLayoutEffect, useContext, useEffect, useRef } from 'react';
import * as messageServices from '../../../../services/messageServices';
import { UserIDContext } from '../../ConversationPopper/index';

const cx = classNames.bind(styles);

function MessageBox({ handleChange, chatWith }) {
    let USER_ID = useContext(UserIDContext);

    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(scrollToBottom, [chatWith.messages]);

    // Get lastest message id
    let [lastestMessageId, setLastestMessageId] = useState(0);
    useLayoutEffect(() => {
        const fetchApi = async () => {
            const messages = await messageServices.getAllConversations();
            setLastestMessageId(messages.at(-1).id +1);
        };
        fetchApi();
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
        today[1] = today[1].split('/').reverse().join('-');
        return today.reverse().join('T')+".000+00:00";
    };
    const handleSendMessage = () => {
        let message = {};
        chatWith.messages.forEach(element => {
            if(element.user.id === USER_ID) {
                message = {...element}
            }
        });
        message.content = newMessage;
        message.id = lastestMessageId;
        setLastestMessageId(lastestMessageId =>lastestMessageId+1);
        message.send_at = formattedDate();
        chatWith.messages = [...chatWith.messages, message];
        setNewMessage('');
        setIsEntering(false);
    }   
    const handleKeyDown = (e) => {
        if(e.key === 'Enter') {
            handleSendMessage();
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
                <div className={cx('wrapper-send_heart-btn')} onClick={()=>{handleSendMessage()}}>
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