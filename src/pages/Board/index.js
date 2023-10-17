import classNames from 'classnames/bind';
import styles from './Board.module.scss';
import Pin from '../../components/Pin';
import SimplePopper from '../../components/SimplePopper';
import { FilterIcon } from '../../components/Icons';
import OptionPopper from '../../components/SimplePopper/OptionPopper';
import { useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);

function Board() {
    const LIST_PIN = [
        {
            image: 'https://i.pinimg.com/originals/f8/ba/44/f8ba44fa3acca8ef8266ec5692d50883.jpg',
            userImage: '../avt.jpg',
            username: 'Cynthia Anna',
        },
        {
            image: 'https://i.pinimg.com/originals/d3/07/2f/d3072fdfb56eef601042dec329a72744.jpg',
            userImage: '../avt.jpg',
            username: '『𝕄𝕦𝕄𝕦』',
        },
        {
            image: 'https://i.pinimg.com/564x/37/b9/71/37b97126dc5b1d1484e70ffd9b3033da.jpg',
            linkImage:
                'https://www.etsy.com/listing/1418220883/opalescent-luminous-seashell-wall-art?epik=dj0yJnU9Wl9vQ0RUNVQ4cWd1aHV4T3lNTnNLUkRKTXNOWEFnb08mcD0wJm49U04xTmtGdWQ3OEZHYzJHMjh2Rzk4QSZ0PUFBQUFBR1VSbzkw',
            userImage: '../avt.jpg',
            username: 'Celestialmoonfire Art🌙✨',
        },
        {
            image: 'https://i.pinimg.com/originals/f8/ba/44/f8ba44fa3acca8ef8266ec5692d50883.jpg',
            userImage: '../avt.jpg',
            username: 'Cynthia Anna',
        },
        {
            image: 'https://i.pinimg.com/originals/d3/07/2f/d3072fdfb56eef601042dec329a72744.jpg',
            userImage: '../avt.jpg',
            username: '『𝕄𝕦𝕄𝕦』',
        },
        {
            image: 'https://i.pinimg.com/564x/37/b9/71/37b97126dc5b1d1484e70ffd9b3033da.jpg',
            linkImage:
                'https://www.etsy.com/listing/1418220883/opalescent-luminous-seashell-wall-art?epik=dj0yJnU9Wl9vQ0RUNVQ4cWd1aHV4T3lNTnNLUkRKTXNOWEFnb08mcD0wJm49U04xTmtGdWQ3OEZHYzJHMjh2Rzk4QSZ0PUFBQUFBR1VSbzkw',
            userImage: '../avt.jpg',
            username: 'Celestialmoonfire Art🌙✨',
        },
        {
            image: 'https://i.pinimg.com/originals/f8/ba/44/f8ba44fa3acca8ef8266ec5692d50883.jpg',
            userImage: '../avt.jpg',
            username: 'Cynthia Anna',
        },
        {
            image: 'https://i.pinimg.com/originals/d3/07/2f/d3072fdfb56eef601042dec329a72744.jpg',
            userImage: '../avt.jpg',
            username: '『𝕄𝕦𝕄𝕦』',
        },
        {
            image: 'https://i.pinimg.com/564x/37/b9/71/37b97126dc5b1d1484e70ffd9b3033da.jpg',
            linkImage:
                'https://www.etsy.com/listing/1418220883/opalescent-luminous-seashell-wall-art?epik=dj0yJnU9Wl9vQ0RUNVQ4cWd1aHV4T3lNTnNLUkRKTXNOWEFnb08mcD0wJm49U04xTmtGdWQ3OEZHYzJHMjh2Rzk4QSZ0PUFBQUFBR1VSbzkw',
            userImage: '../avt.jpg',
            username: 'Celestialmoonfire Art🌙✨',
        },
    ];
    const filterBoardPopper = {
        title: 'Sắp xếp theo thời gian lưu',
        item: [
            { id: '1', content: 'Gần nhất' },
            { id: '2', content: 'Xa nhất' },
        ],
        width: '270px',
    };

    const titleCase = (str) => {
        return str.toLowerCase().replace(/(^|\s)\S/g, function (l) {
            return l.toUpperCase();
        });
    };

    const location = useLocation();
    //Lấy tên bảng
    const boardname = titleCase(location.pathname.split('/')[2].replace('-', ' '));

    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('title')}>{boardname}</h1>
            <div className={cx('option')}>
                <SimplePopper
                    title={<FilterIcon className={cx('action', 'icon')} />}
                    body={<OptionPopper data={filterBoardPopper} />}
                    widthBody="maxContent"
                    placement="bottom-start"
                />
                <h3 className={cx('count')}>24 Ghim</h3>
            </div>

            <div className={cx('container-pins')}>
                {LIST_PIN.map((pin, index) => {
                    return (
                        <Pin
                            key={index}
                            image={pin.image}
                            linkImage={pin.linkImage}
                            title={pin.title}
                            userImage={pin.userImage}
                            username={pin.username}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default Board;
