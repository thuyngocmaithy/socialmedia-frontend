import styles from './SelectBoardPopper.module.scss';
import classNames from 'classnames/bind';
import { CreateBoardIcon } from '../../Icons';
import Search from '../../Search';
import { useState, useEffect } from 'react';
import * as boardServices from '../../../services/boardServices';
import * as userSavePinServices from '../../../services/userSavePinServices';

const cx = classNames.bind(styles);

function SelectBoardPopper() {
    const [listBoard, setListBoard] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            const result = await boardServices.getBoardByUsername('thuyngocmaithyy');

            const promises = result.map(async (board) => {
                const resultPin = await userSavePinServices.getPinByUserIdAndBoardId('thuyngocmaithyy', board.id);
                let detailBoard = [];
                resultPin.map((pin) => {
                    return (detailBoard = [...detailBoard, pin.image]);
                });
                return detailBoard;
            });
            // Sử dụng Promise.all để chờ tất cả các promise hoàn thành
            Promise.all(promises)
                .then((results) => {
                    // Khi tất cả promise đã hoàn thành, gộp kết quả vào listPin
                    setListBoard(
                        result.map((board, index) => {
                            return {
                                ...board,
                                detailBoard: results[index],
                            };
                        }),
                    );
                })
                .catch((error) => {
                    console.error(error);
                });
        };
        fetchApi();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <Search className={cx('search-conversation')} width="300px" />
            <p className={cx('information')}>Tất cả các bảng</p>
            <div className={cx('list-board')}>
                {listBoard.map((item, index) => {
                    console.log(item.detailBoard[0]);
                    return (
                        <button key={index} className={cx('item-board')}>
                            <img src={item.detailBoard[0]} alt="" />
                            <p>{item.name}</p>
                        </button>
                    );
                })}
            </div>

            <div className={cx('bottom-create')}>
                <button className={cx('createBtn')}>
                    <CreateBoardIcon className={cx('action', 'gUZ', 'R19', 'U9O', 'kVc')} />
                </button>
                <p>Tạo bảng</p>
            </div>
        </div>
    );
}

export default SelectBoardPopper;
