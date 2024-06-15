import classNames from 'classnames/bind';
import { Fragment, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Pin from '../../components/Pin';
import { getNewsHub } from '../../services/notificationService';
import styles from './News_Hub.module.scss';
import { CircularProgress } from '@mui/material';
const cx = classNames.bind(styles);

function News_Hub() {
    const [loading, setLoading] = useState(true);
    const [news_hub, setNews_hub] = useState([]);
    let id = useLocation().pathname;
    id = id.substring(id.lastIndexOf('/') + 1);
    useEffect(() => {
        getNewsHub(id).then((e) => {
            setNews_hub(e);
            setLoading(false);
        });
    }, [id]);

    return (
        <Fragment>
            {loading && <CircularProgress sx={{ display: 'flex', margin: '0 auto' }} />}
            <h1 className={cx('title')} id="h">
                {news_hub.length !== 0 ? 'Ghim lấy cảm hứng từ bạn' : 'Không tìm thấy trang này'}
            </h1>
            <div className={cx('wrapper')}>
                {news_hub &&
                    news_hub.map((pin, index) => {
                        return (
                            <Pin
                                key={index}
                                image={pin.image}
                                linkImage={pin.linkImage}
                                title={pin.title}
                                userImage={pin.userImage}
                                username={pin.username}
                                pinId={pin.id}
                            />
                        );
                    })}
            </div>
        </Fragment>
    );
}

export default News_Hub;
