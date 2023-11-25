import classNames from 'classnames/bind';
import styles from './DisplayPin.module.scss';
import Tippy from '@tippyjs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { useLocation } from 'react-router-dom';
import React, { useEffect, useState, useContext, useRef } from 'react';
import { ShareIcon, DownloadIcon, ReportIcon } from '../../components/Icons';
import AccountInfo from '../../components/AccountInfo';
import Button from '../../components/Button';
import Popper from '../../components/Popper';
import SelectBoardPopper from '../../components/Popper/SelectBoardPopper';
import CreateBoard from '../../components/CreateBoard';
import ActionAlerts from '../../components/Alert';
import SelectReportOption from '../../components/SelectReportOption';
import CommentApp from '../../components/Comment';
import LikeCard from '../../components/LikeCard';
import * as userServices from '../../services/userServices';
import * as pinServices from '../../services/pinServices';
import * as userSavePinServices from '../../services/userSavePinServices';
import * as commentServices from '../../services/commentServices';
import { AccountLoginContext } from '../../context/AccountLoginContext';
import { ThemeContext } from '../../context/ThemeContext';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { CircularProgress } from '@mui/material';

const cx = classNames.bind(styles);
let stompClient = null;

function DisplayPin() {
    const [currentUser, setCurrentUser] = useState('');
    const { theme } = useContext(ThemeContext);
    const { userId } = useContext(AccountLoginContext);

    // console.log(userId);

    useEffect(() => {
        const fetchApi = async () => {
            const user = await userServices.getUserById(userId);
            setCurrentUser(user);
            // console.log(currentUser);
        };

        fetchApi();
    }, []);

    const location = useLocation();
    const pinID = location.pathname.split('/')[2];
    const [pin, setPin] = useState([]);
    const [currentBoard, setBoard] = useState({ name: 'Chọn bảng' });
    const [img, setIMG] = useState();
    const [valContent, setValContent] = useState('');
    const [valTitle, setValTitle] = useState('');
    const [user, setUser] = useState('');
    const [load, setLoad] = useState(true);
    const [loadComment, setLoadComment] = useState(false);
    useEffect(() => {
        const fetchApi = async () => {
            setLoad(true);
            const pin = await pinServices.getPinById(pinID);
            setPin(pin);
            setIMG(pin.image);
            setValContent(pin.description);
            setValTitle(pin.title);
            setUser(pin.user);
            setLoad(false);
        };
        fetchApi();
    }, []);

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

    //handle comment
    let comments = useRef([]);
    const [newComment, setNewComment] = useState('');
    const [submitComment, setSubmitComment] = useState(false);

    useEffect(() => {
        let stompObject = null;
        const fetchData = async () => {
            comments.current = await commentServices.getByPinId(pinID);
            setLoad(true);
        };
        const createStompConnect = () => {
            const socket = new SockJS('http://localhost:8080/ws');
            stompClient = Stomp.over(socket);
            stompClient.connect({}, function (frame) {
                console.log('Connected: ' + frame);
                stompObject = stompClient.subscribe(`/room/comment/pin_id/${pinID}`, function (comment) {
                    console.log(JSON.parse(comment.body));
                    handleCommentSubmit(JSON.parse(comment.body));
                    setSubmitComment(false);
                });
            });
        };
        createStompConnect();
        fetchData();

        return () => {
            stompClient.unsubscribe(stompObject.id);
        };
    }, [submitComment]);

    const [scroll, setScroll] = useState(false);
    const handleCommentSubmit = (comment) => {
        comments.current = [...comments.current, comment];
        setScroll(true);
        setNewComment('');
        setLoadComment(false);
    };

    const sendComment = () => {
        setLoadComment(true);
        let commentId = 1;
        if (comments.current.length > 0) {
            commentId = comments.current.at(-1).id + 1;
        }
        console.log(comments.current);
        stompClient.publish({
            destination: `/app/addComment/pin_id/${pinID}`,

            body: JSON.stringify({
                // commentId: comments.current.at(-1).id + 1,
                commentId,
                userId: currentUser.id,
                pinId: pin.id,
                content: newComment,
            }),
        });
        setSubmitComment(true);
        setRed(false);
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
        <div className={cx('wrapper-createPage')}>
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
                                <AccountInfo userImage={user.avatar} username={user.username} />
                            </div>
                            {/* <div className={cx('comment-container')}>
                            </div> */}
                            <div className={cx('comment-container')}>
                                <div className={cx('like')}>
                                    <h3 className={cx('comment-title')}>Nhận xét</h3>
                                    <LikeCard pinID={pinID} currentUser={currentUser} />
                                </div>
                                <CommentApp
                                    scroll={scroll}
                                    setScroll={setScroll}
                                    comments={comments}
                                    currentUser={currentUser}
                                />
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
                                    onChange={(e) => {
                                        setNewComment(e.target.value);
                                        changeBtn(e);
                                    }}
                                    onKeyDown={(e) => handlePressEnter(e)}
                                />
                                {red ? (
                                    <Button className={cx('send-btn')} onClick={() => sendComment()} red>
                                        <FontAwesomeIcon icon={faPaperPlane} style={{ fontsize: '14px' }} />
                                    </Button>
                                ) : (
                                    <Button className={cx('send-btn')} primary>
                                        {loadComment ? (
                                            <CircularProgress style={{ width: '16px', height: '16px' }} />
                                        ) : (
                                            <FontAwesomeIcon icon={faPaperPlane} style={{ fontsize: '14px' }} />
                                        )}
                                    </Button>
                                )}
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
            {statusSave && <ActionAlerts content={`Đã lưu pin`} action="UNDO" />}
            {showSelectReport && (
                <SelectReportOption handleTurnOnSelectReport={handleTurnOnSelectReport} pin={pin} user={currentUser} />
            )}
        </div>
    );
}

export default DisplayPin;
