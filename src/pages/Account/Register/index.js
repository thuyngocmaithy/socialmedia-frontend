import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../Account.module.scss';
import LabelTextBox from '../../../components/LabelTextBox';
import Wrapper from '../Wrapper';
import Button from '../../../components/Button';

import * as userServices from '../../../services/userServices';

// logout xử lý ở phần header
const cx = classNames.bind(styles);

function Register() {
    const handleSubmit = async (event) => {
        event.preventDefault();

        const email = event.target.elements.email.value !== '' ? event.target.elements.email.value : null;
        const password = event.target.elements.password.value !== '' ? event.target.elements.password.value : null;
        const confirmPassword =
            event.target.elements.confirmPassword.value !== '' ? event.target.elements.confirmPassword.value : null;
        const firstName = event.target.elements.firstName.value !== '' ? event.target.elements.firstName.value : null;
        const lastName = event.target.elements.lastName.value !== '' ? event.target.elements.lastName.value : null;
        const birthdate = event.target.elements.birthdate.value !== '' ? event.target.elements.birthdate.value : null;
        const fullname = firstName + ' ' + lastName;

        // Kiểm tra xem password và confirmPassword có giống nhau không
        if (password !== confirmPassword) {
            console.error('Password and Confirm Password do not match');
            console.log('password: ' + password, 'confirm password: ' + confirmPassword);
            return;
        }

        // Tạo đối tượng người dùng từ thông tin nhập
        const userSave = {
            email: email,
            username: email.split('@')[0],
            fullname: fullname,
            birthdate: birthdate,
            password: password,
            introduce: null,
            avatar: null,
            website: null,
            gender: null,
            language: null,
            privateBool: false,
            createdAt: null,
        };

        // Gửi yêu cầu đăng ký đến máy chủ
        try {
            const response = await userServices.save(userSave);

            if (response) {
                console.log(response);
            } else {
                console.log(response);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
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
                            />
                            <LabelTextBox
                                placeholder={'Last Name'}
                                name={'lastName'}
                                label={'Last Name'}
                                selectedSize={'small'}
                            />
                        </div>
                        <div className={cx('container-input')}>
                            <LabelTextBox placeholder={'Email'} name={'email'} label={'Email'} selectedSize={'small'} />
                            <LabelTextBox
                                placeholder={'Birthdate'}
                                name={'birthdate'}
                                label={'Birthdate'}
                                type={'date'}
                                selectedSize={'small'}
                            />
                        </div>
                        <div className={cx('container-input')}>
                            <LabelTextBox
                                placeholder={'Password'}
                                name={'password'}
                                type={'password'}
                                label={'Pasword'}
                                selectedSize={'small'}
                            />
                            <LabelTextBox
                                placeholder={'Confirm pasword'}
                                name={'confirmPassword'}
                                type={'password'}
                                label={'Confirm password'}
                                selectedSize={'small'}
                            />
                        </div>
                    </div>

                    <div className={cx('submit-btn')}>
                        <Button red>Register</Button>
                    </div>
                </form>
            </div>
        </Wrapper>
    );
}

export default Register;
