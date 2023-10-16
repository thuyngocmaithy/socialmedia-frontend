import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import Pin from '../../components/Pin';
import Wrapper from './Wrapper';
import { AccountOtherContext } from '../../context/AccountOtherContext';
import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as pinServices from '../../services/pinServices';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import LabelTextBox from '../../components/LabelTextBox';
import Button from '../../components/Button';

const cx = classNames.bind(styles);

function PinCreated() {
    const accountOther = useContext(AccountOtherContext);
    const [open, setOpen] = useState(false);
    const [listPin, setListPin] = useState([]);

    const location = useLocation();
    const pathname = location.pathname.split('/')[1];

    useEffect(() => {
        const fetchApi = async () => {
            const result = await pinServices.getAllPin(pathname);
            setListPin(result);
        };
        fetchApi();
    }, [pathname]);

    const handleEdit = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        listPin.length !== 0 && (
            <Wrapper>
                <div className={cx('pin-created')}>
                    {listPin.map((pin, index) => {
                        return (
                            <Pin
                                key={index}
                                image={pin.image}
                                linkImage={pin.link}
                                title={pin.title}
                                pinCreated={!accountOther}
                                handleEdit={handleEdit}
                            />
                        );
                    })}
                </div>
                <Dialog fullWidth={true} maxWidth="sm" open={open} onClose={handleClose}>
                    <DialogTitle sx={{ marginTop: '10px', fontSize: '20px', fontWeight: '700', textAlign: 'center' }}>
                        Chỉnh sửa
                    </DialogTitle>
                    <DialogContent>
                        <LabelTextBox placeholder={'Tiêu đề'} label={'Tiêu đề'} selectedSize={'medium'} />
                        <LabelTextBox placeholder={'Mô tả'} label={'Mô tả'} selectedSize={'medium'} />
                        <LabelTextBox placeholder={'Liên kết'} label={'Liên kết'} selectedSize={'medium'} />
                    </DialogContent>
                    <DialogActions sx={{ marginBottom: '10px' }}>
                        <Button sx={{ fontSize: '14px' }} onClick={handleClose}>
                            Hủy
                        </Button>
                        <Button sx={{ fontSize: '14px' }} red onClick={handleClose}>
                            Sửa
                        </Button>
                    </DialogActions>
                </Dialog>
            </Wrapper>
        )
    );
}

export default PinCreated;
