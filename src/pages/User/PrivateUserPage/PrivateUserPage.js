import classNames from 'classnames/bind';
import { useState } from "react";
import Switch from '@mui/material/Switch';


import BottomBar from '../../../components/BottomBar/BottomBar';
import LabelTextBox from '../../../components/LabelTextBox';
import styles from '../PrivateUserPage/PrivateUserPage.module.scss'
import Options from '../../../components/Options/Options';
import Button from '../../../components/Button';



function PrivateUserPage() {
    const cx = classNames.bind(styles);
    const label1 = { inputProps: { 'aria-label': 'Switch demo' } };

    const MENU_ITEMS = [
        {
            switchToggle: <Switch {...label1} />,
            title: 'private',
        },
    ];

    const countryOptions = [
        "Vietnam",
        "United States",
        "Canada",
        "United Kingdom",
        "Australia",
    ];

    const [isToggled, setIsToggled] = useState(false); // State để theo dõi trạng thái toggle

    const handleButtonClick = () => {
        setIsToggled(!isToggled); // Khi nút được nhấn, thay đổi trạng thái toggle
    };

    return (<>
        <div className={cx('wrapper')} >
            <div className={cx('MainInfo')}>
                <h1> Quản lý tài khoản</h1>
                <p className={cx('discription')}>
                    Thực hiện thay đổi đối với thông tin cá nhân hoặc loại tài khoản của bạn.
                </p>
                <div className={cx('PrivateUserInfo')}>
                    <h2 className={cx('Title')}>Tài khoản riêng tư của bạn</h2>
                    <LabelTextBox className={cx('EmailInfo')}
                        label={'Email - riêng tư'}
                        placeholder={'Email'}
                        selectedSize={'small'}
                    />
                    <LabelTextBox className={cx('Password')}
                        label={'Mật khẩu'}
                        selectedSize={'small'}
                        type={'password'}
                    />
                    <button className={cx('Button-change-password')}  >
                        đổi mật khẩu
                    </button>

                    <div className={cx('checkedPrivate')}>
                        <div className={cx('leftDiscription')}>
                            <p className={cx('labelCheckPrivate')}>
                                Công khai riêng tư :
                            </p>
                        </div>
                        <div className={cx('rightDiscription')}>
                            <Button switchToggle={<Switch {...label1} />} />
                        </div>
                    </div>


                    <LabelTextBox placeholder={'Ngày sinh'} label={'Ngày sinh'} type={'date'} selectedSize={'small'} />
                    <Options type='gender' />
                    <Options type='country' />
                    <Options type='language' />


                </div>
            </div>
        </div>
        <BottomBar />
    </>);
}

export default PrivateUserPage;