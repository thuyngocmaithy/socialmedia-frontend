import React, { useState, useRef } from "react";
import styles from './PopupForm.module.scss'
import classNames from 'classnames/bind';

function PopupForm({ onClose }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [fileButtonText, setFileButtonText] = useState("Chọn ảnh");
    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);

        if (file) {
            setFileButtonText(file.name);
        } else {
            setFileButtonText("Chọn ảnh");
        }
    };


    console.log(fileInputRef.current);
    const cx = classNames.bind(styles);
    return (
        <div className={cx('popup-background')}>
            <div className={cx('popup-container')}>
                {/* <button className={cx('close')} onClick={onClose}>
                    x
                </button> */}
                <div className={cx('popup-top')}>
                    <h2>Thay đổi ảnh của bạn</h2>
                </div>
                <div className={cx('popup-bottom')}>
                    <button className={cx('picChosen')} onClick={handleButtonClick} >
                        {fileButtonText}
                    </button>
                    <input
                        ref={fileInputRef}
                        id="input-file"
                        title="chọn ảnh"
                        type="file"
                        accept="image/png, image/gif, image/jpg, .png, .jpg, .jpeg"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                    />

                </div>
                <div className={cx('save')}>
                    <button onClick={() => onClose(selectedImage)}>Lưu</button>
                </div>

                {/* <button onClick={onClose}>Đóng</button> */}
            </div>

        </div>
    );
};

export default PopupForm;