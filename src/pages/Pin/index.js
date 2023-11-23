import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ShareIcon, DownloadIcon, ReportIcon } from '../../components/Icons';
import AccountInfo from '../../components/AccountInfo';
import ActionAlerts from '../../components/Alert';
import Button from '../../components/Button';
import CommentApp from '../../components/Comment';
import CreateBoard from '../../components/CreateBoard';
import Popper from '../../components/Popper';
import SelectBoardPopper from '../../components/Popper/SelectBoardPopper';
import { StompContext } from '../../context/StompContext';
import * as pinServices from '../../services/pinServices';
import * as userSavePinServices from '../../services/userSavePinServices';
import SelectReportOption from '../../components/SelectReportOption';
import * as userServices from '../../services/userServices';
import styles from './DisplayPin.module.scss';
import { AccountLoginContext } from '../../context/AccountLoginContext';
import { CircularProgress } from '@mui/material';

const cx = classNames.bind(styles);

function DisplayPin() {
    const { userId } = useContext(AccountLoginContext);
    const [currentUser, setCurrentUser] = useState(null);
    const stompClient = useContext(StompContext);
    // useEffect(() => {
    //     const fetchApi = async () => {};

    //     fetchApi();
    // }, [userId]);

    const location = useLocation();
    const pinID = location.pathname.split('/')[2];
    const [pin, setPin] = useState([]);
    const [currentBoard, setBoard] = useState({ name: 'Chọn bảng' });
    const [img, setIMG] = useState();
    const [valContent, setValContent] = useState('');
    const [valTitle, setValTitle] = useState('');
    const [user, setUser] = useState(null);
    const [load, setLoad] = useState(false);
    useEffect(() => {
        const fetchApi = async () => {
            const user = await userServices.getUserById(userId);
            setCurrentUser(user);

            const pin = await pinServices.getPinById(pinID);
            console.log(pin);
            setPin(pin);
            // setBoard(pin.board);
            setIMG(pin.image);
            setValContent(pin.description);
            setValTitle(pin.title);
            setUser(pin.user);
            setLoad(false);
        };

        fetchApi();
    }, [userId]);

    //auto resize textarea
    const titleRef = React.useRef();
    const contentRef = React.useRef();
    const autoResize = (ref) => {
        if (ref && ref.current) {
            ref.current.style.height = '0px';
            const taHeight = ref.current.scrollHeight;
            ref.current.style.height = taHeight + 'px';
        }
    };
    React.useEffect(
        () => {
            autoResize(titleRef);
            autoResize(contentRef);
        },
        [valTitle],
        [valContent],
    );

    // ............

    //select board
    const [activeOptionTop, setActiveOptionTop] = useState(false);

    const handleClickAway = () => {
        setActiveOptionTop(false);
    };
    const handleDisplay = () => {
        setActiveOptionTop(true);
    };

    // HandleChooseBoard
    const handleChooseBoard = (currentBoard) => {
        setBoard(currentBoard);
        // console.log(currentBoard.name);
    };

    // Make Friend
    const handleFriendships = async () => {
        const data = JSON.stringify({ notifications: { notificationType: 'Friend' }, friendships: { user1: 1 } });
        stompClient.send(`/app/sendNot/${currentUser.id}`, {}, data);
    };

    //save pin
    const handleInsertPin = async () => {
        if (currentBoard.name !== 'Chọn bảng') {
            const board = currentBoard;
            const pinSaved = { board, pin, user };
            console.log(pinSaved);
            const result = await userSavePinServices.save(pinSaved);

            handleSaveResult(true);
        } else {
            alert('Chọn bảng !!!');
        }
    };
    const [statusSave, setSatusSave] = useState(false);

    const handleSaveResult = (result) => {
        setSatusSave(result);
        if (result) {
            setTimeout(() => {
                setSatusSave(false);
            }, 2500);
        }
        window.location.reload();
    };

    // Turn on CreateBoard
    const [showCreateBoard, setShowCreateBoard] = React.useState(false);
    const handleTurnOnCreateBoard = (isShown) => {
        setShowCreateBoard(isShown);
    };

    // Turn on select report
    const [showSelectReport, setShowSelectReport] = React.useState(false);
    const handleTurnOnSelectReport = (isShown) => {
        setShowSelectReport(isShown);
    };

    return (
        <div className={cx('wrapper-createPage')}>
            {load && <CircularProgress sx={{ display: 'flex', margin: '0 auto' }} />}
            <div className={cx('createBox')}>
                <div className={cx('mainContent')}>
                    <div className={cx('imgWrapper')}>
                        <img src={img && `data:image/jpeg;base64,${img}`} alt="" />
                    </div>
                    {/* end upload IMG */}
                    <div className={cx('insertData')}>
                        <div className={cx('wrapperBtns')}>
                            <div className={cx('option-bottom')}>
                                <Tippy delay={[0, 100]} content="Báo cáo" placement="bottom">
                                    <button
                                        className={cx('btn-end', 'report-btn')}
                                        onClick={() => handleTurnOnSelectReport(true)}
                                    >
                                        <ReportIcon
                                            width="2.4rem"
                                            height="2.4rem"
                                            className={cx('action', 'gUZ', 'R19', 'U9O', 'kVc')}
                                        />
                                    </button>
                                </Tippy>
                                <Tippy delay={[0, 100]} content="Chia sẻ" placement="bottom">
                                    <button className={cx('btn-end', 'share-btn')}>
                                        <ShareIcon
                                            width="2.0rem"
                                            height="2.0rem"
                                            className={cx('action', 'gUZ', 'R19', 'U9O', 'kVc')}
                                        />
                                    </button>
                                </Tippy>
                                <Tippy delay={[0, 100]} content="Lưu ảnh" placement="bottom">
                                    <button className={cx('btn-end', 'saveIMG-btn')}>
                                        <DownloadIcon
                                            width="2.0rem"
                                            height="2.0rem"
                                            className={cx('action', 'gUZ', 'R19', 'U9O', 'kVc')}
                                        />
                                    </button>
                                </Tippy>
                            </div>

                            <div className={cx('wrapperBoardandSaveBtn')}>
                                <div className={cx('option-top', { active: activeOptionTop })}>
                                    <ClickAwayListener onClickAway={handleClickAway}>
                                        <button className={cx('select-board-btn')} onClick={() => handleDisplay()}>
                                            <Popper
                                                // idPopper={id}
                                                contentTitle={currentBoard.name}
                                                title={<FontAwesomeIcon icon={faChevronDown} />}
                                                className={cx('select-board')}
                                                body={
                                                    <SelectBoardPopper
                                                        handleTurnOnCreateBoard={handleTurnOnCreateBoard}
                                                        handleChooseBoard={handleChooseBoard}
                                                    />
                                                }
                                                widthBody="maxContent"
                                            />
                                        </button>
                                    </ClickAwayListener>
                                </div>
                                <div className={cx('save-pin')}>
                                    <Button className={cx('save-btn')} onClick={() => handleInsertPin()} red>
                                        Lưu
                                    </Button>
                                </div>
                            </div>
                        </div>
                        {/* end header  */}
                        <div className={cx('info-pin-container')}>
                            <div className={cx('title')}>
                                <div className={cx('inputTitle')}>{valTitle}</div>
                            </div>
                            <div className={cx('content')}>
                                <div className={cx('inputContent')}>{valContent}</div>
                            </div>
                            <div className={cx('container-user')}>
                                {user !== null && <AccountInfo userImage={user.avatar} username={user.username} />}
                                <Button className={cx('addFriendBtn')} primary onClick={handleFriendships}>
                                    Kết bạn
                                </Button>
                            </div>
                            <div className={cx('comment-input')}>
                                <h3 className={cx('comment-title')}>Nhận xét</h3>
                                {currentUser !== null && <CommentApp pinID={pinID} currentUser={currentUser} />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showCreateBoard && (
                <div className={cx('createBoard')}>
                    <CreateBoard
                        handleTurnOnCreateBoard={handleTurnOnCreateBoard}
                        handleChooseBoard={handleChooseBoard}
                    />
                </div>
            )}
            {statusSave && <ActionAlerts severity="success" content={`Đã lưu pin`} action="UNDO" />}
            {showSelectReport && (
                <SelectReportOption handleTurnOnSelectReport={handleTurnOnSelectReport} pin={pin} user={currentUser} />
            )}
        </div>
    );
}

export default DisplayPin;
