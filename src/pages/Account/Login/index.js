import classNames from 'classnames/bind';
import React, { useContext, useEffect, useState } from 'react';
import Button from '../../../components/Button';
import { GoogleIcon } from '../../../components/Icons';
import LabelTextBox from '../../../components/LabelTextBox';
import { ThemeContext } from '../../../context/ThemeContext';
import * as userServices from '../../../services/userServices';
import styles from '../Account.module.scss';
import Wrapper from '../Wrapper';
import ActionAlerts from '../../../components/Alert';

// logout xử lý ở phần header
const cx = classNames.bind(styles);

function Login() {
    const { theme } = useContext(ThemeContext);
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
    // Hàm để đặt giá trị vào localStorage
    function setLocalStorageWithExpiration(key, value, expirationMinutes) {
        const expirationMS = expirationMinutes * 60 * 10000; // Chuyển đổi phút thành mili giây
        const expirationTime = new Date().getTime() + expirationMS;

        const data = {
            value: value,
            expirationTime: expirationTime,
        };

        localStorage.setItem(key, JSON.stringify(data));
    }
    useEffect(() => {
        localStorage.removeItem('userLogin');
    }, []);
    const handleSubmit = (e) => {
        e.preventDefault();
        const fetchApi = async () => {
            const email = e.target.elements.email.value !== '' ? e.target.elements.email.value : null;
            const password = e.target.elements.password.value !== '' ? e.target.elements.password.value : null;
            const result = await userServices.login(email, password);

            if (result.a === 'errorEmail') {
                showAlert('errorEmail');
            } else if (result.a === 'errorPassword') {
                showAlert('errorPassword');
            } else {
                // Sử dụng hàm đặt giá trị vào localStorage với thời gian hết hạn
                setLocalStorageWithExpiration('userLogin', { id: result.a, permission: result.b }, 60); // 60 phút
                if (result.b !== null) {
                    window.location.href = '/admin/dashboard';
                } else {
                    window.location.href = '/';
                }
            }
        };
        fetchApi();
    };

    return (
        <Wrapper>
            <div className={cx('container-form', theme === 'dark' ? 'dark' : '')}>
                <h1 className={cx('title')}> Login account </h1>
                <form onSubmit={handleSubmit}>
                    {/* <form> */}
                    <div className={cx('infomation')}>
                        <LabelTextBox placeholder={'Email'} name={'email'} label={'Email'} selectedSize={'small'} />
                        <LabelTextBox
                            placeholder={'Password'}
                            name={'password'}
                            type={'password'}
                            label={'Pasword'}
                            selectedSize={'small'}
                        />
                    </div>
                    <div className={cx('submit-btn')}>
                        <Button primary={theme === 'dark' ? true : false} red={theme === 'dark' ? false : true}>
                            Login
                        </Button>
                        <h4 className={cx('or')}> OR </h4>
                        <Button className={cx('registerGoogle')} primary leftIcon={<GoogleIcon />}>
                            Sign in with Google
                        </Button>
                    </div>
                </form>
            </div>
            {alertType === 'errorEmail' && <ActionAlerts severity="error" content={`Email không chính xác`} />}
            {alertType === 'errorPassword' && <ActionAlerts severity="error" content={`Mật khẩu không chính xác`} />}
        </Wrapper>
    );
}
export default Login;
