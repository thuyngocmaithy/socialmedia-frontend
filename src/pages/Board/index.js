import classNames from 'classnames/bind';
import styles from './Board.module.scss';
import Pin from '../../components/Pin';
import Popper from '../../components/Popper';
import { FilterIcon } from '../../components/Icons';
import OptionPopper from '../../components/Popper/OptionPopper';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as boardServices from '../../services/boardServices';
import * as userSavePinServices from '../../services/userSavePinServices';

const cx = classNames.bind(styles);

function Board() {
    const location = useLocation();
    const [boardName, setBoardName] = useState('');
    const [listPin, setListPin] = useState([]);
    const [countPin, setCountPin] = useState(0);
    const [typeSort, setTypeSort] = useState('default');
    const [active, setActive] = useState('2');

    const handleActive = (id) => {
        setActive(id === active ? null : id);
    };

    useEffect(() => {
        const fetchApi = async () => {
            const id = location.pathname.split('/')[3];
            const boardname = await boardServices.getBoardById(id);
            setBoardName(boardname.name);
            let resultPin = await userSavePinServices.getPinByBoardId(id);

            setCountPin(resultPin.length);

            if (typeSort === 'closest') {
                resultPin = [...resultPin].sort((a, b) => b.id - a.id);
            }
            setListPin(resultPin);
        };
        fetchApi();
    }, [location.pathname, typeSort]);

    const filterBoardPopper = {
        title: 'Sắp xếp theo thời gian lưu',
        item: [
            {
                id: '1',
                content: 'Gần nhất',
                handleClick: () => setTypeSort('closest'),
                handleActive: () => handleActive('1'),
                active: active,
            },
            {
                id: '2',
                content: 'Xa nhất',
                handleClick: () => setTypeSort('default'),
                handleActive: () => handleActive('2'),
                active: active,
            },
        ],
        width: '270px',
    };
    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('title')}>{boardName}</h1>
            <div className={cx('option')}>
                <Popper
                    title={<FilterIcon className={cx('action', 'icon')} />}
                    body={<OptionPopper data={filterBoardPopper} />}
                    widthBody="maxContent"
                    placement="bottom-start"
                />
                <h3 className={cx('count')}>{countPin} Ghim</h3>
            </div>

            <div className={cx('container-pins')}>
                {listPin.length !== 0 &&
                    listPin.map((pin, index) => {
                        return (
                            <Pin
                                key={index}
                                image={pin.pin.image}
                                linkImage={pin.pin.link}
                                title={pin.pin.title}
                                userImage={pin.user.avatar}
                                username={pin.user.username}
                            />
                        );
                    })}
            </div>
        </div>
    );
}

export default Board;
