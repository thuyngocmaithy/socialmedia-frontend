import classNames from 'classnames/bind';
import styles from './personal.module.scss'
import 'bootstrap/dist/css/bootstrap.min.css';


import AccountItem from '../../components/AccountItem';
import Image from '../../components/Image';
import Button from '../../components/Button';
import LabelTextBox from '../../components/LabelTextBox';
const cx = classNames.bind(styles);

function Personal() {
    let UserData = {
        nickname: 'lthai',
        avatar: '/src/assets/images/didong1.png',
        full_name: 'Thanh Hải',
        tick: 'true'
    };

    return (
        <>
            <div className={cx('wrapper')}>
                <h2>Chỉnh sửa hồ sơ</h2>
                <p id="discription">Hãy giữ riêng tư thông tin cá nhân của bạn. Thông tin bạn thêm vào đây hiển thị cho bất kỳ ai có thể xem hồ sơ của bạn.</p>
                <div className={cx('mainEditor')}>


                    {/*             
                <div className={cx('photoChosen')}>
                    ảnh
                </div>

                <div className={cx('nameEditor')}>
                    ho ten
                </div>

                <div className={cx('descriptionEditor')}>
                    gioi thieu
                </div>

                <div className={cx('websiteEditor')}>
                    web
                </div> */}

                    <LabelTextBox />

                </div>




            </div>


        </>
    );
}
export default Personal;