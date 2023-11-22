import classNames from 'classnames/bind';
import styles from './FriendRequest.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import AccountInfo from '../../AccountInfo';
import Button from '../../Button';
import * as friendshipServices from '../../../services/friendshipServices';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { CircularProgress } from '@mui/material';

const cx = classNames.bind(styles);
function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ padding: '24px 0' }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
function FriendRequest({ idUser, onClose }) {
    const [listRequest, setListRequest] = useState([]);
    const [listSent, setListSent] = useState([]);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApi = async () => {
            const resultRequest = await friendshipServices.getListRequest(idUser);
            setListRequest(resultRequest);

            const resultSent = await friendshipServices.getListSent(idUser);
            setListSent(resultSent);

            setLoading(false);
            setUpdateSuccess(false);
            setDeleteSuccess(false);
        };
        fetchApi();
    }, [idUser, updateSuccess, deleteSuccess]);

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleAcceptFriend = async (id, user1, user2) => {
        const createdAt = null;

        const status = 'ACCEPTED';

        const friendship = { id, user1, user2, status, createdAt };
        const result = await friendshipServices.update(id, friendship);
        if (result) {
            setUpdateSuccess(true);
        }
    };

    const handleCancelFriend = async (id) => {
        const result = await friendshipServices.deleteById(id);
        if (result) {
            setDeleteSuccess(true);
        }
    };

    return (
        <div className={cx('wrapper')}>
            {loading && <CircularProgress sx={{ display: 'flex', margin: '0 auto' }} />}
            <div className={cx('container')}>
                <div className={cx('header')}>
                    <h2 className={cx('title')}>Bạn bè</h2>
                    <button className={cx('closeBtn')} onClick={onClose}>
                        <span className={cx('icon')}>
                            <FontAwesomeIcon icon={faXmark} />
                        </span>
                    </button>
                </div>
                <div className={cx('option-container')}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} variant="fullWidth" aria-label="basic tabs example">
                            <Tab
                                sx={{ fontSize: '1.3rem', fontWeight: 600 }}
                                label="Lời mời kết bạn"
                                {...a11yProps(0)}
                            />
                            <Tab
                                sx={{ fontSize: '1.3rem', fontWeight: 600 }}
                                label="Lời mời đã gửi"
                                {...a11yProps(1)}
                            />
                        </Tabs>
                    </Box>
                </div>
                <CustomTabPanel value={value} index={0}>
                    <div className={cx('body')}>
                        {listRequest &&
                            listRequest.map((item, index) => {
                                return (
                                    <div key={index} className={cx('item-friend')}>
                                        <AccountInfo
                                            userImage={item.user1.avatar}
                                            username={item.user1.username}
                                            width="45px"
                                            fontSize="1.5rem"
                                            fontWeight="500"
                                        />
                                        <div>
                                            <Button primary onClick={() => handleCancelFriend(item.id)}>
                                                Xóa
                                            </Button>
                                            <Button
                                                className={cx('acceptBtn')}
                                                red
                                                onClick={() => handleAcceptFriend(item.id, item.user1, item.user2)}
                                            >
                                                Chấp nhận
                                            </Button>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <div className={cx('body')}>
                        {listSent &&
                            listSent.map((item, index) => {
                                return (
                                    <div key={index} className={cx('item-friend')}>
                                        <AccountInfo
                                            userImage={item.user2.avatar}
                                            username={item.user2.username}
                                            width="45px"
                                            fontSize="1.5rem"
                                            fontWeight="500"
                                        />
                                        <Button primary onClick={() => handleCancelFriend(item.id)}>
                                            Xóa
                                        </Button>
                                    </div>
                                );
                            })}
                    </div>
                </CustomTabPanel>
            </div>
        </div>
    );
}

export default FriendRequest;
