import {
    LinkedIcon,
    People,
    SearchIcon,
} from '../Icons';
import classNames from 'classnames/bind';
import styles from './Pin.module.scss';
const cx = classNames.bind(styles);

const ShareMenu = () => {
    return (<>
        <div style={
            {
                // minHeight:'450px',
                display: 'inline-flex',
                flexWrap:'wrap',
                flexDirection: 'column',
                padding: '10px 20px',
                borderRadius: '20px',
                width: '400px',
            }
        }>
            <a style={
                {
                    textAlign: 'center',
                    fontSize: '12px',
                    fontWeight: '600',
                    marginBottom:'20px',
                    marginTop:'20px'
                }
            }>Gửi trên Pinterest </a>
            <div style={
                {
                    fontSize:'12px',
                    display: 'flex',
                    flexDirection: 'row',
                }
            }>
                <div style={
                    {
                        textAlign:'center',
                        width:'60px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems:'center'

                    }
                }>
                    <SearchIcon className={cx('grey-button')}/>
                    <div style={{
                        height:'5px'
                    }}/>
                    <a>Tìm kiếm</a>
                </div>
                <div style={
                    {
                        textAlign:'center',
                        width:'60px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems:'center'

                    }
                }>
                    <People className={cx('grey-button')}/>
                    <div style={{
                        height:'5px'
                    }}/>
                    <a>Nhập</a>
                </div>
                <div style={
                    {
                        textAlign:'center',
                        width:'60px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems:'center'

                    }
                }>
                    <LinkedIcon className={cx('grey-button')}/>
                    <div style={{
                        height:'5px'
                    }}/>
                    <a>Sao chép liên kết</a>
                </div>
            </div>
        </div>
    </>);
};

export  default ShareMenu;
