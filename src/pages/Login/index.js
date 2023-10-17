import React, { useState } from "react";
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import LabelTextBox from '../../components/LabelTextBox';

// logout xử lý ở phần header
const cx = classNames.bind(styles);

const initFormValue = {
    email: "",
    password: "",
};

function Login() {
    const [formValue, setFormValue] = useState(initFormValue);

    const handleChange = (event) => {
        const { value, name } = event.target;
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
                <h1>Login account</h1>

                <form onSubmit={handleSubmit}>
                    <div className={cx('infomation')}>
                        <LabelTextBox placeholder={'Email'} name={"email"} label={'Email'} selectedSize={'small'} value={formValue.email} onChange={handleChange} />
                        <LabelTextBox placeholder={'Password'} name={"password"} type={'password'} label={'Pasword'} selectedSize={'small'} value={formValue.password} onChange={handleChange} />
                    </div>

                    <div className={cx('submit-btn')}   >
                        <button>Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;