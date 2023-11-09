import classNames from 'classnames/bind';
import Switch from '@mui/material/Switch';
import { useState, useEffect, useCallback } from 'react';


import { changePrivate, getUserById, changeUserBirthdate, changeUserInfo } from '../../../services/userServices';

import LabelTextBox from '../../../components/LabelTextBox';
import styles from '../AccountSetting/AccountSetting.module.scss';
import Options from '../../../components/Options/Options';
import Button from '../../../components/Button';
import Wrapper from '../Wrapper';

function AccountSetting() {
    const cx = classNames.bind(styles);
    const label1 = { inputProps: { 'aria-label': 'Switch demo' } };

    const [userData, setUserData] = useState({});
    // const username = 'haile'; // Thay thế bằng tên người dùng thực tế
    const userID = "1";
    useEffect(() => {
        // Gửi yêu cầu GET để lấy thông tin người dùng
        getUserById(1)
            .then(response => {
                setUserData(response);
                if (response.privateBool === true) {
                    setPrivateState(true);
                }
                if (response.privateBool === false) {
                    setPrivateState(false);
                }
            })
            .catch(error => {
                console.error(error);
            });
    }, [userID]);

    const [PrivateState, setPrivateState] = useState(userData.PrivateBool);
    const handelchangePrivateState = () => {
        setPrivateState(prevState => !prevState);
        changePrivate(1, PrivateState)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log("Error: " + error);
            });

    };

    useEffect(() => {
        // Kiểm tra giá trị ban đầu của UserData.PrivateBool
        if (userData.PrivateBool) {
            setPrivateState(true); // Đặt trạng thái là true
        } else {
            setPrivateState(false); // Đặt trạng thái là false
        }
    }, [userData.PrivateBool]);



    const [UserBirthdate, setUserBirthdate] = useState(Date());

    const handelchangeBirthday = useCallback((event) => {
        setUserBirthdate((prevBirthdate) => event.target.value);
    }, []);

    const handlechangeAccountSetting = () => {
        const updateBirthday = {
            updateBirthday: new Date(UserBirthdate),
        };
        const updateOptions = {
            gender: userGender,
            country: userCountry,
            language: userLanguage,
        };

        changeUserInfo(1, updateOptions)
            .then((response) => { console.log(response) })
            .catch(error => { console.log(error) });


        changeUserBirthdate(1, updateBirthday)
            .then(response => { console.log(response) })
            .catch(err => { console.log(err) });

        console.log(updateOptions);
        console.log(userData.privateBool);
    };

    const [userGender, setUserGender] = useState('');
    const [userCountry, setUserCountry] = useState('');
    const [userLanguage, setUserLanguage] = useState('');


    const handleChangeGender = useCallback(event => {
        const value = event.target.value;
        setUserGender((prevGender) => value);
    }, []);

    const handleChangeCountry = useCallback(event => {
        const value = event.target.value;
        setUserCountry((prevCountry) => value);
    }, []);
    const handlleChangeLanggue = useCallback(event => {
        const value = event.target.value;
        setUserLanguage((prevLanguage) => value);
    }, []);

    return (
        <Wrapper onSave={handlechangeAccountSetting}>
            <div className={cx('container-accountsetting')}>
                <h1> Quản lý tài khoản</h1>
                <p className={cx('discription')}>
                    Thực hiện thay đổi đối với thông tin cá nhân hoặc loại tài khoản của bạn.
                </p>
                <div className={cx('PrivateUserInfo')}>
                    <LabelTextBox
                        placeholder={'Ngày sinh '}
                        label={'Ngày sinh: '}
                        type={'date'}
                        selectedSize={'medium2'}
                        text={userData.birthdate}
                        onChange={handelchangeBirthday}
                    />

                    <Options type="gender" selectedSize={'medium'} value={userData.gender} onChange={handleChangeGender} />
                    <Options type="country" selectedSize={'medium'} value={userData.country} onChange={handleChangeCountry} />
                    <Options type="language" selectedSize={'medium'} value={userData.language} onChange={handlleChangeLanggue} />

                    <div className={cx('checkedPrivate')}>
                        <div className={cx('leftDiscription')}>
                            <p className={cx('labelCheckPrivate')}>Tài khoản riêng tư:</p>
                        </div>

                        <div className={cx('rightDiscription')}>
                            <Button switchToggle={<Switch {...label1} />}
                                onClick={handelchangePrivateState}> </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
}

export default AccountSetting;
