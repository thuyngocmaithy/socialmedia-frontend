import classNames from "classnames/bind";
import style from './LabelTextBox.module.scss';
import PropTypes from 'prop-types';
import { useState, forwardRef } from 'react';

function LabelTextBox({ headerName,
    placeholder,
    width,
    height,
    label,
    text,
    editable = true,
    hoverable = true,
    onChange,
    ...passProps

}) {


    let UserData = {
        headerName: 'họ tên',
        label: 'username : ',
        placeholder: 'nhập họ tên',
    };


    const cx = classNames.bind(style);
    const [inputValue, setinputValue] = useState("");

    const handleChange = (event) => {
        if (editable) {
            setinputValue(event.target.value);
        }
    };


    return (
        <>

            <div className={cx('wrapper')}>
                <h6>{UserData.headerName}</h6>
                <label>{UserData.label}</label>
                <input id="input text"
                    type="text"
                    placeholder={UserData.placeholder}
                    value={inputValue}
                    disabled={!editable}
                    onChange={handleChange}

                />

            </div>

        </>
    );
}

LabelTextBox.propTypes = {

    headerName: PropTypes.string,
    placeholder: PropTypes.string,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    label: PropTypes.string,
    text: PropTypes.string,
    editable: PropTypes.bool,
    hoverable: PropTypes.bool,
    onChange: PropTypes.func,

};


export default LabelTextBox;