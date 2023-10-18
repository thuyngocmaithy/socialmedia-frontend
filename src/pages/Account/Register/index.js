import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../Account.module.scss';
import LabelTextBox from '../../../components/LabelTextBox';
import Wrapper from '../Wrapper';
import Button from '../../../components/Button';
import { GoogleIcon } from '../../../components/Icons';

// logout xử lý ở phần header
const cx = classNames.bind(styles);

const initFormValue = {
    firstName: '',
    lastName: '',
    email: '',
    birthday: '',
    password: '',
    confirmPassword: '',
};

function Register() {
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
                <h1 className={cx('title')}>Register account</h1>

                <form onSubmit={handleSubmit}>
                    <div className={cx('infomation')}>
                        <div className={cx('container-input')}>
                            <LabelTextBox
                                placeholder={'First Name'}
                                name={'firstName'}
                                label={'First Name'}
                                selectedSize={'small'}
                                value={formValue.firstName}
                                onChange={handleChange}
                            />
                            <LabelTextBox
                                placeholder={'Last Name'}
                                name={'lastName'}
                                label={'Last Name'}
                                selectedSize={'small'}
                                value={formValue.lastName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={cx('container-input')}>
                            <LabelTextBox
                                placeholder={'Email'}
                                name={'email'}
                                label={'Email'}
                                selectedSize={'small'}
                                value={formValue.email}
                                onChange={handleChange}
                            />
                            <LabelTextBox
                                placeholder={'Birthday'}
                                name={'birthday'}
                                label={'Birthday'}
                                type={'date'}
                                selectedSize={'small'}
                                value={formValue.birthday}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={cx('container-input')}>
                            <LabelTextBox
                                placeholder={'Password'}
                                name={'password'}
                                type={'password'}
                                label={'Pasword'}
                                selectedSize={'small'}
                                value={formValue.password}
                                onChange={handleChange}
                            />
                            <LabelTextBox
                                placeholder={'Confirm pasword'}
                                name={'confirmPassword'}
                                type={'password'}
                                label={'Confirm password'}
                                selectedSize={'small'}
                                value={formValue.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className={cx('submit-btn')}>
                        <Button red>Register</Button>
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

export default Register;
