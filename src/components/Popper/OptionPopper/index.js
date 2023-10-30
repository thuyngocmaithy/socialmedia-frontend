import classNames from 'classnames/bind';
import styles from './OptionPopper.module.scss';
import Button from '../../Button';
import { useState } from 'react';
import { SelectedIcon } from '../../Icons';

const cx = classNames.bind(styles);

function OptionPopper({ data }) {
    const [active, setActive] = useState();

    const handleClick = (id) => {
        setActive(id);
    };

    return (
        <div className={cx('wrapper')} style={{ width: data.width }}>
            <p className={cx('title')}>{data.title}</p>
            {data.item.map((item) => {
                return (
                    <Button
                        key={item.id}
                        className={cx(active === item.id ? 'active' : undefined)}
                        onClick={() => {
                            handleClick(item.id);
                        }}
                        activeIcon={<SelectedIcon />}
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
