import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import styles from './Create.module.scss';
import Menu from '../../components/Popper/Menu';
import AccountInfo from '../../components/AccountInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faChevronDown, faCircleArrowUp, faTrash } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
const cx = classNames.bind(styles);



function Create() {
    //preview img
    const [img, setIMG] = useState()
    const [showDiv, setShowDiv] = useState(true);

    useEffect(() => {
        return () => {
            img && URL.revokeObjectURL(img.preview)
        }
    }, [img])

    const handlePreviewIMG = (e) => {
        const file = e.target.files[0]
        file.preview = URL.createObjectURL(file)
        setIMG(file)
        setShowDiv(false)
        // const toRemove = document.getElementsByClassName('.upload-text');
        // // console.log(document.querySelector('.uploadText'));
        // toRemove.styles('display = none');
        // // toRemove.parentNode.removeChild(toRemove);

    }

    //auto resize textarea
    const titleRef = React.useRef();
    const contentRef = React.useRef();
    const [value, setValue] = React.useState();
    const onChange = (event) => {
        setValue(event.target.value);
    };
    const autoResize = (ref) => {
        if (ref && ref.current) {
            // textRef.current.rows = 2;
            ref.current.style.height = "0px";
            const taHeight = ref.current.scrollHeight;
            ref.current.style.height = taHeight + "px";
        }
    }
    React.useEffect(() => {
        // if (textRef && textRef.current) { 
        //     // textRef.current.rows = 2;
        //     console.log(textRef.current.style.height);
        //     textRef.current.style.height = "0px";
        //     const taHeight = textRef.current.scrollHeight;
        //     textRef.current.style.height = taHeight + "px";
        // }
        autoResize(titleRef);
        autoResize(contentRef);
    }, [value]);


    //count length
    const [valContent, setValContent] = useState('')
    const handleCountContent = (e) => {
        setValContent(e.target.value);
    }

    const [valTitle, setValTitle] = useState('')
    const handleCountTitle = (e) => {
        setValTitle(e.target.value);
    }

    const avt = {
        avatar: '../avt.jpg',
        username: 'Cynthia Anna'
    }

    return (
        <div className={cx('wrapper-createPage')}>
            <div className={cx('createBox')}>
                <div className={cx('header-createBox')}>
                    <div className={cx('close-createBox')}>
                        <button className={cx('close-btn')}>
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </div>
                    <div className={cx('wrapperBtns')}>
                        <div className={cx('choose-board')}>
                            <p className={cx('boardTitle')}>Chọn bảng</p>
                            <Menu className={cx('action-selectBoard')} >
                                <button className={cx('more-btn')}>
                                    <FontAwesomeIcon icon={faChevronDown} />
                                </button>
                            </Menu>
                        </div>
                        <div className={cx('save-pin')}>
                            <button className={cx('save-btn')}>Lưu</button>
                        </div>
                    </div>
                </div>
                {/* end header  */}
                <div className={cx('mainContent')}>
                    <div className={cx('insertIMG')}>
                        <div className={cx('imgFrame')} onClick={() => document.querySelector('.inputIMG').click()}>
                            {showDiv &&
                                <div className={cx('upload-text')}>
                                    <button className={cx('upload-btn')}>
                                        <FontAwesomeIcon icon={faCircleArrowUp} />
                                    </button>
                                    <p className={cx('text')}>
                                        Kéo và thả hoặc nhấp vào
                                    </p>
                                    <p className={cx('text')}>
                                        để tải file lên
                                    </p>
                                </div>
                            }
                            <input
                                className={cx('inputIMG', 'uploadText')}
                                hidden name=''
                                type='file'
                                accept='image/gif, image/jpeg, image/png'
                                onChange={handlePreviewIMG}
                            />
                            {img && (
                                <img src={img.preview} alt="" width="50%" height="50%" />
                            )}
                        </div>
                        <Tippy delay={[0, 100]} content="Xóa ảnh" placement="bottom">
                            <div className={cx('deleteIMG')}>
                                <button className={cx('delete-btn')}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>
                        </Tippy>
                    </div>
                    {/* end upload IMG */}
                    <div className={cx('insertData')}>
                        <div className={cx('title')}>
                            <textarea
                                className={cx('inputTitle')}
                                type='text'
                                placeholder='Tạo tiêu đề'
                                maxLength='100'
                                rows='1'
                                ref={titleRef}
                                onChange={(e) => {
                                    handleCountTitle(e);
                                    onChange(e);
                                }}
                                value={valTitle}
                            ></textarea>
                            <div className={cx('line')}></div>
                            <div className={cx('hidden-length', 'hidenTitle')}>
                                <p className={cx('hiddenText-title')}>40 ký tự đầu tiên của bạn là nội dung thường xuất hiện trong bảng tin</p>
                                <p className={cx('titleLength')}>{100 - valTitle.length}</p>
                            </div>
                        </div>
                        <AccountInfo
                            userImage={avt.avatar}
                            username={avt.username}
                        />
                        <div className={cx('content')}>
                            <textarea
                                className={cx('inputContent')}
                                type='text'
                                placeholder='Cho mọi người biết Ghim của bạn giới thiệu điều gì'
                                maxLength='500'
                                ref={contentRef}
                                rows='1'
                                onChange={(e) => {
                                    handleCountContent(e);
                                    onChange(e);
                                }}
                                value={valContent}
                            ></textarea>
                            <div className={cx('line')}></div>
                            <div className={cx('hidden-length', 'hidenContent')}>
                                <p className={cx('hiddenText-content')}>Mọi người thường sẽ thấy 50 ký tự đầu tiên khi họ nhấp vào Ghim của bạn</p>
                                <p className={cx('titleLength')}>{500 - valContent.length}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Create;