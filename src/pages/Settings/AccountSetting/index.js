import classNames from 'classnames/bind';
import Switch from '@mui/material/Switch';
import { useState, useEffect, useCallback, useContext, useRef } from 'react';

import { changePrivate, getUserById, changeUserBirthdate, changeUserInfo } from '../../../services/userServices';

import LabelTextBox from '../../../components/LabelTextBox';
import styles from '../AccountSetting/AccountSetting.module.scss';
import Options from '../../../components/Options';
import Button from '../../../components/Button';
import Wrapper from '../Wrapper';
import { AccountLoginContext } from '../../../context/AccountLoginContext';
import ActionAlerts from '../../../components/Alert';

const cx = classNames.bind(styles);

function AccountSetting({ admin = false }) {
    const label1 = { inputProps: { 'aria-label': 'Switch demo' } };
    const timeoutRef = useRef(null);
    const userLogin = useContext(AccountLoginContext);
    const [userData, setUserData] = useState({});
    //Hiển thị hộp thoại thông báo
    const [alertType, setAlertType] = useState(null);
    const [alertVisible, setAlertVisible] = useState(false);

    const showAlert = (type) => {
        setAlertType(type);
        setAlertVisible(true);

        timeoutRef.current = setTimeout(() => {
            setAlertVisible(false);
            setAlertType(null); // Đặt alertType về null khi ẩn thông báo
        }, 2500);
    };

    useEffect(() => {
        if (alertVisible) {
            clearTimeout(timeoutRef.current);
        }
    }, [alertVisible]);

    // CONVERT DATE
    const formatISODate = (isoDate) => {
        const dateObject = new Date(isoDate);
        const year = dateObject.getFullYear();
        const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
        const day = dateObject.getDate().toString().padStart(2, '0');

        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        // Gửi yêu cầu GET để lấy thông tin người dùng
        getUserById(userLogin)
            .then((response) => {
                setUserData(response);
                if (response.privateBool === true) {
                    setPrivateState(true);
                }
                if (response.privateBool === false) {
                    setPrivateState(false);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, [userLogin]);

    const [privateState, setPrivateState] = useState(null);
    useEffect(() => {
        if (Object.keys(userData).length !== 0) {
            setPrivateState(userData.privateBool);
        }
    }, [userData]);
    const handelchangePrivateState = (event) => {
        clearTimeout(timeoutRef.current);
        changePrivate(userLogin, event.target.checked)
            .then((response) => {
                if (event.target.checked) {
                    showAlert('changePublic');
                } else {
                    showAlert('changePrivate');
                }
            })
            .catch((error) => {
                console.log('Error: ' + error);
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

    const [userBirthdate, setUserBirthdate] = useState();
    useEffect(() => {
        if (Object.keys(userData).length !== 0) {
            const formattedDate = formatISODate(userData.birthdate);
            setUserBirthdate(formattedDate);
        }
    }, [userData]);
    const handelchangeBirthday = useCallback((event) => {
        setUserBirthdate((prevBirthdate) => event.target.value);
    }, []);

    const handlechangeAccountSetting = () => {
        let boolEdit = true;
        const updateBirthday = {
            updateBirthday: new Date(userBirthdate),
        };
        const updateOptions = {
            gender: userGender,
            language: userLanguage,
        };

        // ĐỔI GENDER, LANGUAGE
        changeUserInfo(userLogin, updateOptions)
            .then((response) => {
                // console.log(response);
            })
            .catch((error) => {
                console.log(error);
                boolEdit = false;
            });

        //ĐỔI NGÀY SINH
        changeUserBirthdate(userLogin, updateBirthday)
            .then((response) => {
                // console.log(response);
            })
            .catch((err) => {
                console.log(err);
                boolEdit = false;
            });
        if (boolEdit) {
            showAlert('edit');
        }
    };

    const [userGender, setUserGender] = useState('');
    useEffect(() => {
        if (Object.keys(userData).length !== 0) {
            setUserGender(userData.gender);
        }
    }, [userData]);
    const handleChangeGender = useCallback((event) => {
        console.log(event.target.value);
        setUserGender(event.target.value);
    }, []);

    const [userLanguage, setUserLanguage] = useState('');
    useEffect(() => {
        if (Object.keys(userData).length !== 0) {
            setUserLanguage(userData.language);
        }
    }, [userData]);
    const handlleChangeLanggue = useCallback((event) => {
        setUserLanguage((prevLanguage) => event.target.value);
    }, []);

    return (
        userData &&
        userBirthdate &&
        userGender &&
        privateState !== null && (
            <Wrapper onSave={handlechangeAccountSetting} admin={admin}>
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
                            selectedSize={'small'}
                            text={userBirthdate}
                            onChange={handelchangeBirthday}
                        />
                        <Options
                            type="gender"
                            selectedSize={'medium'}
                            select={userGender}
                            onChange={handleChangeGender}
                        />
                        <Options
                            type="language"
                            selectedSize={'medium'}
                            select={userLanguage}
                            onChange={handlleChangeLanggue}
                        />

                        {admin === false && (
                            <div className={cx('checkedPrivate')}>
                                <div className={cx('leftDiscription')}>
                                    <p className={cx('labelCheckPrivate')}>Tài khoản riêng tư:</p>
                                </div>

                                <div className={cx('rightDiscription')}>
                                    <Button
                                        switchToggle={
                                            <Switch
                                                defaultChecked={privateState}
                                                {...label1}
                                                onChange={handelchangePrivateState}
                                            />
                                        }
                                    >
                                        {' '}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {alertType === 'edit' && <ActionAlerts content={`Lưu thành công`} />}
                {alertType === 'changePrivate' && <ActionAlerts content={`Tài khoản riêng tư`} />}
                {alertType === 'changePublic' && <ActionAlerts content={`Tài khoản công khai`} />}
            </Wrapper>
        )
    );
}

export default AccountSetting;
