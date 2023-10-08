import classNames from 'classnames/bind';
import { useState } from 'react'

import styles from './SideBar.module.scss'
import MenuItem from '../NavMenu/MenuItem';

function SideBar() {

    const cx = classNames.bind(styles);
    const SideBarItems = [
        {
            title: 'UserMainSettings',
            to: '/user'
        },

        {
            title: 'Private About User',
            to: '/user/private',
        }
    ];

    const [selectedItem, setSelectedItem] = useState('user');
    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    const renderMenuItems = () => {
        return SideBarItems.map((item, index) => {
            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (item.to) {

                        }
                        else {

                        }
                    }}
                />)
        }
        )
    };


    return (<>

        <div className={cx('sidebar')}>
            {renderMenuItems()}
        </div>



    </>);
}

export default SideBar;