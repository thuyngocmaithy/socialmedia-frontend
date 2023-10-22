import PropTypes from 'prop-types';
import styles from './ConversationMenu.module.scss';
import classNames from 'classnames/bind';
import Image from '../../../Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const cx = classNames.bind(styles)
function ConversationCard({ handleChange, avatar, senderName, lastMessage }) {

    const [deleteBtnIsShown, setDeleteBtnIsShown] = useState(false);

    return (
        <div className={cx('wrapper-conversation-card')}
            onMouseEnter={() => setDeleteBtnIsShown(true)}
            onMouseLeave={() => setDeleteBtnIsShown(false)}
            onClick={() => handleChange(senderName)}
        >
            <Image src={avatar} className={cx('conversation-avatar')}></Image>
            <div className={cx('wrapper-conversation')}>
                <h3 className={cx('sender-name')}>{senderName}</h3>
                <h3 className={cx('lastMessage')}>{lastMessage}</h3>
            </div>
            <div className={cx('wrapper-button')}>
                {deleteBtnIsShown &&
                    <button className={cx('delete-conversation-button')}>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                }
            </div>
        </div>
    );
}

ConversationCard.prototype = {
    avatar: PropTypes.string,
    senderName: PropTypes.string,
    lastMessage: PropTypes.string
}

export default ConversationCard;