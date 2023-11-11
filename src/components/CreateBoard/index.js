import React, { useState, useRef } from 'react';
import styles from './CreateBoard.module.scss';
import classNames from 'classnames/bind';
import Button from '../Button';
import * as boardServices from '../../services/boardServices';
import * as userServices from '../../services/userServices';

function CreateBoard({ handleTurnOnCreateBoard, handleChooseBoard }) {
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
    const handleSaveBoard = () => {
        const fetchApi = async () => {
            const userId = 1;
            const user = await userServices.getUserById(userId);
            const name = val;
            const description = 'bangtest';
            const board = { user, name, description };

            const result = await boardServices.add(board);
            // if (result) {
            //     onSaveResult(true);
            // }
            handleChooseBoard(board);
        };
        fetchApi();
        handleTurnOnCreateBoard(false);
    };

    return (
        <div className={cx('popup-background')}>
            <div className={cx('gray-background')} onClick={() => handleTurnOnCreateBoard(false)}></div>
            <div className={cx('popup-container')}>
                <div className={cx('popup-top')}>
                    <h2>Tạo bảng</h2>
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
                    {/* {primary &&
                        <Button className={cx('saveBtn')} primary>
                            Tạo
                        </Button>
                    } */}
                    {red ? (
                        <Button className={cx('saveBtn')} red onClick={() => handleSaveBoard()}>
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

export default CreateBoard;
