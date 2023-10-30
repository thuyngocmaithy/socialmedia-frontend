import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../Account.module.scss';
import LabelTextBox from '../../../components/LabelTextBox';
import Wrapper from '../Wrapper';
import Button from '../../../components/Button';

// logout xử lý ở phần header
const cx = classNames.bind(styles);

const initFormValue = {
    email: '',
    password: '',
};

function Login() {
    const [formValue, setFormValue] = useState(initFormValue);

    const handleChange = (event) => {
        const { value, name } = event.target;
        setFormValue({
            ...formValue,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('form value', formValue);
    };

    return (
        <Wrapper>
            <div className={cx('container-form')}>
                <h1 className={cx('title')}>Login account</h1>

                <form onSubmit={handleSubmit}>
                    <div className={cx('infomation')}>
                        <LabelTextBox
                            placeholder={'Email'}
                            name={'email'}
                            label={'Email'}
                            selectedSize={'small'}
                            value={formValue.email}
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
