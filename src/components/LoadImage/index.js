import classNames from 'classnames/bind';
import styles from './LoadImage.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowUp } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';

const cx = classNames.bind(styles);
function LoadImage({ onSelectImage }) {
    //preview img
    const [img, setIMG] = useState();
    const [showDiv, setShowDiv] = useState(true);

    useEffect(() => {
        return () => {
            img && URL.revokeObjectURL(img.preview);
        };
    }, [img]);
    const sendtoParent = (file) => {
        if (onSelectImage) {
            onSelectImage(file);
            console.log(file);
        }
    };
    const handlePreviewIMG = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setIMG(file);
        setShowDiv(false);
        sendtoParent(file);
    };
    return (
        <div className={cx('imgFrame')} onClick={() => document.querySelector('.inputIMG').click()}>
            {showDiv && (
                <div className={cx('upload-text')}>
                    <button className={cx('upload-btn')}>
                        <FontAwesomeIcon icon={faCircleArrowUp} />
                    </button>
                    <p className={cx('text')}>Kéo và thả hoặc nhấp vào</p>
                    <p className={cx('text')}>để tải file lên</p>
                </div>
            )}
            <input
                className={cx('inputIMG', 'uploadText')}
                hidden
                name="uploadPhoto"
                type="file"
                accept="image/gif, image/jpeg, image/png"
                onChange={handlePreviewIMG}
            />
            {img && <img src={img.preview} alt="userPhoto" />}
        </div>
    );
}

export default LoadImage;