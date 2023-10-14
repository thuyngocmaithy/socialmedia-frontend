import classNames from 'classnames/bind';
import styles from './UserPassword.module.scss'

import { useState } from "react";

import { NavLink, Route, Switch, Navigate, Routes, BrowserRouter } from 'react-router-dom'; // Import NavLink for navigation

import PopupForm from '../../../components/Popper/PopupForm/PopupForm';
import Image from '../../../components/Image';
import LabelTextBox from '../../../components/LabelTextBox';
import SideBar from '../../../components/SideBar/SideBar';
import 'bootstrap/dist/css/bootstrap.min.css';

import BottomBar from '../../../components/BottomBar/BottomBar';
const cx = classNames.bind(styles);

function userPassword() {
    return (<>
        <div className={cx('wrapper')}>

            <SideBar />

            <div className={cx('Main')}>
                <h1 className={cx('Title')}>Tài khoản riêng tư của bạn</h1>
                <p className={cx('discription')}>
                    Thực hiện thay đổi đối với thông tin bảo mật tài khoản của bạn
                </p>
                <LabelTextBox className={cx('EmailInfo')}
                    label={'Email'}
                    placeholder={'Email'}
                    selectedSize={'medium'}
                />
                <LabelTextBox className={cx('Password')}
                    label={'Mật khẩu'}
                    selectedSize={'medium'}
                    type={'password'}
                />
                <button className={cx('Button-change-password')}  >
                    Đổi mật khẩu
                </button>
            </div>
        </div>

        <BottomBar />
    </>);
}

export default userPassword;