import React, { useState, useEffect, useContext } from 'react';
import classNames from 'classnames/bind';
import style from './LabelTextBox.module.scss';
import PropTypes from 'prop-types';
import { ThemeContext } from '../../context/ThemeContext';

function LabelTextBox({
    name,
    placeholder,
    label,
    type,
    text = '',
    error = '',
    customGetValue,
    editable = true,
    hoverable = true,
    onChange,
    selectedSize,
    area = false,
    ...passProps
}) {
    const cx = classNames.bind(style);
    const { theme } = useContext(ThemeContext);
    const [inputValue, setInputValue] = useState(text); // Sử dụng giá trị text từ prop
    const [change, setChange] = useState(false);

    const handleChange = (event) => {
        if (editable) {
            setInputValue(event.target.value);
            setChange(true);
            if (customGetValue) {
                customGetValue(event.target.value);
            }
        }
    };

    useEffect(() => {
        // Update giá trị inputValue khi prop text thay đổi
        setInputValue(text);
    }, [text]);

    let inputClassname = '';
    switch (selectedSize) {
        case 'small':
            inputClassname = 'small';
            break;
        case 'medium':
            inputClassname = 'medium';
            break;
        case 'medium2':
            inputClassname = 'medium2';
            break;

        case 'large':
            inputClassname = 'large';
            break;

        case 'sizeTextArea':
            inputClassname = 'sizeTextArea';
            break;
        default:
            // Nếu không có selectedSize hoặc không khớp, sử dụng một class mặc định hoặc không có class
            break;
    }

    const wrapperClasses = cx('wrapper', theme === 'dark' ? 'dark' : '');
    return (
        <div className={wrapperClasses}>
            <label>{label}</label>
            {area ? (
                <>
                    <textarea
                        name={name}
                        alt=""
                        className={cx(inputClassname)}
                        placeholder={placeholder}
                        value={inputValue}
                        disabled={!editable}
                        onChange={onChange ? onChange : handleChange}
                    ></textarea>
                    {error === '' && inputValue === '' && change ? `${label} rỗng` : error !== '' ? error : ''}
                </>
            ) : (
                <>
                    <input
                        name={name}
                        type={type}
                        placeholder={placeholder}
                        value={inputValue}
                        disabled={!editable}
                        onChange={(event) => {
                            onChange && onChange(event);
                            handleChange(event);
                        }}
                        className={cx(inputClassname)}
                    />
                    <span className={cx('error')}>
                        {error === '' && inputValue === '' && change ? `${label} rỗng` : error !== '' ? error : ''}
                    </span>
                </>
            )}
        </div>
    );
}

LabelTextBox.propTypes = {
    name: PropTypes.string,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.oneOf(['text', 'date', 'password', 'radio']),
    text: PropTypes.string,
    editable: PropTypes.bool,
    hoverable: PropTypes.bool,
    onChange: PropTypes.func,
    selectedSize: PropTypes.oneOf(['small', 'medium', 'medium2', 'large', 'sizeTextArea']),
};

export default LabelTextBox;
