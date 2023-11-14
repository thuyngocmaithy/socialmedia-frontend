import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import { Wrapper as PopperWrapper } from '../../Popup';
import MenuItem from './MenuItem';
import Header from './HeaderMenu';
import styles from './MenuSettingHeader.module.scss';
import { ThemeContext } from '../../../context/ThemeContext';

const cx = classNames.bind(styles);

const defaultFn = () => {};

function MenuSettingHeader({ children, items = [], hideOnClick = false, onChange = defaultFn }) {
    const { theme } = useContext(ThemeContext);
    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1]; //Phần tử cuối (children)
    //render ra items
    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children; //!! để convert về boolean
            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            //Nếu có children
                            // Thêm item.children
                            setHistory((prev) => [...prev, item.children]);
                        } else {
                            onChange(item);
                        }
                    }}
                />
            );
        });
    };

    const handleBack = () => {
        //Xóa phần tử cuối (children)
        setHistory((prev) => prev.slice(0, prev.length - 1));
    };

    const renderResult = (attrs) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx('menu-popper', theme === 'dark' ? 'dark' : '')}>
                {history.length > 1 && <Header title={current.title} onBack={handleBack} />}
                <div className={cx('menu-body')}>{renderItems()}</div>
            </PopperWrapper>
        </div>
    );

    const handleResetMenu = () => {
        setHistory((prev) => prev.slice(0, 1));
    };

    return (
        <Tippy
            interactive
            delay={[0, 700]} //Khi show không bị delay
            // Khi ẩn bị delay 700ms'
            offset={[12, 8]}
            placement="bottom-end"
            hideOnClick={hideOnClick}
            render={renderResult}
            onHide={handleResetMenu}
        >
            {children}
        </Tippy>
    );
}

MenuSettingHeader.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    hideOnClick: PropTypes.bool,
    onChange: PropTypes.func,
};

export default MenuSettingHeader;
