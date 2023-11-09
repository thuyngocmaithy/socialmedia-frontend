import classNames from 'classnames/bind';
import styles from './Settings.module.scss';
import SideBar from '../../components/SideBar';
import BottomBar from '../../components/BottomBar';

const cx = classNames.bind(styles);

function Wrapper({ children, bottom = true, onSave }) {
    return (
        <>
            <div className={cx('container-wrapper')}>
                <SideBar />
                {children}
            </div>
            {bottom && <BottomBar onSave={onSave} />}
        </>
    );
}
export default Wrapper;
