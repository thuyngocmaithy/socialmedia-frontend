import classNames from 'classnames/bind';
import styles from './ChangePassword.module.scss';
import LabelTextBox from '../../../components/LabelTextBox';
import Wrapper from '../Wrapper';
import Button from '../../../components/Button';

const cx = classNames.bind(styles);

function ChangePassword() {
    return (
        <Wrapper bottom={false}>
            <div className={cx('container-changepassword')}>
                <h1 className={cx('Title')}>Đổi mật khẩu</h1>
                <p className={cx('discription')}>Thực hiện thay đổi đối với thông tin bảo mật tài khoản của bạn</p>
                <LabelTextBox
                    className={cx('EmailInfo')}
                    label={'Email'}
                    placeholder={'Email'}
                    selectedSize={'medium'}
                />
                <LabelTextBox
                    className={cx('Password')}
                    label={'Mật khẩu'}
                    placeholder={'Mật khẩu'}
                    selectedSize={'medium'}
                    type={'password'}
                />
                <Button className={cx('changeBtn')} primary>
                    Đổi mật khẩu
                </Button>
            </div>
        </Wrapper>
    );
}

export default ChangePassword;
