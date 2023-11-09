import classNames from 'classnames/bind';
import styles from './ChangePassword.module.scss';
import LabelTextBox from '../../../components/LabelTextBox';
import Wrapper from '../Wrapper';
import Button from '../../../components/Button';
import { useState, useEffect, useCallback } from 'react';
import { getUserById, changeUserPassword } from '../../../services/userServices';

const cx = classNames.bind(styles);

function ChangePassword() {

    const [userData, setUserData] = useState({});
    const userID = "1";

    const [currentPassword, setCurrentPassword] = useState('');
    const handlgetPassword = useCallback((event) => {
        setCurrentPassword((prevPassword) => event.target.value);
    }, []);

    const [newPassword, setNewPassword] = useState('');
    const handlGetnewPassword = useCallback((event) => {
        setNewPassword((prevPassword) => event.target.value);
    }, []);
    const [confirmPassword, setConfirmPassword] = useState('');
    const handlGetconfirmPassword = useCallback((event) => {
        setConfirmPassword((prevPassword) => event.target.value);
    }, []);

    useEffect(() => {
        // Gửi yêu cầu GET để lấy thông tin người dùng
        getUserById(1)
            .then(response => {
                setUserData(response);
            })
            .catch(error => {
                console.error(error);
            });
    }, [userID]);


    const handlePasswordChange = () => {
        try {

            const currentPasswordFromServer = userData.password;
            console.log('current password from server : ' + currentPasswordFromServer);
            console.log('current password : ' + currentPassword);
            console.log('new password : ' + newPassword);
            console.log('confirm password : ' + confirmPassword);


            if (currentPasswordFromServer !== currentPassword) {
                alert('Old password is incorrect');
                return;
            }
            if (newPassword !== confirmPassword) {
                alert('Confirm password is incorrect');
                return;
            }
            // getUserById(1)
            //     .then(response => {
            //         changeUserPassword(1, currentPassword, newPassword)
            //             .then(response => {
            //                 alert('changePassword is successful');
            //             })
            //             .catch(error => {
            //                 console.log(error);
            //             });
            //     }).then(error => {
            //         console.log("lỗi" + error);
            //     });


            changeUserPassword(1, currentPassword, newPassword)
                .then(response => {
                    alert(response);
                })
                .catch(error => {
                    alert('currentPassword : ' + currentPassword);
                    console.log(error);
                });
        }

        catch (error) {
            alert(error.message);
            console.log(error);
        }


    };


    return (
        <Wrapper bottom={false}>
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
                    onChange={handlgetPassword}

                />


                <LabelTextBox
                    className={cx('Password')}
                    label={'Mật khẩu mới'}
                    placeholder={'Mật khẩu mới'}
                    selectedSize={'medium'}
                    type={'password'}
                    text={newPassword}
                    onChange={handlGetnewPassword}
                />
                <LabelTextBox
                    className={cx('Password')}
                    label={'Xác nhận mật khẩu'}
                    placeholder={'Xác nhận mật khẩu'}
                    selectedSize={'medium'}
                    type={'password'}
                    value={confirmPassword}
                    onChange={handlGetconfirmPassword}
                />



                <Button className={cx('changeBtn')} primary onClick={handlePasswordChange}>
                    Đổi mật khẩu
                </Button>
            </div>
        </Wrapper>
    );
}

export default ChangePassword;
