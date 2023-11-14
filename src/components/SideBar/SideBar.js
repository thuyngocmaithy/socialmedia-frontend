import classNames from 'classnames/bind';
import styles from './SideBar.module.scss';
import Menu from './Menu';
import MenuItem from './Menu/MenuItem';

const cx = classNames.bind(styles);

function SideBar({ SideBarItems, style, className, children, onclickMenuItem }) {
    return (
        <aside className={cx(className, 'wrapper')} style={style}>
            {children}
            <Menu>
                {SideBarItems.map((item, index) => {
                    return (
                        <MenuItem
                            key={index}
                            title={item.title}
                            to={item.to}
                            icon={item.icon}
                            activeIcon={item.activeIcon ? item.activeIcon : null}
                            onclickMenuItem={onclickMenuItem}
                        />
                    );
                })}
            </Menu>
        </aside>
    );
}
export default SideBar;
