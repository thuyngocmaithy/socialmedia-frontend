import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function MenuItem({ title, to, activeUnderline = false, activeDefault }) {
    return (
        <>
            <NavLink
                className={(nav) => cx('menu-item', { activeUnderline }, { activeDefault }, { active: nav.isActive })}
                to={to}
            >
                <span className={cx('title')}>{title}</span>
                <div className={cx('underline-wrapper')}>
                    <div className={cx('underline')}></div>
                </div>
            </NavLink>
        </>
    );
}

MenuItem.propTypes = {
    title: PropTypes.string,
    icon: PropTypes.node,
    to: PropTypes.string.isRequired,
};

export default MenuItem;
