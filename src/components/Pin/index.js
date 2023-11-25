import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import classNames from 'classnames/bind';
import styles from './Pin.module.scss';
import { ShareIcon, DownloadIcon, AccessIcon, EditIcon, SearchIcon, People } from '../Icons';
import AccountInfo from '../AccountInfo';
import Button from '../Button';
import SelectBoardPopper from '../Popper/SelectBoardPopper';
import CreateBoard from '../CreateBoard';
import Popper from '../Popper';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import * as userSavePinServices from '../../services/userSavePinServices';
import * as pinServices from '../../services/pinServices';
import * as boardServices from '../../services/boardServices';
import * as userServices from '../../services/userServices';
import SharePopper from '../Popper/SharePopper';
import { NavLink } from 'react-router-dom';
import { AccountLoginContext } from '../../context/AccountLoginContext';
import DialogConfirmLogin from '../DialogConfirmLogin';
import { NotificationContext } from '../../context/NotificationContext';

const cx = classNames.bind(styles);

function Pin({
    stt,
    id,
    width,
    image,
    linkImage,
    title,
    userImage,
    username,
    pinCreated = false,
    handleEdit,
    onSaveResult,
    showAlert,
}) {
    const { userId, permission } = useContext(AccountLoginContext);
    const [activeOptionTop, setActiveOptionTop] = useState(false);
    const [activeOptionBottom, setActiveOptionBottom] = useState(false);
    const [openConfirmLogin, setOpenConfirmLogin] = useState(false);
    const { updatePinCount } = useContext(NotificationContext);

    const handleOpenShare = () => {
        setActiveOptionBottom(true);
    };

    const handleDisplay = () => {
        setActiveOptionTop(true);
    };
    const handleClickAwaySelectBoard = () => {
        setActiveOptionTop(false);
    };
    const handleClickAwayShare = () => {
        setActiveOptionBottom(false);
    };

    const [data, setData] = useState({ name: 'Chọn bảng' });

    const getData = (board) => {
        setData(board);
    };
    const handleSave = () => {
        const fetchApi = async () => {
            const user = await userServices.getUserById(userId);

            {
                // Tăng biến đếm để tạo thông báo bài pin liên quan
                const pinCount = localStorage.getItem('pinCount');
                const existingArray = pinCount ? JSON.parse(pinCount) : [];
                const pinCountList = [...existingArray, { id: id }];

                localStorage.setItem('pinCount', JSON.stringify(pinCountList));
                console.log(pinCountList.length);
                if (pinCountList.length === 4) {
                    updatePinCount(pinCountList);
                    localStorage.setItem('pinCount', []);
                }
                console.log(pinCount);
            }

            const pinId = id;
            const boardId = data.id;
            const pin = await pinServices.getPinById(pinId);
            const board = await boardServices.getBoardById(boardId);
            if (pin.user.id === userId) {
                showAlert('errorSave');
            } else {
                const userSavePin = { user, pin, board };
                const result = await userSavePinServices.save(userSavePin);
                if (result) {
                    onSaveResult(true);
                    setData({ name: 'Chọn bảng' });
                }
            }
        };
        if (permission !== null) {
            showAlert('errorAdmin');
        } else if (userId !== 0) {
            if (data.name === 'Chọn bảng') {
                showAlert('warning');
            } else {
                fetchApi();
            }
        } else {
            setOpenConfirmLogin(true);
        }
    };

    const download = (url, title) => {
        const linkSource = `data:image/jpeg;base64,${url}`;
        const downloadLink = document.createElement('a');
        downloadLink.href = linkSource;
        downloadLink.download = `${title}.png`;
        downloadLink.click();
    };

    const openImage = (url) => {
        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const navigate = useNavigate();
    const handleDisplayPin = () => {
        if (userId === 0) {
            // setTimeout(() => {
            setOpenConfirmLogin(true);
            navigate('/login');

            // }, 900000);
        }
    };

    // Turn on CreateBoard
    const [showCreateBoard, setShowCreateBoard] = React.useState(false);

    const handleTurnOnCreateBoard = (isShown) => {
        setShowCreateBoard(isShown);
    };
    const handleCloseCreate = () => {
        setShowCreateBoard(false);
    };

    return (
        <>
            <div className={cx('wrapper')} style={{ width: width }}>
                <div className={cx('container-image')}>
                    <NavLink className={(nav) => cx('menu-item')} to={`/pin/${id}`} onClick={() => handleDisplayPin()}>
                        <img className={cx('image')} src={image && `data:image/jpeg;base64,${image}`} alt="" />
                    </NavLink>
                    {pinCreated ? null : (
                        <div className={cx('option-top', { active: activeOptionTop })}>
                            <ClickAwayListener onClickAway={handleClickAwaySelectBoard}>
                                <button className={cx('select-board-btn')} onClick={handleDisplay}>
                                    <Popper
                                        idPopper={`selectBoard${stt}`}
                                        contentTitle={data.name}
                                        title={<FontAwesomeIcon icon={faChevronDown} />}
                                        className={cx('select-board')}
                                        body={
                                            <SelectBoardPopper
                                                getData={getData}
                                                handleTurnOnCreateBoard={handleTurnOnCreateBoard}
                                            />
                                        }
                                        widthBody="maxContent"
                                    />
                                </button>
                            </ClickAwayListener>

                            <Button className={cx('saveBtn')} red onClick={handleSave}>
                                Lưu
                            </Button>
                        </div>
                    )}
                    <div className={cx('option-bottom', { active: activeOptionBottom })}>
                        {linkImage && (
                            <button onClick={() => openImage(linkImage)} className={cx('btn-text')}>
                                <AccessIcon className={cx('action', 'gUZ', 'R19', 'U9O', 'kVc')} />
                                <span className={cx('link-image')}>{linkImage}</span>
                            </button>
                        )}
                        {pinCreated && (
                            <Tippy delay={[0, 100]} content="Chỉnh sửa" placement="bottom">
                                <button className={cx('btn')} onClick={handleEdit}>
                                    <EditIcon className={cx('action', 'gUZ', 'R19', 'U9O', 'kVc')} />
                                </button>
                            </Tippy>
                        )}

                        <ClickAwayListener onClickAway={handleClickAwayShare}>
                            <Tippy delay={[0, 100]} content="Chia sẻ" placement="bottom">
                                <button onClick={handleOpenShare} className={cx(pinCreated ? 'btn-end' : 'btn')}>
                                    <Popper
                                        idPopper={`share${id}`}
                                        contentTitle={
                                            <ShareIcon className={cx('action', 'gUZ', 'R19', 'U9O', 'kVc')} />
                                        }
                                        className={cx('share-menu')}
                                        body={<SharePopper />}
                                        widthBody="maxContent"
                                    />
                                </button>
                            </Tippy>
                        </ClickAwayListener>

                        {pinCreated ? null : (
                            <Tippy delay={[0, 100]} content="Lưu ảnh" placement="bottom">
                                <button
                                    onClick={() => {
                                        download(image, title);
                                    }}
                                    className={cx('btn-end')}
                                >
                                    <DownloadIcon className={cx('action', 'gUZ', 'R19', 'U9O', 'kVc')} />
                                </button>
                            </Tippy>
                        )}
                    </div>
                </div>
                {pinCreated ? null : (
                    <div className={cx('info-pin')}>
                        {title && <h3>{title}</h3>}
                        <AccountInfo userImage={userImage} username={username} />
                    </div>
                )}
            </div>
            {openConfirmLogin && <DialogConfirmLogin open={openConfirmLogin} setOpen={setOpenConfirmLogin} />}

            {showCreateBoard && (
                <div className={cx('createBoard')}>
                    <CreateBoard handleTurnOnCreateBoard={handleTurnOnCreateBoard} handleChooseBoard={getData} />
                </div>
            )}
        </>
    );
}

export default Pin;
