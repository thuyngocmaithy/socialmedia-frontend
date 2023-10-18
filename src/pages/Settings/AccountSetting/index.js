import classNames from 'classnames/bind';
import Switch from '@mui/material/Switch';
import LabelTextBox from '../../../components/LabelTextBox';
import styles from '../AccountSetting/AccountSetting.module.scss';
import Options from '../../../components/Options/Options';
import Button from '../../../components/Button';
import Wrapper from '../Wrapper';

function AccountSetting() {
    const cx = classNames.bind(styles);
    const label1 = { inputProps: { 'aria-label': 'Switch demo' } };

    return (
        <Wrapper>
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
                    />

                    <Options type="gender" selectedSize={'medium'} />
                    <Options type="country" selectedSize={'medium'} />
                    <Options type="language" selectedSize={'medium'} />

                    <div className={cx('checkedPrivate')}>
                        <div className={cx('leftDiscription')}>
                            <p className={cx('labelCheckPrivate')}>Tài khoản riêng tư:</p>
                        </div>

                        <div className={cx('rightDiscription')}>
                            <Button switchToggle={<Switch {...label1} />}> </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
}

export default AccountSetting;
