import React, { useState, useRef } from 'react';
import styles from './CreateType.module.scss';
import classNames from 'classnames/bind';
import Button from '../Button';
import * as typeServices from '../../services/typeServices';
// import * as userServices from '../../services/userServices';

function CreateType({ handleTurnOnCreateType, handleChooseType }) {
    const cx = classNames.bind(styles);

    //red button
    const [red, setRed] = useState(false);
    // const [primary, setPrimary] = useState(true);
    const [val, setVal] = useState('');
    const changeBtn = (e) => {
        const current = e.target.value;
        setVal(current);
        if (current.length >= 1) {
            setRed(true);
        } else {
            setRed(false);
        }
    };

    //save btn onclick
    const handleSaveType = () => {
        const fetchApi = async () => {
            // const userId = 1;
            // const user = await userServices.getUserById(userId);
            const typeName = val;
            const Type = { typeName };

            const result = await typeServices.add(Type);
            // if (result) {
            //     onSaveResult(true);
            // }
            handleChooseType(Type);
        };
        fetchApi();
        handleTurnOnCreateType(false);
    };

    return (
        <div className={cx('popup-background')}>
            <div className={cx('gray-background')} onClick={() => handleTurnOnCreateType(false)}></div>
            <div className={cx('popup-container')}>
                <div className={cx('popup-top')}>
                    <h2>Tạo Thể Loại</h2>
                </div>
                <div className={cx('input-title')}>
                    <p>Tên</p>
                    <input
                        className={cx('inputTitle')}
                        type="text"
                        placeholder='Như "Nơi nên đến" hoặc "Món ăn nên làm"'
                        maxLength="50"
                        // ref={contentRef}
                        rows="1"
                        value={val}
                        onChange={(e) => {
                            changeBtn(e);
                        }}
                    ></input>
                </div>
                <div className={cx('optionBtn')}>
                    {red ? (
                        <Button className={cx('saveBtn')} red onClick={() => handleSaveType()}>
                            Tạo
                        </Button>
                    ) : (
                        <Button className={cx('saveBtn')} primary>
                            Tạo
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CreateType;
