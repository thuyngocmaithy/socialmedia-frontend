import classNames from 'classnames/bind';
import React, { useContext, useEffect } from 'react';
import Button from '../../../components/Button';
import { GoogleIcon } from '../../../components/Icons';
import LabelTextBox from '../../../components/LabelTextBox';
import { ThemeContext } from '../../../context/ThemeContext';
import * as userServices from '../../../services/userServices';
import styles from '../Account.module.scss';
import Wrapper from '../Wrapper';

// logout xử lý ở phần header
const cx = classNames.bind(styles);

function Login() {
    const { theme } = useContext(ThemeContext);
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
            const username = email.split('@')[0]; // Trích xuất tên người dùng thành email
            console.log(username);
            const result = await userServices.login(username, password);
            if (result !== undefined) {
                // Sử dụng hàm đặt giá trị vào localStorage với thời gian hết hạn
                setLocalStorageWithExpiration('userLogin', { id: result.id, permission: result.permission }, 60); // 60 phút
                if (result.permission !== null) {
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
                    {' '}
                    {/* <form> */}{' '}
                    <div className={cx('infomation')}>
                        <LabelTextBox placeholder={'Email'} name={'email'} label={'Email'} selectedSize={'small'} />{' '}
                        <LabelTextBox
                            placeholder={'Password'}
                            name={'password'}
                            type={'password'}
                            label={'Pasword'}
                            selectedSize={'small'}
                        />{' '}
                    </div>
                    <div className={cx('submit-btn')}>
                        <Button red> Login </Button> <h4 className={cx('or')}> OR </h4>{' '}
                        <Button className={cx('registerGoogle')} primary leftIcon={<GoogleIcon />}>
                            Sign in with Google{' '}
                        </Button>{' '}
                    </div>{' '}
                </form>{' '}
            </div>{' '}
        </Wrapper>
    );
}
export default Login;
