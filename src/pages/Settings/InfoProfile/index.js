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





const cx = classNames.bind(styles);

function UserProfile() {

    const [userData, setUserData] = useState({});

    const userID = "1";
    useEffect(() => {
        // Gửi yêu cầu GET để lấy thông tin người dùng
        getUserById(1)
            .then(response => {
                setUserData(response);
            })
            .catch(error => {
                console.error(error);
            });
    }, [userID]);

    const [userFullname, setUserFullname] = useState('');
    const handlGetUserFullname = useCallback((event) => {
        setUserFullname((prevFullname) => event.target.value);
    }, []);

    const [userIntroduce, setUserIntroduce] = useState('');
    const handlGetUserIntroduce = useCallback((event) => {
        setUserIntroduce((prevIntroduce) => event.target.value);
    }, []);

    const [userWebsite, setUserWebsite] = useState('');
    const handleGetUserWebsite = useCallback((event) => {
        setUserWebsite((prevWebsite) => event.target.value);
    }, []);


    const [username, setUsername] = useState('');
    const handleGetUsername = useCallback((event) => {
        setUsername((prevUsername) => event.target.value);
    }, []);



    const [isPopupVisible, setPopupVisible] = useState(false);


    const [userPhoto, setUserPhoto] = useState(
        'https://i.pinimg.com/140x140_RS/4d/3f/94/4d3f944a16455e5ad198b76ded8be591.jpg'
    );
    const [base64, setBase64] = useState();

    const handleUserphoto = (selectedPhoto) => {
        if (selectedPhoto) {
            const imageURL = URL.createObjectURL(selectedPhoto);
            setUserPhoto(imageURL); // Set image URL to state
        }
    };


    const handlePopupClose = (selectedPhoto) => {
        handleUserphoto(selectedPhoto);
        console.log(userPhoto);
        setPopupVisible(false);
        console.log(userData.avatar);



        axios.get(userPhoto, { responseType: 'blob' })
            .then(response => {
                const blob = response.data;
                const reader = new FileReader();
                reader.onload = () => {
                    const base64String = reader.result.split(',')[1];
                    setBase64(base64String);
                    console.log(base64String);
                    console.log(base64);
                    // const String64 = atob(base64String);
                    // console.log(String64);
                    // console.log(typeof String64);


                    // const encoder = new TextEncoder();
                    // const byteArray = encoder.encode(String64);
                    // console.log(typeof byteArray);
                    ChangeUserAvatar(1, base64String)
                        .then(response => { console.log(response) })
                        .catch(error => { console.log(error) });
                };
                reader.readAsDataURL(blob);
            })
            .catch(error => {
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

        changeUserInfo(1, updatedUser)
            .then(response => {
                console.log(response);
            })
            .catch(error => console.log(error));

    };
    return (
        <div className={cx('wrapper')}>
            <Wrapper onSave={handleSave}>
                <div className={cx('container-infoProfile')}>
                    <h1>Chỉnh sửa hồ sơ</h1>
                    <p className={cx('discription')}>
                        Hãy giữ riêng tư thông tin cá nhân của bạn. Thông tin bạn thêm vào đây hiển thị cho bất kỳ ai có
                        thể xem hồ sơ của bạn.
                    </p>
                    <div className={cx('setUserProfilePhoto')}>
                        <div className={cx('UserPhoto')}>


                            <Image src={`data:image/jpeg;base64,${userData.avatar}`} />
                        </div>
                        <div className={cx('setUserProfilePhoto-btn')}>
                            <Button primary className={cx('changeImageBtn')} onClick={() => setPopupVisible(true)}>Thay đổi</Button>
                            {isPopupVisible && <ChangeAvatar onClose={handlePopupClose} onSelectImage={handleUserphoto} />}

                        </div>
                    </div>
                    <div className={cx('name-and-lastname')}>
                        <LabelTextBox
                            placeholder={"Họ và Tên"}
                            label={'Họ Tên'}
                            selectedSize={"medium"}
                            text={userData.fullname}
                            onChange={handlGetUserFullname}
                        />
                    </div>

                    <LabelTextBox
                        placeholder={'Giới thiệu câu chuyện của bạn'}
                        label={'Giới thiệu'}
                        selectedSize={'large'}
                        text={userData.introduce}
                        onChange={handlGetUserIntroduce}
                    />
                    <LabelTextBox
                        placeholder={'Thêm liên kết để hướng lưu lượng vào trang web'}
                        label={'Trang web'}
                        selectedSize={'medium'}
                        text={userData.website}
                        onChange={handleGetUserWebsite}
                    />
                    <LabelTextBox
                        placeholder={'Tên người dùng'}
                        label={'Tên người dùng'}
                        selectedSize={'medium'}
                        text={userData.username}
                        onChange={handleGetUsername}
                    />
                </div>
            </Wrapper>
        </div>
    );
}
export default UserProfile;
