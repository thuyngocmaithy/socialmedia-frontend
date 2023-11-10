import classNames from 'classnames/bind';
import styles from './OptionPopper.module.scss';
import Button from '../../Button';
import { useState } from 'react';
import { SelectedIcon } from '../../Icons';

const cx = classNames.bind(styles);

function OptionPopper({ data }) {
    // const [active, setActive] = useState(null);

    // const handleClick = (id) => {
    //     setActive(id === active ? null : id);
    // };

    return (
        <div className={cx('wrapper')} style={{ width: data.width }}>
            <p className={cx('title')}>{data.title}</p>
            {data.item &&
                data.item.map((item) => {
                    return (
                        <Button
                            key={item.id}
                            className={cx(item.active === item.id ? 'active' : undefined)}
                            onClick={() => {
                                item.handleActive && item.handleActive();
                                item.handleClick && item.handleClick();
                            }}
                            activeIcon={item.active === item.id ? <SelectedIcon /> : null}
                            contentLeft
                        >
                            {item.content}
                        </Button>
                    );
                })}
        </div>
    );
}

export default OptionPopper;
