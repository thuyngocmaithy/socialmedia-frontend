import classNames from 'classnames/bind';
import styles from './Comment.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import AccountInfo from '../../components/AccountInfo';
import { useEffect, useState, useRef } from 'react';
import Button from '../../components/Button';
import * as commentServices from '../../services/commentServices'
import CommentCard from './CommentCard';

const cx = classNames.bind(styles);
let stompClient = null;

function Comment({pin, currentUser}) {
    // console.log(pin);
    // handle comment
    let comments = useRef([]);
    const [newComment, setNewComment] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            comments.current = await commentServices.getByPinId(pin.id);
            // console.log(comments);
        }
        let stompObject = null;
        const createStompConnect = () => {
            const pin_id = pin.id;
            const socket = new SockJS('http://localhost:8080/ws');
            stompClient = Stomp.over(socket);
            stompClient.connect({}, function(frame) {
                console.log('Connected: ' + frame);
                stompObject = stompClient.subscribe(`/topic/comment/pin_id/${pin_id}`, function(string) {
                    handleCommentSubmit(JSON.parse(string.body).content);
                });
            });
        }
        createStompConnect();
        fetchData();
        return () => {
            stompClient.unsubscribe(stompObject.id);
        };
    },[]);

    
    const handleCommentSubmit = (comment) => {
        comments.current = [...comments.current, comment];
        setNewComment('');
    };

    const sendComment = () => {
        stompClient.publish({
            destination: `/app/addComment/pin.id/${pin.id}`,
            body: JSON.stringify({"id": comments.at(-1).id+1,"user": currentUser,"pin": pin,"content": newComment})
        })
        // handleCommentSubmit(newComment);
    }

    const handlePressEnter = (event) => {
        if(event.key === 'Enter') {
            sendComment();
        }
    }
    //red button
    const [red, setRed] = useState(false);
    const changeBtn = (e) => {
        const current = e.target.value;
        if (current.length >= 1) {
            setRed(true);
        }
        else {
            setRed(false);
        }
    }

    return (
        
        <div className={cx('comment-content')}>
            <div className={cx('comment-panel')}>
                <hr></hr>
                {comments.current.map((comment, index) => (
                    <CommentCard key={index} comment={comment}></CommentCard>
                ))}
            </div>
            <div className={cx('comment-input')}>
            <div className={cx('userComment')}>
                <AccountInfo userImage={currentUser.avatar} username={' '} />
            </div>
            <div className={cx('comment')}>
                <input
                    type="text"
                    placeholder='Thêm nhận xét'
                    value={newComment}
                    onChange={(e) => (setNewComment(e.target.value), changeBtn(e))}
                    onKeyDown={(e) => handlePressEnter(e)}
                />
                {red ?
                    <Button className={cx('send-btn')} onClick={() => sendComment()}  red>
                        <FontAwesomeIcon icon={faPaperPlane} style={{fontsize: "14px"}} />
                    </Button>
                    :
                    <Button className={cx('send-btn')}  primary>
                        <FontAwesomeIcon icon={faPaperPlane} style={{fontsize: "14px"}} />
                    </Button>
                }
            </div>
        </div>
        </div>
    );
}

export default Comment;