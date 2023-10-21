import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import styles from './Create.module.scss';
import AccountInfo from '../../components/AccountInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import Button from '../../components/Button';
import LoadImage from '../../components/LoadImage';
const cx = classNames.bind(styles);

function Create() {
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
            ref.current.style.height = '0px';
            const taHeight = ref.current.scrollHeight;
            ref.current.style.height = taHeight + 'px';
        }
    };
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
    const [valContent, setValContent] = useState('');
    const handleCountContent = (e) => {
        setValContent(e.target.value);
    };

    const [valTitle, setValTitle] = useState('');
    const handleCountTitle = (e) => {
        setValTitle(e.target.value);
    };

    const avt = {
        avatar: '../avt.jpg',
        username: 'Cynthia Anna',
    };

    return (
        <div className={cx('wrapper-createPage')}>
            <div className={cx('createBox')}>
                <div className={cx('save-pin')}>
                    <Button className={cx('save-btn')} red>
                        Lưu
                    </Button>
                </div>
                {/* end header  */}
                <div className={cx('mainContent')}>
                    <div className={cx('insertIMG')}>
                        <LoadImage />
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
                                type="text"
                                placeholder="Tạo tiêu đề"
                                maxLength="100"
                                rows="1"
                                ref={titleRef}
                                onChange={(e) => {
                                    handleCountTitle(e);
                                    onChange(e);
                                }}
                                value={valTitle}
                            ></textarea>
                            <div className={cx('line')}></div>
                            <div className={cx('hidden-length', 'hidenTitle')}>
                                <p className={cx('hiddenText-title')}>
                                    40 ký tự đầu tiên của bạn là nội dung thường xuất hiện trong bảng tin
                                </p>
                                <p className={cx('titleLength')}>{100 - valTitle.length}</p>
                            </div>
                        </div>
                        <div className={cx('container-user')}>
                            <AccountInfo userImage={avt.avatar} username={avt.username} />
                        </div>

                        <div className={cx('content')}>
                            <textarea
                                className={cx('inputContent')}
                                type="text"
                                placeholder="Cho mọi người biết Ghim của bạn giới thiệu điều gì"
                                maxLength="500"
                                ref={contentRef}
                                rows="1"
                                onChange={(e) => {
                                    handleCountContent(e);
                                    onChange(e);
                                }}
                                value={valContent}
                            ></textarea>
                            <div className={cx('line')}></div>
                            <div className={cx('hidden-length', 'hidenContent')}>
                                <p className={cx('hiddenText-content')}>
                                    Mọi người thường sẽ thấy 50 ký tự đầu tiên khi họ nhấp vào Ghim của bạn
                                </p>
                                <p className={cx('titleLength')}>{500 - valContent.length}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Create;
