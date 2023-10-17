import classNames from 'classnames/bind';
import styles from './ChangePassword.module.scss'
import LabelTextBox from '../../../components/LabelTextBox';
import SideBar from '../../../components/SideBar/SideBar';
import BottomBar from '../../../components/BottomBar/BottomBar';

const cx = classNames.bind(styles);

function ChangePassword() {
    return (<>
        <div className={cx('wrapper')}>

            <SideBar />

            <div className={cx('Main')}>
                <h1 className={cx('Title')}>Tài khoản riêng tư của bạn</h1>
                <p className={cx('discription')}>
                    Thực hiện thay đổi đối với thông tin bảo mật tài khoản của bạn
                </p>
                <LabelTextBox className={cx('EmailInfo')}
                    label={'Email'}
                    placeholder={'Email'}
                    selectedSize={'medium'}
                />
                <LabelTextBox className={cx('Password')}
                    label={'Mật khẩu'}
                    placeholder={'Mật khẩu'}
                    selectedSize={'medium'}
                    type={'password'}
                />
                <button className={cx('Button-change-password')}  >
                    Đổi mật khẩu
                </button>
            </div>
        </div>

        <BottomBar />
    </>);
}

export default ChangePassword;