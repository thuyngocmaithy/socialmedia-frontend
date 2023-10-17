<<<<<<< HEAD
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './MessageBox.module.scss'
import { faAngleLeft, faHeart } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind'
import MessageCard from './MessageCard';

const cx = classNames.bind(styles);

function MessageBox({handleChange, chatWith}) {
    return ( 
        <div className={cx('wrapper-message')}>
            <div className={cx('message-header')}>
                <div className={cx('wrapper-back-btn')}
                    onClick={() => handleChange()}
                >
                    <button className={cx('back-btn')}>
                        <FontAwesomeIcon icon={faAngleLeft}/>
                    </button>
                </div>
                <h3 className={cx('sender-name')}>{chatWith.name}</h3>   
            </div>

            <div className={cx('message-list')}>
                {
                    chatWith.messages.map((message) => {
                        return <MessageCard key={message.message_id} type={message.type} content={message.content} chatWith={chatWith.name}></MessageCard>
                    })
                }
            </div>

            <div className={cx('message-send-option')}>
                <input className={cx('message-input')} type='text' placeholder='Send a message'></input>
                <div className={cx('wrapper-send_heart-btn')}>
                    <button className={cx('send_heart-btn')}>
                        <FontAwesomeIcon icon={faHeart}/>
                    </button>
                </div>
            </div>
        </div>
    );
}

=======
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './MessageBox.module.scss'
import { faAngleLeft, faHeart } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind'
import MessageCard from './MessageCard';

const cx = classNames.bind(styles);

function MessageBox({ handleChange, chatWith }) {
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
                        return <MessageCard key={message.message_id} type={message.type} content={message.content} chatWith={chatWith.name}></MessageCard>
                    })
                }
            </div>

            <div className={cx('message-send-option')}>
                <input className={cx('message-input')} type='text' placeholder='Send a message'></input>
                <div className={cx('wrapper-send_heart-btn')}>
                    <button className={cx('send_heart-btn')}>
                        <FontAwesomeIcon icon={faHeart} />
                    </button>
                </div>
            </div>
        </div>
    );
}

>>>>>>> 02e458a4b0c2087a9f0f05c36c23889fa7d6c641
export default MessageBox;