import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../Account.module.scss';
import LabelTextBox from '../../../components/LabelTextBox';
import Wrapper from '../Wrapper';
import Button from '../../../components/Button';
import * as loginServices from '../../../services/loginServices';

// logout xử lý ở phần header
const cx = classNames.bind(styles);

const initFormValue = {
    email: '',
    password: '',
};

function Login() {
    const [formValue, setFormValue] = useState(initFormValue);

    const handleChange = (name, value) => {
        setFormValue({
            ...formValue,
            [name]: value,
        });
    };

    const [listLogin, setListLogin] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const fetchApi = async () => {
            const { email, password } = formValue;
            const username = email.split('@')[0]; // Trích xuất tên người dùng thành email
            const result = await loginServices.login(username, password);
            console.log(result);
            setListLogin(result);
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
                        <LabelTextBox
                            placeholder={'Email'}
                            name={'email'}
                            label={'Email'}
                            selectedSize={'small'}
                            value={formValue.username}
                            onChange={handleChange}
                        />
                        <LabelTextBox
                            placeholder={'Password'}
                            name={'password'}
                            type={'password'}
                            label={'Pasword'}
                            selectedSize={'small'}
                            value={formValue.password}
                            onChange={handleChange}
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
