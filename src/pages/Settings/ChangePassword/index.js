import classNames from 'classnames/bind';
import styles from './ChangePassword.module.scss';
import LabelTextBox from '../../../components/LabelTextBox';
import Wrapper from '../Wrapper';
import Button from '../../../components/Button';
import { useState, useEffect, useContext } from 'react';
import { getUserById, changeUserPassword } from '../../../services/userServices';
import { AccountLoginContext } from '../../../context/AccountLoginContext';
import ActionAlerts from '../../../components/Alert';

const cx = classNames.bind(styles);

function ChangePassword({ admin = false }) {
    //Hiển thị hộp thoại thông báo
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

    //
    const { userId } = useContext(AccountLoginContext);
    const [userData, setUserData] = useState({});
    const [errorPassword, setErrorPassword] = useState('');
    const [errorNewPassword, setErrorNewPassword] = useState('');
    const [errorConfirmPassword, setErrorConfirmPassword] = useState('');

    const [currentPassword, setCurrentPassword] = useState('');
    const handlgetPassword = (value) => {
        setCurrentPassword(value);
    };

    const [newPassword, setNewPassword] = useState('');
    const handlGetnewPassword = (value) => {
        setNewPassword(value);
    };

    const [confirmPassword, setConfirmPassword] = useState('');
    const handlGetconfirmPassword = (value) => {
        setConfirmPassword(value);
    };

    useEffect(() => {
        // Gửi yêu cầu GET để lấy thông tin người dùng
        getUserById(userId)
            .then((response) => {
                setUserData(response);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [userId]);

    const handleErrorPassword = (event) => {
        const currentPasswordFromServer = userData.password;
        if (event.target.value === '') {
            setErrorPassword('');
        } else {
            if (currentPasswordFromServer !== event.target.value) {
                setErrorPassword('Mật khẩu cũ không chính xác');
            } else {
                setErrorPassword('');
            }
        }
    };

    const handleErrorNewPassword = (event) => {
        if (event.target.value === '') {
            setErrorNewPassword('');
        } else {
            if (event.target.value.length < 8) {
                setErrorNewPassword('Mật khẩu mới phải từ 8 ký tự trở lên');
            } else {
                setErrorNewPassword('');
            }
        }
    };

    const handleErrorConfirmPassword = (event) => {
        if (event.target.value === '') {
            setErrorConfirmPassword('');
        } else {
            if (newPassword !== event.target.value) {
                setErrorConfirmPassword('Mật khẩu nhập lại không chính xác');
            } else {
                setErrorConfirmPassword('');
            }
        }
    };
    const handlePasswordChange = () => {
        try {
            if (
                errorPassword === '' &&
                errorNewPassword === '' &&
                errorConfirmPassword === '' &&
                currentPassword !== '' &&
                newPassword !== '' &&
                confirmPassword !== ''
            ) {
                changeUserPassword(userId, currentPassword, newPassword)
                    .then((response) => {
                        showAlert('editSuccess');
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        } catch (error) {
            alert(error.message);
            console.log(error);
        }
    };

    return (
        <Wrapper bottom={false} admin={admin}>
            <div className={cx('container-changepassword')}>
                <h1 className={cx('Title')}>Đổi mật khẩu</h1>
                <p className={cx('discription')}>Thực hiện thay đổi đối với thông tin bảo mật tài khoản của bạn</p>
                <LabelTextBox
                    className={cx('EmailInfo')}
                    label={'Email'}
                    placeholder={'Email'}
                    selectedSize={'medium'}
                    text={userData.email}
                />
                <LabelTextBox
                    className={cx('Password')}
                    label={'Mật khẩu cũ'}
                    placeholder={'Mật khẩu cũ'}
                    selectedSize={'medium'}
                    editable={true}
                    type={'password'}
                    text={currentPassword}
                    customGetValue={handlgetPassword}
                    error={errorPassword}
                    onChange={handleErrorPassword}
                />

                <LabelTextBox
                    className={cx('Password')}
                    label={'Mật khẩu mới'}
                    placeholder={'Mật khẩu mới'}
                    selectedSize={'medium'}
                    type={'password'}
                    text={newPassword}
                    customGetValue={handlGetnewPassword}
                    error={errorNewPassword}
                    onChange={handleErrorNewPassword}
                />
                <LabelTextBox
                    className={cx('Password')}
                    label={'Xác nhận mật khẩu'}
                    placeholder={'Xác nhận mật khẩu'}
                    selectedSize={'medium'}
                    type={'password'}
                    text={confirmPassword}
                    customGetValue={handlGetconfirmPassword}
                    error={errorConfirmPassword}
                    onChange={handleErrorConfirmPassword}
                />

                <Button className={cx('changeBtn')} primary onClick={handlePasswordChange}>
                    Đổi mật khẩu
                </Button>
            </div>
            {alertType === 'editSuccess' && <ActionAlerts severity="success" content={`Thay đổi thành công`} />}
        </Wrapper>
    );
}

export default ChangePassword;
