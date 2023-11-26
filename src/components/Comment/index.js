import classNames from 'classnames/bind';
import styles from './Comment.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import AccountInfo from '../../components/AccountInfo';
import Button from '../../components/Button';
import * as commentServices from '../../services/commentServices';
import * as pinServices from '../../services/pinServices';
import CommentCard from './CommentCard';
import { useEffect, useRef, useState } from 'react';

const cx = classNames.bind(styles);

function CommentApp({handleTurnOnSelectReport, scroll = false, comments, currentUser, setScroll }) {
    //scroll to bottom CommentApp
    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        if (scroll) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
            setScroll(true);
        }
    };
    useEffect(scrollToBottom, [scroll]);

    return (
        <div className={cx('comment-content')}>
            <div className={cx('comment-panel')}>
                <div className={cx('wrapper')}>
                    {comments.current.map((comment, index) => (
                        <CommentCard key={index} handleTurnOnSelectReport={handleTurnOnSelectReport} comment={comment} currentUser={currentUser}></CommentCard>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            </div>
        </div>
    );
}

export default CommentApp;
