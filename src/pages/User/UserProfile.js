import classNames from 'classnames/bind';
import styles from './UserProfile.module.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../components/LabelTextBox/LabelTextBox.module.scss'


import AccountItem from '../../components/AccountItem';
import Image from '../../components/Image';
import Button from '../../components/Button';
import LabelTextBox from '../../components/LabelTextBox';
const cx = classNames.bind(styles);

function UserProfile() {
    let UserData = {
        headerName: 'họ tên',
        label: 'Tên ',
        placeholder: 'nhập tên',
        size: 'small',
    };

    return (
        <>
            <div className={cx('wrapper')}>
                <h2>Chỉnh sửa hồ sơ</h2>
                <p id="discription">Hãy giữ riêng tư thông tin cá nhân của bạn. Thông tin bạn thêm vào đây hiển thị cho bất kỳ ai có thể xem hồ sơ của bạn.</p>
                <div className={cx('mainEditor')}>
                    <div className={cx('setUserProfilePhoto')}>

                        <div className={cx('UserPhoto')}>
                            <Image src={'https://i.pinimg.com/140x140_RS/4d/3f/94/4d3f944a16455e5ad198b76ded8be591.jpg'} />
                        </div>
                        <div className={cx('setUserProfilePhoto-btn')}>
                            <button type="button" className={cx('btn')} label='Thay đổi ảnh hồ sơ'>
                                thay đổi
                            </button>
                        </div>
                    </div>
                    <div className={cx('name-and-lastname')}>
                        <LabelTextBox placeholder={UserData.placeholder} label={UserData.label} size={UserData.size} selectedSize={UserData.size} />
                        <LabelTextBox placeholder={'nhập họ'} label={'Họ'} size={UserData.size} selectedSize={UserData.size} />
                    </div>
                    <LabelTextBox placeholder={'giới thiệu câu chuyện của bạn'} label={'Giới thiệu'} selectedSize={'large'} />
                    <LabelTextBox placeholder={'thêm liên kết để hướng lưu lượng vào trang web'} label={'Trang web'} selectedSize={'medium'} />
                    <LabelTextBox placeholder={'tên người dùng'} label={'Tên người dùng'} />
                </div>

            </div >


        </>
    );
}
export default Personal;