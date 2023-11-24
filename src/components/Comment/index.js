import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Stomp } from '@stomp/stompjs';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import AccountInfo from '../../components/AccountInfo';
import Button from '../../components/Button';
import * as commentServices from '../../services/commentServices';
import * as pinServices from '../../services/pinServices';
import styles from './Comment.module.scss';
import CommentCard from './CommentCard';

const cx = classNames.bind(styles);
let stompClient = null;

function CommentApp({ pinID, currentUser }) {
    // console.log(pin);
    // handle comment
    let comments = useRef([]);
    const [pin, setPin] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [load, setLoad] = useState(false);
    useEffect(() => {
        let stompObject = null;
        const fetchData = async () => {
            setPin(await pinServices.getPinById(pinID));
            console.log(pin);
            comments.current = await commentServices.getByPinId(pinID);
            setLoad(true);
        };
        const createStompConnect = () => {
            const socket = new SockJS('http://localhost:8080/ws');
            stompClient = Stomp.over(socket);
            stompClient.connect({}, function (frame) {
                console.log('Connected: ' + frame);
                stompObject = stompClient.subscribe(`/room/comment/pin_id/${pinID}`, function (comment) {
                    handleCommentSubmit(JSON.parse(comment.body));
                    console.log(JSON.parse(comment.body));
                });
            });
        };
        fetchData().then(() => {
            createStompConnect();
        });
        return () => {
            stompClient.unsubscribe(stompObject.id);
        };
    }, []);

    const handleCommentSubmit = (comment) => {
        comments.current = [...comments.current, comment];
        setNewComment('');
        setLoad(false);
    };

    const sendComment = () => {
        stompClient.send({},)
        console.log(comments.current);
        stompClient.publish({
            destination: `/app/sendNot/${pin.user.id}`,
            body: JSON.stringify({
                notifications: { notificationType: 'Comment' },
                comments: {
                    user: { id: currentUser.id },
                    pin: { id: pin.id },
                    content: newComment,
                }
            }),
        });
    };

    const handlePressEnter = (event) => {
        if (event.key === 'Enter') {
            sendComment();
        }
    };
    //red button
    const [red, setRed] = useState(false);
    const changeBtn = (e) => {
        const current = e.target.value;
        if (current.length >= 1) {
            setRed(true);
        } else {
            setRed(false);
        }
    };

    return (
        <div className={cx('comment-content')}>
            <div className={cx('comment-panel')}>
                <div className={cx('wrapper')}>
                    {comments.current.map((comment, index) => (
                        <CommentCard key={index} comment={comment} ></CommentCard>
                    ))}
                </div>
            </div>
            <div className={cx('comment-input')}>
                <div className={cx('userComment')}>
                    <AccountInfo userImage={currentUser.avatar} username={' '} />
                </div>
                <div className={cx('comment')}>
                    <input
                        type="text"
                        placeholder="Thêm nhận xét"
                        value={newComment}
                        onChange={(e) => (setNewComment(e.target.value), changeBtn(e))}
                        onKeyDown={(e) => handlePressEnter(e)}
                    />
                    {red ? (
                        <Button className={cx('send-btn')} onClick={() => sendComment()} red>
                            <FontAwesomeIcon icon={faPaperPlane} style={{ fontsize: '14px' }} />
                        </Button>
                    ) : (
                        <Button className={cx('send-btn')} primary>
                            <FontAwesomeIcon icon={faPaperPlane} style={{ fontsize: '14px' }} />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CommentApp;
