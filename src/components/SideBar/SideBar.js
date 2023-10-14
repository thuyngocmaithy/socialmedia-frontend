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
            title: 'User Profile',
            to: '/user/profile',
        },
        {
            title: 'User Private',
            to: '/user/private',
        },

        {
            title: 'User Password',
            to: '/user/password',
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
