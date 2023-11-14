import { Stomp } from '@stomp/stompjs';
import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import SockJS from 'sockjs-client';

let stompClient = null;
const CommentApp = () => {
    //   const [comments, setComments] = useState([]);
    let comments = useRef([]);
    const [newComment, setNewComment] = useState('');
    //   const socket = io('http://localhost:3000');
    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws');
        stompClient = Stomp.over(socket);
        let stompObject = null;
        stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);

            stompObject = stompClient.subscribe(`/topic/comment`, function (string) {
                handleCommentSubmit(JSON.parse(string.body).content);
            });
        });

        return () => {
            stompClient.unsubscribe(stompObject.id);
        };
    }, []);

    const handleCommentSubmit = (comment) => {
        comments.current = [...comments.current, comment];
        setNewComment('');
    };

    const sendComment = () => {
        stompClient.publish({
            destination: '/app/addComment',
            body: JSON.stringify({ content: newComment }),
        });
    };

    return (
        <div>
            <div>
                <ul>
                    {comments.current.map((comment, index) => (
                        <li key={index}>{comment}</li>
                    ))}
                </ul>
            </div>
            <div>
                <input
                    type="text"
                    value={newComment ? newComment : ''}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button onClick={() => sendComment()}>Submit</button>
            </div>
        </div>
    );
};

export default CommentApp;
