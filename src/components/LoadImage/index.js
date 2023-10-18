import classNames from 'classnames/bind';
import styles from './LoadImage.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowUp } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';

const cx = classNames.bind(styles);
function LoadImage() {
    //preview img
    const [img, setIMG] = useState();
    const [showDiv, setShowDiv] = useState(true);

    useEffect(() => {
        return () => {
            img && URL.revokeObjectURL(img.preview);
        };
    }, [img]);

    const handlePreviewIMG = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setIMG(file);
        setShowDiv(false);
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
                name=""
                type="file"
                accept="image/gif, image/jpeg, image/png"
                onChange={handlePreviewIMG}
            />
            {img && <img src={img.preview} alt="" />}
        </div>
    );
}

export default LoadImage;
