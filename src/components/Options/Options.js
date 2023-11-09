import React from 'react';
import classNames from 'classnames/bind';
import style from './Option.module.scss';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
function Options({ type, selectedSize, value, onChange }) {
    const cx = classNames.bind(style);

    const options = type === 'country'
        ? ["Vietnam", "United States", "Canada", "United Kingdom", "Australia"]
        : type === 'language'
            ? ["English", "Spanish", "French", "German", "Chinese"]
            : type === 'gender'
                ? ["Nam", "Nữ", "Khác"]
                : [];

    const label = type === 'country' ? 'Quốc gia/khu vực' : type === 'language' ? 'Ngôn ngữ' : 'Giới tính';

    let inputClassname = '';
    switch (selectedSize) {
        case 'small':
            inputClassname = 'small';
            break;
        case 'medium':
            inputClassname = 'medium';
            break;
        case 'large':
            inputClassname = 'large';
            break;
        default:

            break;
    }
    const displayValue = options.includes(value) ? value : options[0];
    options.forEach((option, index) => {
        if (value === option) {
            options.splice(index, 1); // Loại bỏ giá trị trùng khỏi mảng
        }
    });

    // Thêm giá trị mới vào mảng
    // options.push(value);
    return (
        <div className={cx('Options')}>
            <label className={cx('OptionsLabel')}>
                {label}:
            </label>

            <select className={cx(inputClassname)} onChange={onChange}>
                <option value={value}>{displayValue}</option>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}


Options.propTypes = {
    type: PropTypes.oneOf(['country', 'language', 'gender']),
    selectedSize: PropTypes.oneOf(['small', 'medium', 'large']),
    value: PropTypes.string,
    onChange: PropTypes.func,
};
export default Options;
