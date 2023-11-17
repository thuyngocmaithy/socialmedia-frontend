import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import classNames from 'classnames/bind';
import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ActionAlerts from '../../components/Alert';
import Button from '../../components/Button';
import LabelTextBox from '../../components/LabelTextBox';
import Options from '../../components/Options';
import Pin from '../../components/Pin';
import { AccountOtherContext } from '../../context/AccountOtherContext';
import { ThemeContext } from '../../context/ThemeContext';
import * as pinServices from '../../services/pinServices';
import * as typeServices from '../../services/typeServices';
import styles from './Profile.module.scss';
import Wrapper from './Wrapper';
const cx = classNames.bind(styles);

function PinCreated() {
    const { theme } = useContext(ThemeContext);
    const accountOther = useContext(AccountOtherContext);
    const [isLoading, setIsLoading] = useState(true);
    const [openEdit, setOpenEdit] = useState(false);
    const [listPin, setListPin] = useState([]);
    const [listType, setListType] = useState([]);
    const [pinEdit, setPinEdit] = useState({});
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const location = useLocation();
    const pathname = location.pathname.split('/')[1];

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

    useEffect(() => {
        if (alertVisible) {
            const timeoutId = setTimeout(() => {
                setAlertVisible(false);
                setAlertType(null); // Đặt alertType về null khi ẩn thông báo
            }, 2500);

            return () => clearTimeout(timeoutId);
        }
    }, [alertVisible]);

    const handleEdit = async (id) => {
        const resultPin = await pinServices.getPinById(id);
        setPinEdit(resultPin);
        setOpenEdit(true);
    };
    const handleUpdate = async (event) => {
        event.preventDefault();
        const id = pinEdit.id;
        const image = pinEdit.image;
        const user = pinEdit.user;
        const title = event.target.elements.title.value !== '' ? event.target.elements.title.value : null;
        const description =
            event.target.elements.description.value !== '' ? event.target.elements.description.value : null;
        const link = event.target.elements.link.value !== '' ? event.target.elements.link.value : null;
        const typeId = event.target.elements.type.value !== '' ? event.target.elements.type.value : null;
        let type;
        if (typeId !== null) {
            type = await typeServices.getTypeById(typeId);
        } else {
            type = null;
        }

        const pin = { id, description, image, link, title, type, user };
        const result = await pinServices.update(id, pin);
        if (result) {
            setOpenEdit(false);
            setUpdateSuccess(true);
            showAlert('edit');
        }
    };
    const handleDelete = async () => {
        setOpenEdit(false);
        setConfirmDelete(true);
    };
    const handleSubmitDelete = async (event) => {
        event.preventDefault();
        const result = await pinServices.deleteById(pinEdit.id);
        if (result) {
            setOpenEdit(false);
            setConfirmDelete(false);
            setDeleteSuccess(true);
            showAlert('delete');
        }
    };
    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    const handleCloseConfirm = () => {
        setOpenEdit(true);
        setConfirmDelete(false);
    };

    useEffect(() => {
        const fetchApi = async () => {
            const resultPin = await pinServices.getPinsByUsername(pathname);
            setListPin(resultPin);
            const resultType = await typeServices.getAllType();
            setListType(resultType);
            setIsLoading(false); // Khi fetch API xong, đặt isLoading thành false
            setDeleteSuccess(false);
            setUpdateSuccess(false);
        };
        fetchApi();
    }, [pathname, updateSuccess, deleteSuccess]);
    return (
        isLoading === false && (
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
                                handleEdit={() => handleEdit(pin.id)}
                            />
                        );
                    })}
                </div>
                {Object.keys(pinEdit).length !== 0 && (
                    <>
                        <Dialog
                            className={cx(theme === 'dark' ? 'dark' : '')}
                            fullWidth={true}
                            maxWidth="sm"
                            open={openEdit}
                        >
                            <DialogTitle
                                sx={{ marginTop: '10px', fontSize: '20px', fontWeight: '700', textAlign: 'center' }}
                            >
                                Chỉnh sửa
                            </DialogTitle>
                            <form onSubmit={handleUpdate}>
                                <DialogContent>
                                    <LabelTextBox
                                        name={'title'}
                                        placeholder={'Tiêu đề'}
                                        label={'Tiêu đề'}
                                        text={pinEdit.title ? pinEdit.title : ''}
                                        selectedSize={'medium'}
                                    />
                                    <LabelTextBox
                                        name={'description'}
                                        placeholder={'Mô tả'}
                                        label={'Mô tả'}
                                        text={pinEdit.description ? pinEdit.description : ''}
                                        selectedSize={'sizeTextArea'}
                                        area
                                    />
                                    <LabelTextBox
                                        name={'link'}
                                        placeholder={'Liên kết'}
                                        label={'Liên kết'}
                                        text={pinEdit.link ? pinEdit.link : ''}
                                        selectedSize={'medium'}
                                    />
                                    <Options
                                        type="other"
                                        name={'type'}
                                        title={'Thể loại'}
                                        data={listType}
                                        select={pinEdit.type ? pinEdit.type.id : ''}
                                    />
                                </DialogContent>
                                <DialogActions sx={{ justifyContent: 'space-between', margin: '10px' }}>
                                    <Button style={{ fontSize: '14px' }} primary type="button" onClick={handleDelete}>
                                        Xóa
                                    </Button>
                                    <div>
                                        <Button style={{ fontSize: '14px' }} type="button" onClick={handleCloseEdit}>
                                            Hủy
                                        </Button>
                                        <Button style={{ fontSize: '14px' }} red type="submit">
                                            Sửa
                                        </Button>
                                    </div>
                                </DialogActions>
                            </form>
                        </Dialog>
                        {confirmDelete && (
                            <Dialog
                                className={cx('')}
                                fullWidth={true}
                                maxWidth="sm"
                                open={confirmDelete}
                            >
                                <DialogTitle
                                    sx={{ marginTop: '10px', fontSize: '20px', fontWeight: '700', textAlign: 'center' }}
                                >
                                    Xóa Ghim này?
                                </DialogTitle>
                                <form onSubmit={handleSubmitDelete}>
                                    <DialogContent>
                                        Nếu bạn xóa thì Ghim này sẽ biến mất và những người đã lưu Ghim sẽ không thể xem
                                        được.
                                    </DialogContent>
                                    <DialogActions sx={{ marginBottom: '10px' }}>
                                        <div>
                                            <Button
                                                sx={{ fontSize: '14px' }}
                                                type="button"
                                                onClick={handleCloseConfirm}
                                            >
                                                Hủy
                                            </Button>
                                            <Button style={{ fontSize: '14px' }} red type="submit">
                                                Xóa
                                            </Button>
                                        </div>
                                    </DialogActions>
                                </form>
                            </Dialog>
                        )}
                    </>
                )}
                {alertType === 'edit' && <ActionAlerts content={`Đã chỉnh sửa thành công`} />}
                {alertType === 'delete' && <ActionAlerts content={`Đã xóa thành công`} />}
            </Wrapper>
        )
    );
}

export default PinCreated;
