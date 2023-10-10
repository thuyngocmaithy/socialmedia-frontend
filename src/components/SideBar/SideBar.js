import React from 'react';
import { NavLink, Route, Switch, Navigate, Routes } from 'react-router-dom'; // Import NavLink for navigation
import classNames from 'classnames/bind';
import styles from './SideBar.module.scss';
import MenuItem from '../NavMenu/MenuItem';

function SideBar() {
    const cx = classNames.bind(styles);

    const SideBarItems = [
        {
            title: 'UserProfile',
            to: '/user/profile',
        },
        {
            title: 'Private About User',
            to: '/user/private',
        },
    ];

    return (
        <div className={cx('sidebar')}>
            <ul>
                {SideBarItems.map((item, index) => (
                    <MenuItem
                        key={index}
                        data={item}

                    />
                ))}
                {/* Thêm Route bổ sung cho trang UserProfile */}
                {/* <Routes>
                    <Route exact path="/user">

                    </Route>
                </Routes> */}
                <Navigate to="/user/profile" /> {/* Điều hướng đến trang UserProfile */}
            </ul>
        </div>
    );
}

export default SideBar;
