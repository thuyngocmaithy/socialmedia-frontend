import React, { useState } from "react";

import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import '../components/LabelTextBox/LabelTextBox.module.scss'
import LabelTextBox from '../components/LabelTextBox';

// logout xử lý ở phần header
const cx = classNames.bind(styles);

const initFormValue = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
};

function Register() {
    const [formValue, setFormValue] = useState(initFormValue);

    const handleChange = (event) => {
        const {value, name} = event.target;
        setFormValue({
            ...formValue,
            [name]: value,
        })
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("form value", formValue);
    };

    return (
        <div className={cx('register-page')}>
            <h2>Sign up to get more ideas</h2>
            <div className={cx('register-form-container')}>
                <h1>Register account</h1>

                <form onSubmit={handleSubmit}>
                    <div className={cx('infomation')}>
                        <LabelTextBox placeholder={'First Name'} name={"firstName"} label={'First Name'} selectedSize={'small'} value={formValue.firstName} onChange={handleChange}/>
                        <LabelTextBox placeholder={'Last Name'} name={"lastName"} label={'Last Name'} selectedSize={'small'} value={formValue.lastName} onChange={handleChange}/>
                        <LabelTextBox placeholder={'Email'} name={"email"} label={'Email'} selectedSize={'small'} value={formValue.email} onChange={handleChange}/>
                        <LabelTextBox placeholder={'Password'} name={"password"} type={'password'} label={'Pasword'} selectedSize={'small'} value={formValue.password} onChange={handleChange}/>
                        <LabelTextBox placeholder={'Confirm pasword'} name={"confirmPassword"} type={'password'} label={'Confirm password'} selectedSize={'small'} value={formValue.confirmPassword} onChange={handleChange}/>
                    </div>

                    <div className={cx('submit-btn')}   >
                        <button>Register</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;