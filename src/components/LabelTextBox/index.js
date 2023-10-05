import classNames from "classnames/bind";
import style from './LabelTextBox.module.scss';
import PropTypes from 'prop-types';
import { useState, forwardRef } from 'react';

function LabelTextBox({
    headerName,
    placeholder,
    label,
    text,
    editable = true,
    hoverable = true,
    onChange,
    selectedSize,
    ...passProps

}) {



    const cx = classNames.bind(style);
    const [inputValue, setinputValue] = useState("");

    const handleChange = (event) => {
        if (editable) {
            setinputValue(event.target.value);
        }
    };

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
    // console.log(inputClassname);
    const wrapperClasses = cx('wrapper');
    return (
        <>

            <div className={wrapperClasses}>
                <h6>{headerName}</h6>
                <label>{label}</label>
                <input id="input-text"
                    type="text"
                    placeholder={placeholder}
                    value={inputValue}
                    disabled={!editable}
                    onChange={handleChange}
                    className={cx(inputClassname)}

                />
                {/* href */}

            </div>

        </>
    );
}

LabelTextBox.propTypes = {

    headerName: PropTypes.string,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    text: PropTypes.string,
    editable: PropTypes.bool,
    hoverable: PropTypes.bool,
    onChange: PropTypes.func,
    selectedSize: PropTypes.oneOf(['small', 'medium', 'large']),

};


export default LabelTextBox;