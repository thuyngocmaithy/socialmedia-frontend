import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import classNames from 'classnames/bind';
import styles from './Pin.module.scss';
import { ShareIcon, DownloadIcon, AccessIcon, EditIcon } from '../Icons';
import AccountInfo from '../AccountInfo';
import Button from '../Button';
import SelectBoardPopper from '../Popper/SelectBoardPopper';
import { useState, useEffect } from 'react';
import Popper from '../Popper';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import * as userSavePinServices from '../../services/userSavePinServices';
import * as pinServices from '../../services/pinServices';
import * as boardServices from '../../services/boardServices';
import * as userServices from '../../services/userServices';

const cx = classNames.bind(styles);

function Pin({ id, image, linkImage, title, userImage, username, pinCreated = false, handleEdit, onSaveResult }) {
    const [activeOptionTop, setActiveOptionTop] = useState(false);
    const handleDisplay = () => {
        setActiveOptionTop(true);
    };
    const handleClickAway = () => {
        setActiveOptionTop(false);
    };
    const handleSave = () => {
        const fetchApi = async () => {
            const userId = 1;
            const pinId = id;
            const boardId = 1;

            const user = await userServices.getUserById(userId);
            const pin = await pinServices.getPinById(pinId);
            const board = await boardServices.getBoardById(boardId);

            const userSavePin = { user, pin, board };
            const result = await userSavePinServices.save(userSavePin);
            if (result) {
                onSaveResult(true);
            }
        };
        fetchApi();
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container-image')}>
                <img className={cx('image')} src={image} alt="" />
                {pinCreated ? null : (
                    <div className={cx('option-top', { active: activeOptionTop })}>
                        <ClickAwayListener onClickAway={handleClickAway}>
                            <button className={cx('select-board-btn')} onClick={handleDisplay}>
                                <Popper
                                    idPopper={id}
                                    contentTitle={'Chọn bảng'}
                                    title={<FontAwesomeIcon icon={faChevronDown} />}
                                    className={cx('select-board')}
                                    body={<SelectBoardPopper />}
                                    widthBody="maxContent"
                                />
                            </button>
                        </ClickAwayListener>

                        <Button className={cx('saveBtn')} red onClick={handleSave}>
                            Lưu
                        </Button>
                    </div>
                )}
                <div className={cx('option-bottom')}>
                    {linkImage && (
                        <button className={cx('btn-text')}>
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

                    <Tippy delay={[0, 100]} content="Chia sẻ" placement="bottom">
                        <button className={cx(pinCreated ? 'btn-end' : 'btn')}>
                            <ShareIcon className={cx('action', 'gUZ', 'R19', 'U9O', 'kVc')} />
                        </button>
                    </Tippy>
                    {pinCreated ? null : (
                        <Tippy delay={[0, 100]} content="Lưu ảnh" placement="bottom">
                            <button className={cx('btn-end')}>
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
    );
}

export default Pin;
