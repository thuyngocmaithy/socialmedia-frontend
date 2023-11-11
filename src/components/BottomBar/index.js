import React from 'react';
import classNames from 'classnames/bind';
import styles from './BottomBar.module.scss';
import Button from '../Button';

const cx = classNames.bind(styles);

function BottomBar({ onSave }) {
    const refreshPage = () => {
        window.location.reload();
    };

    return (
        <div className={cx('bot-bar')}>
            <Button primary onClick={refreshPage}>
                Thiết lập lại
            </Button>
            <Button className={cx('saveBtn')} red onClick={onSave}>
                Lưu
            </Button>
        </div>
    );
}

export default BottomBar;
