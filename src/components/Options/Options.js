import React from 'react';
import classNames from 'classnames/bind';
import style from './Option.module.scss';

function Options({ type }) {
    const cx = classNames.bind(style);

    const options = type === 'country'
        ? ["Vietnam", "United States", "Canada", "United Kingdom", "Australia"]
        : type === 'language'
            ? ["English", "Spanish", "French", "German", "Chinese"]
            : type === 'gender'
                ? ["Nam", "Nữ", "Khác"]
                : [];

    const label = type === 'country' ? 'Quốc gia/khu vực' : type === 'language' ? 'Ngôn ngữ' : 'Giới tính';

    return (
        <div className={cx('Options')}>
            <label className={cx('OptionsLabel')}>
                {label}:
            </label>
            <select>
                <option value="">Chọn {label.toLowerCase()}</option>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Options;
