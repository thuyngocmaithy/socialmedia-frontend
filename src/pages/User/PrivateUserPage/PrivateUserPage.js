import classNames from 'classnames/bind';
import { useState } from "react";

import BottomBar from '../../../components/BottomBar/BottomBar';
import LabelTextBox from '../../../components/LabelTextBox';
import styles from '../PrivateUserPage/PrivateUserPage.module.scss'
import Options from '../../../components/Options/Options';
import Button from '../../../components/Button';

const cx = classNames.bind(styles);

function PrivateUserPage() {
    const cx = classNames.bind(styles);

    const countryOptions = [
        "Vietnam",
        "United States",
        "Canada",
        "United Kingdom",
        "Australia",
    ];

    return (<>
        <div className={cx('wrapper')} >
            <div className={cx('MainInfo')}>
                <h1> Quản lý tài khoản</h1>
                <p className={cx('discription')}>
                    Thực hiện thay đổi đối với thông tin cá nhân hoặc loại tài khoản của bạn.
                </p>
                <div className={cx('PrivateUserInfo')}>
                    <h2 className={cx('Title')}>Tài khoản riêng tư của bạn</h2>
                    <LabelTextBox className={cx('EmailInfo')}
                        label={'Email - riêng tư'}
                        placeholder={'Email'}
                        selectedSize={'large'}
                    />
                    <LabelTextBox className={cx('Password')}
                        label={'Mật khẩu'}
                        selectedSize={'small'}
                        type={'password'}
                    />
                    <button className={cx('Button-change-password')} onClick={() => onChange} >
                        đổi mật khẩu
                    </button>

                    <div className={cx('checkedPrivate')}>
                        {/* dislay flex */}
                        <div className={cx('leftDisciprtion')}>

                        </div>
                        <div className={cx('rightDisciprtion')}>
                            <Button
                                className={cx('')}
                                switchToggle={data.switchToggle}
                            // onClick={}
                            />
                        </div>
                    </div>
                    <LabelTextBox placeholder={'Ngày sinh'} label={'Ngày sinh'} type={'date'} selectedSize={UserData.size} />
                    <Options type='gender' />
                    <Options type='country' />
                    <Options type='language' />


                </div>
            </div>
        </div>
        <BottomBar />
    </>);
}

export default PrivateUserPage;