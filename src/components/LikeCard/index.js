import classNames from "classnames/bind";
import Tippy from "@tippyjs/react";
import { useState, useEffect } from 'react';
import styles from './LikeCard.module.scss';
import { LikeIcon, LikedIcon } from '../Icons';
import * as likeServices from '../../services/likeServices';
import * as pinServices from '../../services/pinServices';
import axios from "axios";

const cx = classNames.bind(styles);

function LikeCard({pinID, currentUser}) {
    const [count, setCount] = useState(0);
    const [pin, setPin] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            setPin(await pinServices.getPinById(pinID));
            const result = await likeServices.getLikeByPinId(pinID);
            setCount(result.length);
            console.log(result);
            
            for (let i = 0; i < result.length; i++) {
                if (result[i].user.id === currentUser.id) {
                    setLike(true);
                    break;
                }
            }
        };
        fetchApi();
    }, [currentUser.id]);

    const [like, setLike] = useState(false);

    const liked = () => {
        let createdAt = new Date();
        const like = {
            createdAt,
            user : currentUser,
            pin,
        };
        console.log(like);
        const fetchApi = async () => {
            const result = await likeServices.save(like);
        };
        fetchApi();
    }

    const unlike = () => {
        const fetchApi = async () => {
            const result = await likeServices.getLikeByPinId(pinID);
        
            for (let i = 0; i < result.length; i++) {
                if (result[i].user.id === currentUser.id) {
                    const rs = await likeServices.del(result[i]);
                    break;
                }
            }
        };
        fetchApi();
    }

    return (
        <div className={cx('wrapper-like')}>
            <div className={cx('heart')}></div>
            <p>{count}</p>
            {(!like) ? (
                <Tippy delay={[0, 100]} content="Like Pin" placement="bottom">
                    <button className={cx('like-btn')} onClick={() => (setLike(true), liked(), setCount(count+1) )} >
                        <LikeIcon
                            width="2.4rem"
                            height="2.4rem"
                            className={cx('action', 'gUZ', 'R19', 'U9O', 'kVc')}
                        />
                    </button>
                </Tippy>
            ) : (
                <Tippy delay={[0, 100]} content="Like Pin" placement="bottom">
                    <button className={cx('like-btn')} onClick={() => (setLike(false), unlike(), setCount(count-1) )} >
                        <LikedIcon
                            width="2.4rem"
                            height="2.4rem"
                            className={cx('action', 'gUZ', 'R19', 'U9O', 'kVc')}
                        />
                    </button>
                </Tippy>
            )}
        </div>
    );
}

export default LikeCard;