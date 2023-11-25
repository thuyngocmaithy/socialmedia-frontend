import styles from './MessageCard.module.scss';
import className from 'classnames/bind';
import Image from '../../../../Image';
import { NavLink } from 'react-router-dom';

const cx = className.bind(styles);

function PinMessage({ pin, messageOwner }) {
    let title = '*no title';
    if(pin.title !== null) {
        title = pin.title.length > 20 ? pin.title.slice(0, 20) + '...' : pin.title;
    }
    return (
        <div className={cx(messageOwner)}>
            <NavLink className={(nav) => cx('menu-item')} to={`/pin/${pin.id}`}>
                <div className={cx('message-content', 'pin-message-content')}>
                    <div className={cx('message-name')}>You</div>
                    <div style={{ textAlign: 'right', minWidth: 'auto' }} className={cx('pin-message-body')}>
                        <Image 
                            className={cx('pin-message-image')}
                            src={pin && `data:image/jpeg;base64,${pin.image}`}
                            alt={pin.description}
                        />
                        <div className={cx('pin-message-title')}>{title}</div>
                    </div>
                </div>
            </NavLink>
        </div>
    );
}

export default PinMessage;