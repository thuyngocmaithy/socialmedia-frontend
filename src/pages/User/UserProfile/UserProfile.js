import classNames from 'classnames/bind';
import styles from './UserProfile.module.scss'

import { useState } from "react"

import PopupForm from '../../../components/Popper/PopupForm/PopupForm';
import Image from '../../../components/Image';
import LabelTextBox from '../../../components/LabelTextBox';
import SideBar from '../../../components/SideBar/SideBar';
import 'bootstrap/dist/css/bootstrap.min.css';

import BottomBar from '../../../components/BottomBar/BottomBar';
import Options from '../../../components/Options/Options';
const cx = classNames.bind(styles);

function UserProfile() {
    let UserData = {
        headerName: 'họ tên',
        label: 'Tên ',
        placeholder: 'Nhập tên',
        size: 'small',
    };

    const genders = {
        male: 'Nam',
        female: 'Nữ',
        orther: 'khác',
    };

    const [isPopupVisible, setPopupVisible] = useState(false);

    const handlePopupClose = (selectedImage) => {
        // Xử lý tệp hình ảnh đã chọn ở đây (selectedImage)
        console.log("Selected image:", selectedImage);

        // Đóng popup
        setPopupVisible(false);
    };

    return (
        <>
            <div className={cx('wrapper')}>

                <div className={cx('mainEditor')}>
                    <h1>Chỉnh sửa hồ sơ</h1>

                    <p className={cx('discription')}>Hãy giữ riêng tư thông tin cá nhân của bạn. Thông tin bạn thêm vào đây hiển thị cho bất kỳ ai có thể xem hồ sơ của bạn.</p>
                    <div className={cx('setUserProfilePhoto')}>

                        <div className={cx('UserPhoto')}>
                            <Image src={'https://i.pinimg.com/140x140_RS/4d/3f/94/4d3f944a16455e5ad198b76ded8be591.jpg'} />
                        </div>
                        <div className={cx('setUserProfilePhoto-btn')}>
                            <button type="button" className={cx('btn-change')} label='Thay đổi ảnh hồ sơ'
                                onClick={() => setPopupVisible(true)}>
                                thay đổi
                            </button>
                            {isPopupVisible && <PopupForm onClose={handlePopupClose} />}
                        </div>
                    </div>
                    <div className={cx('name-and-lastname')}>
                        <LabelTextBox placeholder={UserData.placeholder} label={UserData.label} selectedSize={UserData.size} />
                        <LabelTextBox placeholder={'Nhập họ'} label={'Họ'} size={UserData.size} selectedSize={UserData.size} />
                    </div>

                    <LabelTextBox placeholder={'Giới thiệu câu chuyện của bạn'} label={'Giới thiệu'} selectedSize={'large'} />
                    <LabelTextBox placeholder={'Thêm liên kết để hướng lưu lượng vào trang web'} label={'Trang web'} selectedSize={'medium'} />
                    <LabelTextBox placeholder={'Tên người dùng'} label={'Tên người dùng'} selectedSize={'medium'} />

                </div>

            </div >

            <BottomBar />
        </>
    );
}
export default UserProfile;