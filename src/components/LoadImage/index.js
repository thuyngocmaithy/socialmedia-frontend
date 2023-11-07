import classNames from 'classnames/bind';
import styles from './LoadImage.module.scss';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowUp, faTrash } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
// import GoogleDrivePicker from '../GoogleDrivePicker/GoogleDrivePicker';

import useDrivePicker from 'react-google-drive-picker';
// import { drive } from 'googleapis/build/src/apis/drive';

const cx = classNames.bind(styles);
function LoadImage({handleChangeIMGPath}) {
    // Handle Choose Image by Using Google Drive 
    const [apiData, setApiData] = useState();
    const [openPicker, data, authResponse] = useDrivePicker();  
    const handleChooseFile = () => {
        openPicker({
          clientId: "732891886564-k6526fumdrvrqu64of84uc38k3op4d2b.apps.googleusercontent.com",
          developerKey: "AIzaSyA-s8aR3b6Th9Kf1tt3txz037jS1_dFZMg",
          viewId: "DOCS_IMAGES",
          token: "ya29.a0AfB_byDOwK4ehxJL_KdQTQmuSbvejdiaVeK4k3jrxeLT8tJIF27KnmcnEgsFz_KG4o8t5XS1KRceFe1CCy9GNr4_9rPYl9p1LlQC4Jcq3a0_zqi68H1ogt0GGF9SpAraAd23pIn6nu_q9CL0tVQ8ORH1zx-8CRWUraCFaCgYKAZ8SARASFQHGX2MipLAd7H2vKohekk5LvCPZ_w0171",
          // token: token, // pass oauth token in case you already have one
          showUploadView: true,
          showUploadFolders: true,
          supportDrives: true,
          multiselect: true,
          // customViews: customViewsArray, // custom view
          callbackFunction: (data) => {
            if (data.action === 'cancel') {
              console.log('User clicked cancel/close button')
            }
            else if(data.action === 'picked') {
                setApiData(data);
                // console.log(data);
            }
          },
        });
        
    }

    useEffect(() => {
        if (apiData) {
            // apiData.docs.map((i) => console.log(i));
            console.log(apiData.docs);
            handlePreviewIMG(apiData);
        }
    }, [apiData])

    //preview img
    const [imgURL, setIMGURL] = useState();
    const [showDiv, setShowDiv] = useState(true);
    const [del, setDelete] = useState(false);

 

    const handlePreviewIMG = (apiData) => {
        // const file = e.target.files[0];
        // file.preview = URL.createObjectURL(file);
        let id = apiData.docs[0].id;
        let text = 'https://drive.google.com/uc?export=view&id=' + id;
        console.log(text);
        handleChangeIMGPath(text);
        setIMGURL(text);
        setShowDiv(false);
        setDelete(true);
    };

    //delete img

    const deleteIMG = () => {
        setIMGURL('')
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
                    readOnly
                    onClick={() => handleChooseFile()}
                    // onChange={handlePreviewIMG}
                />
                {imgURL && <img src={imgURL} alt="" />}
             
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
