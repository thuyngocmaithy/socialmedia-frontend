import EnhancedTable from '../../../components/Table';
import classNames from 'classnames/bind';
import styles from './User.module.scss';
import { useContext, useEffect, useState } from 'react';
import * as userServices from '../../../services/userServices';
import * as permissionServices from '../../../services/permissionServices';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import LabelTextBox from '../../../components/LabelTextBox';
import Button from '../../../components/Button';
import ActionAlerts from '../../../components/Alert';
import { ThemeContext } from '../../../context/ThemeContext';

const cx = classNames.bind(styles);

function User() {
    const { theme } = useContext(ThemeContext);
    const [listUser, setListUser] = useState([]);
    const [createSuccess, setCreateSuccess] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [listDelete, setListDelete] = useState([]);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
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

    useEffect(() => {
        const fetchApi = async () => {
            let result = await userServices.getAllUser();
            result = result.filter((item) => item.permission !== null && (item.permission.id === 2 || item.permission.id === 1));
            setListUser(result);

            setCreateSuccess(false);
            setDeleteSuccess(false);
        };
        fetchApi();
    }, [createSuccess, deleteSuccess]);

    const headCells = [
        {
            id: 'id',
            numeric: false,
            disablePadding: true,
            label: 'ID',
        },
        {
            id: 'fullname',
            numeric: true,
            disablePadding: false,
            label: 'Họ tên',
        },
        {
            id: 'username',
            numeric: true,
            disablePadding: false,
            label: 'Tên người dùng',
        },
        {
            id: 'gender',
            numeric: true,
            disablePadding: false,
            label: 'Giới tính',
        },
        {
            id: 'birthdate',
            numeric: true,
            disablePadding: false,
            label: 'Ngày sinh',
        },
        {
            id: 'email',
            numeric: true,
            disablePadding: false,
            label: 'Email',
        },
    ];
    function createData(id, fullname, username, gender, birthdate, email) {
        return {
            id,
            fullname,
            username,
            gender,
            birthdate,
            email,
        };
    }

    const rows = listUser.map((user) => {
        return createData(user.id, user.fullname, user.username, user.gender, user.birthdate, user.email);
    });

    const handleCreate = () => {
        setOpenCreate(true);
    };

    const handleCloseCreate = () => {
        setOpenCreate(false);
    };

    const handleSubmitCreate = async (event) => {
        event.preventDefault();
        const firstname = event.target.elements.firstname.value !== '' ? event.target.elements.firstname.value : null;
        const lastname = event.target.elements.lastname.value !== '' ? event.target.elements.lastname.value : null;
        const fullname = firstname + ' ' + lastname;
        const email = event.target.elements.email.value !== '' ? event.target.elements.email.value : null;
        const username = email.split('@')[0];
        const birthdate = event.target.elements.birthdate.value !== '' ? event.target.elements.birthdate.value : null;
        const language = 'Tiếng Việt';
        const privateBool = false;
        const avtar = null;
        const gender = null;
        const website = null;
        const introduce = null;
        const password = '12345678';
        const permission = await permissionServices.getPermissionById(2);

        const user = {
            avtar,
            birthdate,
            email,
            fullname,
            gender,
            introduce,
            language,
            password,
            privateBool,
            username,
            website,
            permission,
        };
        const result = await userServices.add(user);

        if (result) {
            setOpenCreate(false);
            setCreateSuccess(true);
            showAlert('create');
        }
    };
    const handleDelete = async (selected) => {
        setListDelete(selected);
        setConfirmDelete(true);
    };
    const handleSubmitDelete = async (event) => {
        let deleteBool = true;
        event.preventDefault();
        listDelete.map(async (item) => {
            const result = await userServices.deleteById(item);
            if (!result) {
                deleteBool = false;
            }
        });
        if (deleteBool) {
            setConfirmDelete(false);
            setDeleteSuccess(true);
            showAlert('delete');
        }
    };
    const handleCloseConfirm = () => {
        setConfirmDelete(false);
    };

    return (
        <div className={cx('wrapper')}>
            <EnhancedTable
                edit={false}
                headCells={headCells}
                rows={rows}
                title="Quản lý người dùng"
                handleDelete={handleDelete}
                handleAdd={handleCreate}
                deleteSuccess={deleteSuccess}
            />
            <Dialog
                className={cx(theme === 'dark' ? 'dark' : '')}
                fullWidth={true}
                maxWidth="sm"
                open={openCreate}
                onClose={handleCloseCreate}
            >
                <form onSubmit={handleSubmitCreate}>
                    <DialogTitle sx={{ marginTop: '10px', fontSize: '20px', fontWeight: '700', textAlign: 'center' }}>
                        Thêm người dùng
                    </DialogTitle>
                    <DialogContent>
                        <div style={{ display: 'flex' }}>
                            <LabelTextBox name={'firstname'} placeholder={'Họ'} label={'Họ'} selectedSize={'small'} />
                            <LabelTextBox name={'lastname'} placeholder={'Tên'} label={'Tên'} selectedSize={'small'} />
                        </div>
                        <div style={{ display: 'flex' }}>
                            <LabelTextBox name={'email'} placeholder={'Email'} label={'Email'} selectedSize={'small'} />
                            <LabelTextBox
                                name={'birthdate'}
                                placeholder={'Ngày sinh'}
                                label={'Ngày sinh'}
                                type={'date'}
                                selectedSize={'small'}
                            />
                        </div>
                    </DialogContent>
                    <DialogActions sx={{ marginBottom: '10px' }}>
                        <Button style={{ fontSize: '14px' }} type="button" onClick={handleCloseCreate}>
                            Hủy
                        </Button>
                        <Button style={{ fontSize: '14px' }} red type="submit">
                            Tạo
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
            {confirmDelete && (
                <Dialog
                    className={cx(theme === 'dark' ? 'dark' : '')}
                    fullWidth={true}
                    maxWidth="sm"
                    open={confirmDelete}
                >
                    <DialogTitle sx={{ marginTop: '10px', fontSize: '20px', fontWeight: '700', textAlign: 'center' }}>
                        Xóa người dùng?
                    </DialogTitle>
                    <form onSubmit={handleSubmitDelete}>
                        <DialogContent>Tất cả người dùng đã chọn sẽ được xóa khỏi hệ thống.</DialogContent>
                        <DialogActions sx={{ marginBottom: '10px' }}>
                            <div>
                                <Button style={{ fontSize: '14px' }} type="button" onClick={handleCloseConfirm}>
                                    Hủy
                                </Button>
                                <Button style={{ fontSize: '14px', marginLeft: '8px' }} red type="submit">
                                    Xóa
                                </Button>
                            </div>
                        </DialogActions>
                    </form>
                </Dialog>
            )}
            {alertType === 'create' && <ActionAlerts content={`Đã thêm thành công`} />}
            {alertType === 'delete' && <ActionAlerts content={`Đã xóa thành công`} />}
            {alertType === 'save' && <ActionAlerts content={`Đã sửa thành công`} />}
        </div>
    );
}

export default User;
