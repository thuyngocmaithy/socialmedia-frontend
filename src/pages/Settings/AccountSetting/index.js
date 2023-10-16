import classNames from 'classnames/bind';
import { useState } from "react";
import Switch from '@mui/material/Switch';
import BottomBar from '../../../components/BottomBar/BottomBar';
import LabelTextBox from '../../../components/LabelTextBox';
import styles from '../AccountSetting/AccountSetting.module.scss'
import Options from '../../../components/Options/Options';
import Button from '../../../components/Button';
import SideBar from '../../../components/SideBar/SideBar';



function AccountSetting() {
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


    const SideBarItems = [
        {
            title: 'User Profile ',
            to: '/user/profile',
        },
        {
            title: 'Private User',
            to: '/user/private',
        },
    ];

    return (<>

        <div className={cx('wrapper')} >

            {/* <div className={cx('sidebar')}>
                {SideBarItems.map
                    (
                        (item, index) => (
                            <NavLink to={item.to} key={index} className={cx('menu-item-text')} >
                                {item.title}
                            </NavLink>
                        )
                    )
                }
            </div> */}

            <SideBar />


            <div className={cx('MainInfo')}>
                <h1> Quản lý tài khoản</h1>
                <p className={cx('discription')}>
                    Thực hiện thay đổi đối với thông tin cá nhân hoặc loại tài khoản của bạn.
                </p>
                <div className={cx('PrivateUserInfo')}>
                    {/* <h2 className={cx('Title')}>Tài khoản riêng tư của bạn</h2>
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
                    </button> */}



                    <LabelTextBox placeholder={'Ngày sinh '} label={'Ngày sinh: '} type={'date'} selectedSize={'medium2'} />

                    <Options type='gender' selectedSize={'medium'} />
                    <Options type='country' selectedSize={'medium'} />
                    <Options type='language' selectedSize={'medium'} />

                    <div className={cx('checkedPrivate')}>
                        <div className={cx('leftDiscription')}>
                            <p className={cx('labelCheckPrivate')}>
                                Tài khoản riêng tư:
                            </p>
                        </div>
                        <div className={cx('rightDiscription')}>
                            <Button switchToggle={<Switch {...label1} />} > </Button>
                        </div>
                    </div>


                </div>
            </div>
        </div>
        <BottomBar />
    </>);
}

export default AccountSetting;