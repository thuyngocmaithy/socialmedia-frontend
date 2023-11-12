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
import { useState, useEffect, useRef } from 'react';
import Popper from '../Popper';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import * as userSavePinServices from '../../services/userSavePinServices';
import * as pinServices from '../../services/pinServices';
import * as boardServices from '../../services/boardServices';
import * as userServices from '../../services/userServices';
import SharePopper from '../Popper/SharePopper';

const cx = classNames.bind(styles);

function Pin({ id, image, linkImage, title, userImage, username, pinCreated = false, handleEdit, onSaveResult }) {
    const [activeOptionTop, setActiveOptionTop] = useState(false);
    const [activeOptionBottom, setActiveOptionBottom] = useState(false);

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

    const [data, setData] = useState('');

    const getData = (boardId) => {
        setData(boardId);
    };
    const handleSave = () => {
        const fetchApi = async () => {
            const userId = 1;
            const pinId = id;
            const boardId = data.id;

            const user = await userServices.getUserById(userId);
            const pin = await pinServices.getPinById(pinId);
            const board = await boardServices.getBoardById(boardId);

            const userSavePin = { user, pin, board };
            const result = await userSavePinServices.save(userSavePin);
            if (result) {
                onSaveResult(true);
                setData('Chọn bang');
            }
        };
        fetchApi();
    };

    const download = (url) => {
        console.log(url);
        fetch(url, {
            method: 'GET',
            mode: 'no-cors',
            headers: {},
        })
            .then((response) => {
                response.arrayBuffer().then(function (buffer) {
                    const url = window.URL.createObjectURL(new Blob([buffer]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'image.jpg'); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };
    // const download = async (url) => {
    //     console.log(url);
    //     const originalImage = url;
    //     const image = await fetch(originalImage, { mode: 'no-cors' });

    //     // Split image name
    //     const nameSplit = originalImage.split('/');
    //     const duplicateName = nameSplit.pop();

    //     const imageBlog = await image.blob();
    //     const imageURL = URL.createObjectURL(imageBlog);
    //     const link = document.createElement('a');
    //     link.href = imageURL;
    //     link.download = '' + duplicateName + '';
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    // };
    const openImage = (url) => {
        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('container-image')}>
                    <img className={cx('image')} src={image} alt="" />
                    {pinCreated ? null : (
                        <div className={cx('option-top', { active: activeOptionTop })}>
                            <ClickAwayListener onClickAway={handleClickAwaySelectBoard}>
                                <button className={cx('select-board-btn')} onClick={handleDisplay}>
                                    <Popper
                                        idPopper={`selectBoard${id}`}
                                        contentTitle={data.name || 'Chọn bảng'}
                                        title={<FontAwesomeIcon icon={faChevronDown} />}
                                        className={cx('select-board')}
                                        body={<SelectBoardPopper getData={getData} />}
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
                            <button onClick={handleOpenShare} className={cx(pinCreated ? 'btn-end' : 'btn')}>
                                <Popper
                                    idPopper={`share${id}`}
                                    contentTitle={<ShareIcon className={cx('action', 'gUZ', 'R19', 'U9O', 'kVc')} />}
                                    className={cx('share-menu')}
                                    body={<SharePopper />}
                                    widthBody="maxContent"
                                />
                            </button>
                        </ClickAwayListener>

                        {pinCreated ? null : (
                            <Tippy delay={[0, 100]} content="Lưu ảnh" placement="bottom">
                                <button
                                    onClick={(e) => {
                                        download(image);
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

            {/* <Popover
                id={shareMenuId}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    horizontal: 'center',
                }}
                open={openedShare}
                onClose={handleCloseShare}
                anchorEl={anchorEl}
            >
                <ShareMenu />
            </Popover> */}
        </>
    );
}

export default Pin;
