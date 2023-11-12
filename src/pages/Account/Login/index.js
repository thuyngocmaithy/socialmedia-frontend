import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../Account.module.scss';
import LabelTextBox from '../../../components/LabelTextBox';
import Wrapper from '../Wrapper';
import Button from '../../../components/Button';
import * as userServices from '../../../services/userServices';
import { useNavigate } from 'react-router-dom';
import { GoogleIcon } from '../../../components/Icons';
import Cookies from 'js-cookie';

// logout xử lý ở phần header
const cx = classNames.bind(styles);

function Login() {
    const navigate = useNavigate();
    // Hàm để đặt giá trị vào localStorage
    function setLocalStorageWithExpiration(key, value, expirationMinutes) {
        const expirationMS = expirationMinutes * 60 * 1000; // Chuyển đổi phút thành mili giây
        const expirationTime = new Date().getTime() + expirationMS;

        const data = {
            value: value,
            expirationTime: expirationTime,
        };

        localStorage.setItem(key, JSON.stringify(data));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const fetchApi = async () => {
            const email = e.target.elements.email.value !== '' ? e.target.elements.email.value : null;
            const password = e.target.elements.password.value !== '' ? e.target.elements.password.value : null;
            const username = email.split('@')[0]; // Trích xuất tên người dùng thành email
            const result = await userServices.login(username, password);
            // console.log(result);
            if (result !== undefined) {
                // const expirationTime = new Date(new Date().getTime() + 60000);
                // Cookies.set('userLogin', JSON.stringify(result), { expires: 1 });

                // Sử dụng hàm đặt giá trị vào localStorage với thời gian hết hạn
                setLocalStorageWithExpiration('userLogin', result, 30); // 30 phút
                navigate('/');
            }
        };
        fetchApi();
    };

    return (
        <Wrapper>
            <div className={cx('container-form')}>
                <h1 className={cx('title')}>Login account</h1>

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
                        <Button red>Login</Button>
                        <h4 className={cx('or')}>OR</h4>
                        <Button className={cx('registerGoogle')} primary leftIcon={<GoogleIcon />}>
                            Sign in with Google
                        </Button>
                    </div>
                </form>
            </div>
        </Wrapper>
    );
}
export default Login;
