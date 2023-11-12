import classNames from 'classnames/bind';
import styles from './ListFriend.module.scss';
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
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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
function ListFriend({ idUser, onClose }) {
    const [listFriend, setListFriend] = useState([]);
    const [listRequest, setListRequest] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const resultFriend = await friendshipServices.getListFriend(idUser);
            setListFriend(resultFriend);

            const resultRequest = await friendshipServices.getListRequest(idUser);
            setListRequest(resultRequest);
        };
        fetchApi();
    }, [idUser]);

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div className={cx('wrapper')}>
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
                            <Tab sx={{ fontSize: '1.3rem', fontWeight: 600 }} label="Tất cả bạn bè" {...a11yProps(0)} />
                            <Tab
                                sx={{ fontSize: '1.3rem', fontWeight: 600 }}
                                label="Lời mời kết bạn"
                                {...a11yProps(1)}
                            />
                        </Tabs>
                    </Box>
                </div>
                <CustomTabPanel value={value} index={1}>
                    <div className={cx('body')}>
                        {listRequest &&
                            listRequest.map((item, index) => {
                                return (
                                    <div key={index} className={cx('item-friend')}>
                                        <AccountInfo
                                            userImage={item.avatar}
                                            username={item.username}
                                            width="45px"
                                            fontSize="1.6rem"
                                            fontWeight="500"
                                        />
                                        <Button primary>Chấp nhận</Button>
                                    </div>
                                );
                            })}
                    </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={0}>
                    <div className={cx('body')}>
                        {listFriend &&
                            listFriend.map((item, index) => {
                                return (
                                    <div key={index} className={cx('item-friend')}>
                                        <AccountInfo
                                            userImage={item.avatar}
                                            username={item.username}
                                            width="45px"
                                            fontSize="1.6rem"
                                            fontWeight="500"
                                        />
                                        <Button primary>Hủy kết bạn</Button>
                                    </div>
                                );
                            })}
                    </div>
                </CustomTabPanel>
            </div>
        </div>
    );
}

export default ListFriend;
