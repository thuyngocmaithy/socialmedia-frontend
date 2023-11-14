import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import styles from './Create.module.scss';
import AccountInfo from '../../components/AccountInfo';
import Button from '../../components/Button';
import LoadImage from '../../components/LoadImage';
import Popper from '../../components/Popper';
import SelectBoardPopper from '../../components/Popper/SelectBoardPopper';
import CreateBoard from '../../components/CreateBoard';
import SelectTypePopper from '../../components/Popper/SelectTypePopper';
import CreateType from '../../components/CreateType';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import ActionAlerts from '../../components/Alert';
import * as userServices from '../../services/userServices';
import * as pinServices from '../../services/pinServices';

const cx = classNames.bind(styles);

function Create() {
    //select board
    const [activeOptionTop, setActiveOptionTop] = useState(false);

    const handleClickAway = () => {
        setActiveOptionTop(false);
    };
    const handleDisplay = () => {
        setActiveOptionTop(true);
    };

    // HandleChooseBoard
    const [currentBoard, setBoard] = useState({name:'Chọn bảng'});
    const handleChooseBoard = (currentBoard) => {
        setBoard(currentBoard);
        // console.log(currentBoard.name);

    }

    // HandleChooseType
    const [currentType, setType] = useState({typeName:'Chọn Thể Loại'});
    const handleChooseType = (currentType) => {
        setType(currentType);
        // console.log(currentType.typeName);

    }

    // Get IMG from LoadImage
    const [img, setIMG] = useState();

    const handleChangeIMGPath = (path) => {
        setIMG(path);
        // console.log(path);
    }
    //count length
    const [valContent, setValContent] = useState('');
    const handleCountContent = (e) => {
        setValContent(e.target.value);
    };

    const [valTitle, setValTitle] = useState('');
    const handleCountTitle = (e) => {
        setValTitle(e.target.value);
    };


   
    //save pin
    const handleInsertPin = async () => {
        const userId = 1;
        const user = await userServices.getUserById(userId);
        const image = img;
        setBoard(currentBoard);
        const board = currentBoard;
        setType(currentType);
        const type = currentType;
        const title = valTitle;
        const description = valContent;
        const created_at = new Date();
        if (image && board.name !== 'Chọn bảng' && type.typeName !== 'Chọn Thể Loại' && title && description) {
            const pin = {description, image, title, board, type, user, created_at};
            const result = await pinServices.save(pin);

            handleSaveResult(true);
        } 
        else {
            alert('Nhập đầy đủ thông tin !!!');
        }
        // console.log(pin);
    }
    const [statusSave, setSatusSave] = useState(false);

    const handleSaveResult = (result) => {
        setSatusSave(result);

        // Nếu result là true, đặt một timeout để đặt lại statusSave sau một khoảng thời gian
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
    }

    // Turn on CreateType
    const [showCreateType, setShowCreateType] = React.useState(false);
    const handleTurnOnCreateType = (isShown) => {
        setShowCreateType(isShown);
    }
   

    //auto resize textarea
    const titleRef = React.useRef();
    const contentRef = React.useRef();
    const [value, setValue] = React.useState();
    const onChange = (event) => {
        setValue(event.target.value);
    };
    const autoResize = (ref) => {
        if (ref && ref.current) {
            ref.current.style.height = '0px';
            const taHeight = ref.current.scrollHeight;
            ref.current.style.height = taHeight + 'px';
        }
    };
    React.useEffect(() => {
        autoResize(titleRef);
        autoResize(contentRef);
    }, [value]);

    // const [user, setUser] = React.useState();
    // const getUser = async () => {
    //     const userId = 1;
    //     const user = await userServices.getUserById(userId);
    //     setUser(user);
    // }
    // getUser();
    const avt = {
        // avatar: user.avatar,
        // username: user.username,
        avatar: '../avt.jpg',
        username: 'Cynthia Anna',
    };

    return (
        <div className={cx('wrapper-createPage')}>
            <div className={cx('createBox')}>
                <div className={cx('wrapperBtns')}>

                    <div className={cx('option-top', { active: activeOptionTop })}>
                        <ClickAwayListener onClickAway={handleClickAway}>
                            <button className={cx('select-board-btn')} onClick={() => handleDisplay()}>
                                <Popper
                                    // idPopper={id}
                                    contentTitle={currentBoard.name}
                                    title={<FontAwesomeIcon icon={faChevronDown} />}
                                    className={cx('select-board')}
                                    body={<SelectBoardPopper handleTurnOnCreateBoard={handleTurnOnCreateBoard} handleChooseBoard={handleChooseBoard}/>}
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
                {/* end header  */}
                <div className={cx('mainContent')}>
                    <LoadImage handleChangeIMGPath={handleChangeIMGPath}></LoadImage>
                    {/* end upload IMG */}
                    <div className={cx('insertData')}>
                        <div className={cx('title')}>
                            <textarea
                                className={cx('inputTitle')}
                                type="text"
                                placeholder="Tạo tiêu đề"
                                maxLength="100"
                                rows="1"
                                ref={titleRef}
                                onChange={(e) => {
                                    handleCountTitle(e);
                                    onChange(e);
                                }}
                                value={valTitle}
                            ></textarea>
                            <div className={cx('line')}></div>
                            <div className={cx('hidden-length', 'hidenTitle')}>
                                <p className={cx('hiddenText-title')}>
                                    40 ký tự đầu tiên của bạn là nội dung thường xuất hiện trong bảng tin
                                </p>
                                <p className={cx('titleLength')}>{100 - valTitle.length}</p>
                            </div>
                        </div>
                        <div className={cx('container-user')}>
                            <AccountInfo userImage={avt.avatar} username={avt.username} />
                        </div>

                        <div className={cx('content')}>
                            <textarea
                                className={cx('inputContent')}
                                type="text"
                                placeholder="Cho mọi người biết Ghim của bạn giới thiệu điều gì"
                                maxLength="500"
                                ref={contentRef}
                                rows="1"
                                onChange={(e) => {
                                    handleCountContent(e);
                                    onChange(e);
                                }}
                                value={valContent}
                            ></textarea>
                            <div className={cx('line')}></div>
                            <div className={cx('hidden-length', 'hidenContent')}>
                                <p className={cx('hiddenText-content')}>
                                    Mọi người thường sẽ thấy 50 ký tự đầu tiên khi họ nhấp vào Ghim của bạn
                                </p>
                                <p className={cx('titleLength')}>{500 - valContent.length}</p>
                            </div>
                        </div>
                        {/* select type */}
                        <div className={cx('selectType', { active: activeOptionTop })}>
                            <ClickAwayListener onClickAway={handleClickAway}>
                                <button className={cx('select-type-btn')} onClick={() => handleDisplay()}>
                                    <Popper
                                        // idPopper={id}
                                        contentTitle={currentType.typeName}
                                        title={<FontAwesomeIcon icon={faChevronDown} />}
                                        className={cx('select-type')}
                                        body={<SelectTypePopper handleTurnOnCreateType={handleTurnOnCreateType} handleChooseType={handleChooseType}/>}
                                        widthBody="maxContent"
                                    />
                                </button>
                            </ClickAwayListener>
                    </div>
                    </div>
                </div>
            </div>
            
            {showCreateBoard &&
                <div className={cx('createBoard')}>
                    <CreateBoard handleTurnOnCreateBoard={handleTurnOnCreateBoard} handleChooseBoard={handleChooseBoard} />
                </div>            
            }

            {showCreateType &&
                <div className={cx('createType')}>
                    <CreateType handleTurnOnCreateType={handleTurnOnCreateType} handleChooseType={handleChooseType} />
                </div>            
            }
            {statusSave && <ActionAlerts content={`Đã lưu pin`} action="UNDO" />}
        </div>
    );
}

export default Create;
