import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Pin from '../../components/Pin';
import { useState, useEffect } from 'react';
import ActionAlerts from '../../components/Alert';

const cx = classNames.bind(styles);

function Home() {
    const LIST_PIN = [
        {
            id: 1,
            image: 'https://i.pinimg.com/originals/f8/ba/44/f8ba44fa3acca8ef8266ec5692d50883.jpg',
            userImage: '../avt.jpg',
            username: 'Cynthia Anna',
        },
        {
            id: 2,
            image: 'https://i.pinimg.com/originals/d3/07/2f/d3072fdfb56eef601042dec329a72744.jpg',
            userImage: '../avt.jpg',
            username: '『𝕄𝕦𝕄𝕦』',
        },
        {
            id: 3,
            image: 'https://i.pinimg.com/564x/37/b9/71/37b97126dc5b1d1484e70ffd9b3033da.jpg',
            linkImage:
                'https://www.etsy.com/listing/1418220883/opalescent-luminous-seashell-wall-art?epik=dj0yJnU9Wl9vQ0RUNVQ4cWd1aHV4T3lNTnNLUkRKTXNOWEFnb08mcD0wJm49U04xTmtGdWQ3OEZHYzJHMjh2Rzk4QSZ0PUFBQUFBR1VSbzkw',
            userImage: '../avt.jpg',
            username: 'Celestialmoonfire Art🌙✨',
        },
        {
            id: 4,
            image: 'https://i.pinimg.com/originals/f8/ba/44/f8ba44fa3acca8ef8266ec5692d50883.jpg',
            userImage: '../avt.jpg',
            username: 'Cynthia Anna',
        },
        {
            id: 5,
            image: 'https://i.pinimg.com/originals/d3/07/2f/d3072fdfb56eef601042dec329a72744.jpg',
            userImage: '../avt.jpg',
            username: '『𝕄𝕦𝕄𝕦』',
        },
        {
            id: 6,
            image: 'https://i.pinimg.com/564x/37/b9/71/37b97126dc5b1d1484e70ffd9b3033da.jpg',
            linkImage:
                'https://www.etsy.com/listing/1418220883/opalescent-luminous-seashell-wall-art?epik=dj0yJnU9Wl9vQ0RUNVQ4cWd1aHV4T3lNTnNLUkRKTXNOWEFnb08mcD0wJm49U04xTmtGdWQ3OEZHYzJHMjh2Rzk4QSZ0PUFBQUFBR1VSbzkw',
            userImage: '../avt.jpg',
            username: 'Celestialmoonfire Art🌙✨',
        },
        {
            id: 7,
            image: 'https://i.pinimg.com/originals/f8/ba/44/f8ba44fa3acca8ef8266ec5692d50883.jpg',
            userImage: '../avt.jpg',
            username: 'Cynthia Anna',
        },
        {
            id: 8,
            image: 'https://i.pinimg.com/originals/d3/07/2f/d3072fdfb56eef601042dec329a72744.jpg',
            userImage: '../avt.jpg',
            username: '『𝕄𝕦𝕄𝕦』',
        },
        {
            id: 9,
            image: 'https://i.pinimg.com/564x/37/b9/71/37b97126dc5b1d1484e70ffd9b3033da.jpg',
            linkImage:
                'https://www.etsy.com/listing/1418220883/opalescent-luminous-seashell-wall-art?epik=dj0yJnU9Wl9vQ0RUNVQ4cWd1aHV4T3lNTnNLUkRKTXNOWEFnb08mcD0wJm49U04xTmtGdWQ3OEZHYzJHMjh2Rzk4QSZ0PUFBQUFBR1VSbzkw',
            userImage: '../avt.jpg',
            username: 'Celestialmoonfire Art🌙✨',
        },
    ];

    const [visibleAlertSave, setVisibleAlertSave] = useState(false);

    // const [id, setId] = useState(null);
    // const handleSave = (id) => {
    //     setId(id);
    //     setVisibleAlertSave(true);
    // };
    const [statusSave, setSatusSave] = useState(false);

    const handleSaveResult = (result) => {
        setSatusSave(result);

        // Nếu result là true, đặt một timeout để đặt lại statusSave sau một khoảng thời gian
        if (result) {
            setTimeout(() => {
                setSatusSave(false);
            }, 2500);
            console.log(result)
        }
    };

    return (
        <div className={cx('wrapper')}>
            {LIST_PIN.map((pin, index) => {
                return (
                    <Pin
                        key={index}
                        id={pin.id}
                        image={pin.image}
                        linkImage={pin.linkImage}
                        title={pin.title}
                        userImage={pin.userImage}
                        username={pin.username}
                        onSaveResult={handleSaveResult}
                    />
                );
            })}
         {statusSave && <ActionAlerts content={`Đã lưu pin`} action='UNDO' />}
        </div>
    );
}

export default Home;
