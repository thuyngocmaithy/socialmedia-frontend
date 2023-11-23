import PropTypes from 'prop-types';
import styles from './ConversationMenu.module.scss';
import classNames from 'classnames/bind';
import Image from '../../../Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useContext, useState } from 'react';
import { ThemeContext } from '../../../../context/ThemeContext';

const cx = classNames.bind(styles);
function ConversationCard({ handleChange, avatar, senderName, lastMessage, isSeen , conversation_id}) {
    const { theme } = useContext(ThemeContext);
    const [deleteBtnIsShown, setDeleteBtnIsShown] = useState(false);
    const [redMarkShown, setRedMarkShown] = useState(!isSeen);
    const showButton = (isShown) => {
        setDeleteBtnIsShown(isShown);
        if(isSeen === false) {
            setRedMarkShown(!isShown);
        }
    }
    return (
        <div
            className={cx('wrapper-conversation-card', theme === 'dark' ? 'dark' : '')}
            onMouseEnter={() => showButton(true)}
            onMouseLeave={() => showButton(false)}
            onClick={() => handleChange(senderName, conversation_id)}
        >
            <Image src={avatar && `data:image/jpeg;base64,${avatar}`} className={cx('conversation-avatar')}></Image>
            <div className={cx('wrapper-conversation')}>
                <h3 className={cx('sender-name', isSeen === false ? 'unSeen' : '')}>{senderName}</h3>
                <h3 className={cx('lastMessage', isSeen === false ? 'unSeen' : '')}>{lastMessage}</h3>
            </div>
            <div 
                className={cx('wrapper-button')}
            >
                {
                    deleteBtnIsShown && (
                        <button className={cx('delete-conversation-button', 'float-icon', theme === 'dark' ? 'dark' : '')}>
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    )
                }
                {
                    redMarkShown && (
                        <button className={cx('unseen-red-mark', 'float-icon', theme === 'dark' ? 'dark' : '')}>
                            <FontAwesomeIcon icon={faCircle}/>
                        </button>
                )
                }
            </div>
        </div>
    );
}

ConversationCard.prototype = {
    avatar: PropTypes.string,
    senderName: PropTypes.string,
    lastMessage: PropTypes.string,
    isSeen: PropTypes.bool
};

export default ConversationCard;
