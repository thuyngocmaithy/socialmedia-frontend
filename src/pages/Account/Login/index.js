import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../Account.module.scss';
import LabelTextBox from '../../../components/LabelTextBox';
import Wrapper from '../Wrapper';
import Button from '../../../components/Button';
import * as userServices from '../../../services/userServices';
import { useNavigate } from 'react-router-dom';
import { GoogleIcon } from '../../../components/Icons';

// logout xử lý ở phần header
const cx = classNames.bind(styles);

function Login() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const fetchApi = async () => {
            const email = e.target.elements.email.value !== '' ? e.target.elements.email.value : null;
            const password = e.target.elements.password.value !== '' ? e.target.elements.password.value : null;
            const username = email.split('@')[0]; // Trích xuất tên người dùng thành email
            const result = await userServices.login(username, password);
            // console.log(result);
            if (result !== undefined) {
                localStorage.setItem('userLogin', JSON.stringify(result));
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
