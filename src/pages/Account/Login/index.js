import React, { useContext } from 'react';
import classNames from 'classnames/bind';
import styles from '../Account.module.scss';
import LabelTextBox from '../../../components/LabelTextBox';
import Wrapper from '../Wrapper';
import Button from '../../../components/Button';
import * as userServices from '../../../services/userServices';
import { GoogleIcon } from '../../../components/Icons';
import { ThemeContext } from '../../../context/ThemeContext';

// logout xử lý ở phần header
const cx = classNames.bind(styles);

function Login() {
    const { theme } = useContext(ThemeContext);
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

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('form value', formValue);
    };

    return (
        <Wrapper>
            <div className={cx('container-form', theme === 'dark' ? 'dark' : '')}>
                <h1 className={cx('title')}>Login account</h1>

                <form onSubmit={handleSubmit}>
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
                    </div>
                </form>
            </div>
        </Wrapper>
    );
}
export default Login;
