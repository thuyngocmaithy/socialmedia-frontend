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

    const handleChange = (name, value) => {
        setFormValue({
            ...formValue,
            [name]: value,
        });
    };

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     const email = formValue.email + '@gmail.com'; // Tạo email từ tên đăng nhập
    //     console.log('email', email);
    //     console.log('password', formValue.password);
    //     console.log('form value', formValue);
    // };

    //alert('Đăng nhập thành công\n' + 'email:\t' + formValue.email + '\npassword:\t' + formValue.password);
    // alert('Đăng nhập thất bại\n' + 'email:\t' + formValue.email + '\npassword:\t' + formValue.password);
    // alert('Lỗi');

    const handleLogin = () => {
        // Gửi yêu cầu đăng nhập
        fetch('/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formValue),
        })
            .then((response) => response.text())
            .then((data) => {
                // Xử lý phản hồi từ server
                if (data === 'Login successful') {
                    // Đăng nhập thành công, thực hiện hành động phù hợp ở đây
                    console.log('Đăng nhập thành công');
                    alert(
                        'Đăng nhập thành công\n' + 'email:\t' + formValue.email + '\npassword:\t' + formValue.password,
                    );
                } else {
                    // Đăng nhập thất bại, hiển thị thông báo cho người dùng
                    console.log('Đăng nhập thất bại');
                    alert('Đăng nhập thất bại\n' + 'email:\t' + formValue.email + '\npassword:\t' + formValue.password);
                }
            });
    };

    return (
        <Wrapper>
            <div className={cx('container-form')}>
                <h1 className={cx('title')}>Login account</h1>

                <form>
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
                        <Button red onClick={handleLogin}>
                            Login
                        </Button>
                    </div>
                </form>
            </div>
        </Wrapper>
    );
}

export default Login;
