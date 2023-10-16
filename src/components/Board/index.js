import classNames from 'classnames/bind';
import styles from './Board.module.scss';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { EditIcon } from '../Icons';
import Image from '../Image';
import images from '../../assets/images';

const cx = classNames.bind(styles);

function Board({ title, detailBoard, accountOther, handleEdit }) {
    const link = title.replace(' ', '-').toLowerCase();
    const handleEditClick = (event) => {
        event.preventDefault();
        handleEdit();
    };
    return (
        detailBoard && (
            <a href={`${link}`} className={cx('wrapper')}>
                <div className={cx('container-image')}>
                    <div className={cx('images')}>
                        <div className={cx('image-left')}>
                            <Image
                                fallback={images.backgroundGray}
                                className={cx('image-left')}
                                src={detailBoard[0] !== undefined ? detailBoard[0] : ''}
                                alt=""
                            />
                        </div>

                        <div className={cx('images-right')}>
                            <div className={cx('image-right')}>
                                <Image
                                    fallback={images.backgroundGray}
                                    src={detailBoard[1] !== undefined ? detailBoard[1] : ''}
                                    alt=""
                                />
                            </div>
                            <div className={cx('image-right')}>
                                <Image
                                    fallback={images.backgroundGray}
                                    src={detailBoard[2] !== undefined ? detailBoard[2] : ''}
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                    {accountOther ? null : (
                        <div className={cx('option')}>
                            <Tippy delay={[0, 100]} content="Chỉnh sửa" placement="bottom">
                                <button className={cx('btn')} onClick={handleEditClick}>
                                    <EditIcon className={cx('action', 'gUZ', 'R19', 'U9O', 'kVc')} />
                                </button>
                            </Tippy>
                        </div>
                    )}
                </div>
                <div className={cx('info-board')}>
                    <h2 className={cx('title')}>{title}</h2>
                    <span className={cx('quantity-pin')}>{detailBoard.length} ghim</span>
                    <span className={cx('time-created')}>2 ngày</span>
                </div>
            </a>
        )
    );
}

export default Board;
