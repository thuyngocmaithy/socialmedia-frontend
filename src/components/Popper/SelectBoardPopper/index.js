import styles from './SelectBoardPopper.module.scss';
import classNames from 'classnames/bind';
import { CreateBoardIcon } from '../../Icons';
import Search from '../../Search';
import React, { useState, useEffect, useContext } from 'react';
import * as boardServices from '../../../services/boardServices';
import * as userSavePinServices from '../../../services/userSavePinServices';
import * as userServices from '../../../services/userServices';
import Image from '../../Image';
import { ThemeContext } from '../../../context/ThemeContext';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import LabelTextBox from '../../LabelTextBox';
import Button from '../../Button';
import ActionAlerts from '../../Alert';
import { AccountLoginContext } from '../../../context/AccountLoginContext';


const cx = classNames.bind(styles);

function SelectBoardPopper({ handleTurnOnCreateBoard, getData }) {
    const { theme } = useContext(ThemeContext);
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

    //create Type
    //Open hộp thoại add
    const [openCreateBoard, setOpenCreateBoard] = useState(false);
    const [createSuccess, setCreateSuccess] = useState(false);
    const { userId } = useContext(AccountLoginContext);

    const handleCreateBoard = () => {
        handleTurnOnCreateBoard(true);
    };

    const handleSubmitCreate = async (event) => {
        event.preventDefault();
        const user = await userServices.getUserById(userId);
        const description =
            event.target.elements.descriptionAdd.value !== '' ? event.target.elements.descriptionAdd.value : null;
        const name = event.target.elements.nameAdd.value !== '' ? event.target.elements.nameAdd.value : null;
        const createdAt = null;

        const board = { description, name, user, createdAt };
        const result = await boardServices.add(board);

        if (result) {
            setOpenCreateBoard(false);
            setCreateSuccess(true);
            showAlert('create');
        }
    };

    const handleCloseCreateBoard = () => {
        setOpenCreateBoard(false);
    };

    const [alertType, setAlertType] = useState(null);
    const [alertVisible, setAlertVisible] = useState(false);

    const showAlert = (type) => {
        setAlertType(type);
        setAlertVisible(true);

        const timeoutId = setTimeout(() => {
            setAlertVisible(false);
            setAlertType(null); // Đặt alertType về null khi ẩn thông báo
        }, 2500);

        return timeoutId;
    };
    
    return (
        <>
            <div className={cx('wrapper')}>
                <Search className={cx('search-conversation')} width="300px" />
                <p className={cx('information')}>Tất cả các bảng</p>
                <div className={cx('list-board')}>
                    {listBoard.map((item, index) => {
                        return (
                            <button
                                key={index}
                                className={cx('item-board', theme === 'dark' ? 'dark' : '')}
                                onClick={() => getData(item)}
                            >
                                <Image
                                    src={item.detailBoard[0] && `data:image/jpeg;base64,${item.detailBoard[0]}`}
                                    alt=""
                                />

                                <p>{item.name}</p>
                            </button>
                        );
                    })}
                </div>

                <div className={cx('bottom-create', theme === 'dark' ? 'dark' : '')} onClick={() => handleCreateBoard()}>
                    <button className={cx('createBtn')}>
                        <CreateBoardIcon className={cx('action', 'gUZ', 'R19', 'U9O', 'kVc')} />
                    </button>
                    <p>Tạo bảng</p>
                </div>
            </div>
            <Dialog fullWidth={true} maxWidth="sm" open={openCreateBoard} onClose={handleCloseCreateBoard}>
                <form onSubmit={handleSubmitCreate}>
                    <DialogTitle
                        sx={{ marginTop: '10px', fontSize: '20px', fontWeight: '700', textAlign: 'center' }}
                    >
                        Tạo bảng
                    </DialogTitle>
                    <DialogContent>
                        <LabelTextBox
                            name={'nameAdd'}
                            placeholder={'Tiêu đề'}
                            label={'Tên bảng'}
                            selectedSize={'medium'}
                            // text={boardEdit.name ? boardEdit.name : ''}
                        />
                        <LabelTextBox
                            name={'descriptionAdd'}
                            placeholder={'Mô tả'}
                            label={'Mô tả'}
                            selectedSize={'medium'}
                            // text={boardEdit.description ? boardEdit.description : ''}
                        />
                    </DialogContent>
                    <DialogActions sx={{ marginBottom: '10px' }}>
                        <Button style={{ fontSize: '14px' }} type="button" onClick={handleCloseCreateBoard}>
                            Hủy
                        </Button>
                        <Button style={{ fontSize: '14px' }} red type="submit">
                            Tạo
                        </Button>
                    </DialogActions>
                </form>
        </Dialog>
        {alertType === 'create' && <ActionAlerts severity="success" content={`Đã thêm thành công`} />}
        </>
    );
}

export default SelectBoardPopper;
