import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import Wrapper from './Wrapper';
import Board from '../../components/Board';
import SimplePopper from '../../components/SimplePopper';
import { FilterIcon, CreateBoardIcon } from '../../components/Icons';
import OptionPopper from '../../components/SimplePopper/OptionPopper';
import { AccountOtherContext } from '../../context/AccountOtherContext';
import { useContext, useState, useEffect } from 'react';
import * as pinServices from '../../services/pinServices';
import * as boardServices from '../../services/boardServices';
import { useLocation } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import LabelTextBox from '../../components/LabelTextBox';
import Button from '../../components/Button';

const cx = classNames.bind(styles);

function PinSaved() {
    const accountOther = useContext(AccountOtherContext);
    const [openEdit, setOpenEdit] = useState(false);
    const [openCreateBoard, setOpenCreateBoard] = useState(false);
    const [listBoard, setListBoard] = useState([]);

    const handleEdit = () => {
        setOpenEdit(true);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    const handleCreateBoard = () => {
        setOpenCreateBoard(true);
    };

    const handleCloseCreateBoard = () => {
        setOpenCreateBoard(false);
    };

    const filterBoardPopper = {
        title: 'Sắp xếp theo',
        item: [
            { id: '1', content: 'A đến Z' },
            { id: '2', content: 'Tùy chỉnh' },
            { id: '3', content: 'Đã lưu lần cuối vào' },
        ],
        width: '270px',
    };
    const createBoardPopper = {
        title: 'Tạo',
        item: [
            { id: '1', content: 'Ghim', handleClick: '' },
            { id: '2', content: 'Bảng', handleClick: { handleCreateBoard } },
        ],
        width: '150px',
    };

    const location = useLocation();
    const pathname = location.pathname.split('/')[1];

    useEffect(() => {
        const fetchApi = async () => {
            const result = await boardServices.getAllBoard(pathname);
            setListBoard(result);

            const promises = result.map(async (board) => {
                const resultPin = await pinServices.getPinByBoardId(board.boardId);
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
                    console.log('render-promises');
                })
                .catch((error) => {
                    console.error(error);
                });
        };
        fetchApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    return (
        <Wrapper>
            <div className={cx('wrapper-pin-saved')}>
                {accountOther ? null : (
                    <div className={cx('option')}>
                        <SimplePopper
                            title={<FilterIcon className={cx('action', 'icon')} />}
                            body={<OptionPopper data={filterBoardPopper} />}
                            widthBody="maxContent"
                            placement="bottom-start"
                        />
                        <SimplePopper
                            title={<CreateBoardIcon className={cx('action', 'icon')} />}
                            body={<OptionPopper data={createBoardPopper} />}
                            widthBody="maxContent"
                            placement="bottom-end"
                        />
                    </div>
                )}

                <div className={cx('pin-saved')}>
                    {listBoard.map((board, index) => {
                        return (
                            <Board
                                key={index}
                                title={board.name}
                                detailBoard={board.detailBoard}
                                countPin={board.count}
                                accountOther={accountOther}
                                handleEdit={handleEdit}
                            />
                        );
                    })}
                </div>
                <Dialog fullWidth={true} maxWidth="sm" open={openEdit} onClose={handleCloseEdit}>
                    <DialogTitle sx={{ marginTop: '10px', fontSize: '20px', fontWeight: '700', textAlign: 'center' }}>
                        Chỉnh sửa
                    </DialogTitle>
                    <DialogContent>
                        <LabelTextBox placeholder={'Tiêu đề'} label={'Tiêu đề'} selectedSize={'medium'} />
                        <LabelTextBox placeholder={'Mô tả'} label={'Mô tả'} selectedSize={'medium'} />
                        <LabelTextBox placeholder={'Liên kết'} label={'Liên kết'} selectedSize={'medium'} />
                    </DialogContent>
                    <DialogActions sx={{ marginBottom: '10px' }}>
                        <Button sx={{ fontSize: '14px' }} onClick={handleCloseEdit}>
                            Hủy
                        </Button>
                        <Button sx={{ fontSize: '14px' }} red onClick={handleCloseEdit}>
                            Sửa
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog fullWidth={true} maxWidth="sm" open={openCreateBoard} onClose={handleCloseCreateBoard}>
                    <DialogTitle sx={{ marginTop: '10px', fontSize: '20px', fontWeight: '700', textAlign: 'center' }}>
                        Tạo bảng
                    </DialogTitle>
                    <DialogContent>
                        <LabelTextBox placeholder={'Tiêu đề'} label={'Tiêu đề'} selectedSize={'medium'} />
                        <LabelTextBox placeholder={'Mô tả'} label={'Mô tả'} selectedSize={'medium'} />
                        <LabelTextBox placeholder={'Liên kết'} label={'Liên kết'} selectedSize={'medium'} />
                    </DialogContent>
                    <DialogActions sx={{ marginBottom: '10px' }}>
                        <Button sx={{ fontSize: '14px' }} onClick={handleCloseCreateBoard}>
                            Hủy
                        </Button>
                        <Button sx={{ fontSize: '14px' }} red onClick={handleCloseCreateBoard}>
                            Sửa
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </Wrapper>
    );
}

export default PinSaved;
