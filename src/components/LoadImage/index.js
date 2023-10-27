import classNames from 'classnames/bind';
import styles from './LoadImage.module.scss';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowUp, faTrash } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';

const cx = classNames.bind(styles);
function LoadImage({handleChangeIMGPath}) {
    //preview img
    const [img, setIMG] = useState();
    const [showDiv, setShowDiv] = useState(true);
    const [del, setDelete] = useState(false);

    useEffect(() => {
        return () => {
            img && URL.revokeObjectURL(img.preview);
        };
    }, [img]);

    const handlePreviewIMG = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        handleChangeIMGPath(file);
        setIMG(file);
        setShowDiv(false);
        setDelete(true);
    };

    //delete img

    const deleteIMG = () => {
        setIMG('')
        setShowDiv(true)
        setDelete(false)
    }

    return (
        <div className={cx('insertIMG')}>
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
            <Tippy delay={[0, 100]} content="Xóa ảnh" placement="bottom">
                <div className={cx('deleteIMG')}>
                    <button className={cx('delete-btn')} onClick={() => deleteIMG()}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
            </Tippy>
        </div>
    );
}

export default LoadImage;
