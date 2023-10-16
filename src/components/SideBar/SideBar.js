

import React from 'react';
import { NavLink, useLocation } from 'react-router-dom'; // Import NavLink for navigation
import classNames from 'classnames/bind';
import styles from './SideBar.module.scss';
// import MenuItem from '../NavMenu/MenuItem';


function SideBar() {
    const cx = classNames.bind(styles);
    const location = useLocation();
    const SideBarItems = [
        {
            title: 'UserProfile',
            to: '/thuyngocmaithyy/settings/edit-profile',
        },
        {
            title: 'Private About User',
            to: '/thuyngocmaithyy/settings/account-setting',
        }
        ,
        {
            title: 'User Password',
            to: '/thuyngocmaithyy/settings/password',
        }
    ];

    return (
        <div className={cx('sidebar')}>
            {SideBarItems.map
                (
                    (item, index) => (
                        <NavLink
                            to={item.to}
                            key={index}
                            className={cx('menu-item-text', {
                                active: location.pathname === item.to,
                            })}
                        >
                            {item.title}
                        </NavLink>
                    )
                )
            }
        </div >
    );
}

export default SideBar;