import classNames from 'classnames/bind';
import styles from './InfoProfile.module.scss';
import { useState, useEffect, useCallback, useContext, createContext } from 'react';
import ChangeAvatar from '../../../components/Popup/ChangeAvatar';
import Image from '../../../components/Image';
import LabelTextBox from '../../../components/LabelTextBox';
import Wrapper from '../Wrapper';
import Button from '../../../components/Button';

const cx = classNames.bind(styles);

function UserProfile() {
    let UserData = {
        headerName: 'họ tên',
        label: 'Tên ',
        placeholder: 'Nhập tên',
        size: 'small',
    };

    const [isPopupVisible, setPopupVisible] = useState(false);

    const handlePopupClose = (selectedImage) => {
        // Xử lý tệp hình ảnh đã chọn ở đây (selectedImage)
        console.log('Selected image:', selectedImage);

        // Đóng popup
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
        <div className={cx('wrapper')}>
            <Wrapper>
                <div className={cx('container-infoProfile')}>
                    <h1>Chỉnh sửa hồ sơ</h1>
                    <p className={cx('discription')}>
                        Hãy giữ riêng tư thông tin cá nhân của bạn. Thông tin bạn thêm vào đây hiển thị cho bất kỳ ai có
                        thể xem hồ sơ của bạn.
                    </p>
                    <div className={cx('setUserProfilePhoto')}>
                        <div className={cx('UserPhoto')}>
                            <Image
                                src={'https://i.pinimg.com/140x140_RS/4d/3f/94/4d3f944a16455e5ad198b76ded8be591.jpg'}
                            />
                        </div>
                        <div className={cx('setUserProfilePhoto-btn')}>
                            <Button primary className={cx('changeImageBtn')} onClick={() => setPopupVisible(true)}>
                                Thay đổi
                            </Button>
                            {isPopupVisible && <ChangeAvatar onClose={handlePopupClose} />}
                        </div>
                    </div>
                    <div className={cx('name-and-lastname')}>
                        <LabelTextBox
                            placeholder={UserData.placeholder}
                            label={UserData.label}
                            selectedSize={UserData.size}
                        />
                        <LabelTextBox
                            placeholder={'Nhập họ'}
                            label={'Họ'}
                            size={UserData.size}
                            selectedSize={UserData.size}
                        />
                    </div>

                    <LabelTextBox
                        placeholder={'Giới thiệu câu chuyện của bạn'}
                        label={'Giới thiệu'}
                        selectedSize={'large'}
                    />
                    <LabelTextBox
                        placeholder={'Thêm liên kết để hướng lưu lượng vào trang web'}
                        label={'Trang web'}
                        selectedSize={'medium'}
                    />
                    <LabelTextBox placeholder={'Tên người dùng'} label={'Tên người dùng'} selectedSize={'medium'} />
                </div>
            </Wrapper>
        </div>
    );
}
export default UserProfile;
