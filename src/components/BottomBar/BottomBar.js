import React from 'react';
import classNames from 'classnames/bind';
import styles from './BottomBar.module.scss';

const cx = classNames.bind(styles);

function BottomBar({ hasChanges, onSaveClick }) {
    return (
        <div className={cx('bot-bar')}>
            <button className={cx('reset-btn')}>Thiết Lập Lại</button>
            <button className={cx('save-btn', { 'has-changes': hasChanges })} onClick={onSaveClick} >Lưu</button>
        </div>
    );
}

export default BottomBar;