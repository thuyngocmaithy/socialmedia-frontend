import classNames from 'classnames/bind';
import styles from './InfoProfile.module.scss';
import { useState } from 'react';
import ChangeAvatar from '../../../components/Popup/ChangeAvatar';
import Image from '../../../components/Image';
import LabelTextBox from '../../../components/LabelTextBox';
import Wrapper from '../Wrapper';
import Button from '../../../components/Button';

const cx = classNames.bind(styles);

function UserProfile({ admin = false }) {
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

    return (
        <div className={cx('wrapper')}>
            <Wrapper admin>
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
                    {admin === false && (
                        <>
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
                        </>
                    )}

                    <LabelTextBox placeholder={'Tên người dùng'} label={'Tên người dùng'} selectedSize={'medium'} />
                </div>
            </Wrapper>
        </div>
    );
}
export default UserProfile;
