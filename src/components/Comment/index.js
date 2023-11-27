import classNames from 'classnames';
import { useEffect, useRef } from 'react';
import styles from './Comment.module.scss';
import CommentCard from './CommentCard';

const cx = classNames.bind(styles);

function CommentApp({ scroll = false, comments, currentUser, setScroll }) {
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
                        <CommentCard key={index} comment={comment} currentUser={currentUser}></CommentCard>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            </div>
        </div>
    );
}

export default CommentApp;
