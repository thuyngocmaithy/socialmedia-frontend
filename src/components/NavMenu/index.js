import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import MenuItem from './MenuItem';

const cx = classNames.bind(styles);

function NavMenu({ menu }) {
    return (
        <nav className={cx('wrapper')}>
            {menu.map((data, index) => {
                return <MenuItem key={index} title={data.title} to={data.to} />;
            })}
        </nav>
    );
}

NavMenu.propTypes = {
    menu: PropTypes.array.isRequired,
};

export default NavMenu;
