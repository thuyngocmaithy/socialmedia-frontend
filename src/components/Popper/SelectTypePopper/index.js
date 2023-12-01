import styles from './SelectTypePopper.module.scss';
import classNames from 'classnames/bind';
import { CreateBoardIcon } from '../../Icons';
import Search from '../../Search';
import { useState, useEffect } from 'react';
import * as typeServices from '../../../services/typeServices';

const cx = classNames.bind(styles);

function SelectTypePopper({ handleTurnOnCreateType, handleChooseType }) {
    const [listType, setListType] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            const result = await typeServices.getAllType();
            console.log(result);
            setListType(result);
        };
        fetchApi();
    }, []);

    //create Type
    const handleCreateType = () => {
        handleTurnOnCreateType(true);
    };

    //select Type
    const selectType = (type) => {
        handleChooseType(type);
    };
    return (
        <div className={cx('wrapper')}>
            <p className={cx('information')}>Tất cả các Thể Loại</p>
            <div className={cx('list-type')}>
                {listType.map((item, index) => {
                    return (
                        <button
                            key={index}
                            className={cx('item-type')}
                            onClick={() => {
                                selectType(item);
                            }}
                        >
                            <p>{item.typeName}</p>
                        </button>
                    );
                })}
            </div>

            <div className={cx('bottom-create')} onClick={() => handleCreateType()}>
                <button className={cx('createBtn')}>
                    <CreateBoardIcon className={cx('action', 'gUZ', 'R19', 'U9O', 'kVc')} />
                </button>
                <p>Tạo Thể Loại</p>
            </div>
        </div>
    );
}

export default SelectTypePopper;
