import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './MessageBox.module.scss'
import { faAngleLeft, faHeart, faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind'
import MessageCard from './MessageCard';
import { useState } from 'react'

const cx = classNames.bind(styles);

function MessageBox({ handleChange, chatWith }) {
    // Change icon Heart to Arrow
    const [isEntering, setIsEntering] = useState(false);
    const handleChatting = (e) => {
        if(e.target.value.length >= 1) {
            setIsEntering(true);
        }
        else {
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

            <div className={cx('message-list')}>
                {
                    chatWith.messages.map((message) => {
                        return <MessageCard key={message.id} message={message}></MessageCard>
                    })
                }
            </div>

            <div className={cx('message-send-option')}>
                <input className={cx('message-input')} type='text' placeholder='Send a message' onChange={(e) => handleChatting(e)}></input>
                <div className={cx('wrapper-send_heart-btn')}>
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