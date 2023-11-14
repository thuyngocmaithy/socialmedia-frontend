import classNames from 'classnames/bind';
import styles from './InfoProfile.module.scss';
import { useState, useEffect, useCallback, useContext, createContext } from 'react';
import ChangeAvatar from '../../../components/Popup/ChangeAvatar';
import Image from '../../../components/Image';
import LabelTextBox from '../../../components/LabelTextBox';
import Wrapper from '../Wrapper';
import Button from '../../../components/Button';
import { getUserById, changeUserInfo, ChangeUserAvatar } from '../../../services/userServices';
import axios from 'axios';
import ActionAlerts from '../../../components/Alert';
import { AccountLoginContext } from '../../../context/AccountLoginContext';

const cx = classNames.bind(styles);

function UserProfile({ admin = false }) {
    const userLogin = useContext(AccountLoginContext);
    const [userData, setUserData] = useState({});
    const [saveSuccess, setSaveSuccess] = useState(false);
    //Hiển thị hộp thoại thông báo
    const [alertType, setAlertType] = useState(null);
    const [alertVisible, setAlertVisible] = useState(false);

    const showAlert = (type) => {
        setAlertType(type);
        setAlertVisible(true);

        const timeoutId = setTimeout(() => {
            setAlertVisible(false);
            setAlertType(null); // Đặt alertType về null khi ẩn thông báo
        }, 2500);

        return timeoutId;
    };

    useEffect(() => {
        if (alertVisible) {
            const timeoutId = setTimeout(() => {
                setAlertVisible(false);
                setAlertType(null); // Đặt alertType về null khi ẩn thông báo
            }, 2500);

            return () => clearTimeout(timeoutId);
        }
    }, [alertVisible]);

    useEffect(() => {
        // Gửi yêu cầu GET để lấy thông tin người dùng
        getUserById(userLogin)
            .then((response) => {
                setSaveSuccess(false);
                setUserData(response);
                console.log(userLogin);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [saveSuccess, userLogin]);

    const [userFullname, setUserFullname] = useState('');
    useEffect(() => {
        setUserFullname(userData.fullname || '');
    }, [userData]);
    const handlGetUserFullname = useCallback((event) => {
        setUserFullname(event.target.value);
    }, []);

    const [userIntroduce, setUserIntroduce] = useState('');
    useEffect(() => {
        setUserIntroduce(userData.introduce || '');
    }, [userData]);
    const handlGetUserIntroduce = useCallback((event) => {
        setUserIntroduce((prevIntroduce) => +prevIntroduce + event.target.value);
    }, []);

    const [userWebsite, setUserWebsite] = useState('');
    useEffect(() => {
        setUserWebsite(userData.website || '');
    }, [userData]);
    const handleGetUserWebsite = useCallback((event) => {
        setUserWebsite((prevWebsite) => prevWebsite + event.target.value);
    }, []);

    const [username, setUsername] = useState('');
    useEffect(() => {
        setUsername(userData.username || '');
    }, [userData]);
    const handleGetUsername = useCallback((event) => {
        setUsername((prevUsername) => prevUsername + event.target.value);
    }, []);

    const [isPopupVisible, setPopupVisible] = useState(false);

    const [userPhoto, setUserPhoto] = useState(
        'https://i.pinimg.com/140x140_RS/4d/3f/94/4d3f944a16455e5ad198b76ded8be591.jpg',
    );
    const [base64, setBase64] = useState();

    const handleUserphoto = (selectedPhoto) => {
        if (selectedPhoto) {
            console.log(selectedPhoto);
            const imageURL = URL.createObjectURL(selectedPhoto);
            setUserPhoto(imageURL); // Set image URL to state
        }
    };
    const handlePopupClose = () => {
        setPopupVisible(false);
    };
    const handlePopupSave = (selectedPhoto) => {
        handleUserphoto(selectedPhoto);
        setPopupVisible(false);

        axios
            .get(userPhoto, { responseType: 'blob' })
            .then((response) => {
                const blob = response.data;
                const reader = new FileReader();
                reader.onload = () => {
                    const base64String = reader.result.split(',')[1];
                    setBase64(base64String);

                    ChangeUserAvatar(userLogin, base64String)
                        .then((response) => {
                            if (response) {
                                showAlert('editAvatar');
                                setSaveSuccess(true);
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                };
                reader.readAsDataURL(blob);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleSave = () => {
        const updatedUser = {
            fullname: userFullname,
            introduce: userIntroduce,
            website: userWebsite,
            username: username,
        };

        changeUserInfo(userLogin, updatedUser)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => console.log(error));
    };
    return (
        // userData && (

        <Wrapper onSave={handleSave} admin={admin}>
            <div className={cx('wrapper')}>
                <div className={cx('container-infoProfile')}>
                    <h1>Chỉnh sửa hồ sơ</h1>
                    <p className={cx('discription')}>
                        Hãy giữ riêng tư thông tin cá nhân của bạn. Thông tin bạn thêm vào đây hiển thị cho bất kỳ ai có
                        thể xem hồ sơ của bạn.
                    </p>
                    <div className={cx('setUserProfilePhoto')}>
                        <div className={cx('UserPhoto')}>
                            <Image src={userData.avatar && `data:image/jpeg;base64,${userData.avatar}`} />
                        </div>
                        <div className={cx('setUserProfilePhoto-btn')}>
                            <Button primary className={cx('changeImageBtn')} onClick={() => setPopupVisible(true)}>
                                Thay đổi
                            </Button>
                            {isPopupVisible && (
                                <ChangeAvatar
                                    onClose={handlePopupClose}
                                    onSave={handlePopupSave}
                                    onSelectImage={handleUserphoto}
                                />
                            )}
                        </div>
                    </div>
                    <div className={cx('name-and-lastname')}>
                        <LabelTextBox
                            placeholder={'Họ và Tên'}
                            label={'Họ Tên'}
                            selectedSize={'medium'}
                            text={userFullname}
                            onChange={handlGetUserFullname}
                        />
                    </div>
                    {admin === false && (
                        <>
                            <LabelTextBox
                                placeholder={'Giới thiệu câu chuyện của bạn'}
                                label={'Giới thiệu'}
                                selectedSize={'large'}
                                text={userIntroduce}
                                onChange={handlGetUserIntroduce}
                            />
                            <LabelTextBox
                                placeholder={'Thêm liên kết để hướng lưu lượng vào trang web'}
                                label={'Trang web'}
                                selectedSize={'medium'}
                                text={userWebsite}
                                onChange={handleGetUserWebsite}
                            />
                        </>
                    )}

                    <LabelTextBox
                        placeholder={'Tên người dùng'}
                        label={'Tên người dùng'}
                        selectedSize={'medium'}
                        text={username}
                        onChange={handleGetUsername}
                    />
                </div>
                {alertType === 'editAvatar' && <ActionAlerts content={`Lưu ảnh thành công`} />}
            </div>
        </Wrapper>

        // )
    );
}
export default UserProfile;
