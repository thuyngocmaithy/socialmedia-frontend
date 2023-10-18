import React from 'react';
import classNames from 'classnames/bind';
import styles from './BottomBar.module.scss';
import Button from '../Button';

const cx = classNames.bind(styles);

function BottomBar() {
    return (
        <div className={cx('bot-bar')}>
            <Button primary>Thiết lập lại</Button>
            <Button className={cx('saveBtn')} primary>
                Lưu
            </Button>
        </div>
    );
}

export default BottomBar;