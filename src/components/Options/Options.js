import React from 'react';
import classNames from 'classnames/bind';
import style from './Option.module.scss';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
function Options({ type, selectedSize }) {
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
            // Nếu không có selectedSize hoặc không khớp, sử dụng một class mặc định hoặc không có class
            break;
    }

    return (
        <div className={cx('Options')}>
            <label className={cx('OptionsLabel')}>
                {label}:
            </label>

            <select className={cx(inputClassname)}>
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


Options.propTypes = {
    type: PropTypes.oneOf(['contry', 'language', 'gender']),
    selectedSize: PropTypes.oneOf(['small', 'medium', 'large']),
};
export default Options;
