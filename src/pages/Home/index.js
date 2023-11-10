import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Pin from '../../components/Pin';
import { useEffect, useState } from 'react';
import ActionAlerts from '../../components/Alert';
import { useCountAccess } from '../../context/CountAccessContext';

const cx = classNames.bind(styles);

function Home() {
    const { updateCounter, countData } = useCountAccess();
    const [hasExecuted, setHasExecuted] = useState(false);

    useEffect(() => {
        if (!hasExecuted) {
            const today = new Date();
            const currentMonth = today.getMonth() + 1;

            // Lấy countData từ localStorage
            const storedData = JSON.parse(localStorage.getItem('countData')) || {};

            // Kiểm tra xem có dữ liệu cho tháng hiện tại không
            const currentMonthData = storedData[currentMonth] || { count: 0 }; // Ensure it's an object with a 'count' property

            // Increment the counter for the current month
            const newCounter = currentMonthData.count + 1;

            // Update countData in context
            updateCounter(newCounter, currentMonth);

            // Update localStorage
            storedData[currentMonth] = { count: newCounter }; // Store an object with 'count' property
            localStorage.setItem('countData', JSON.stringify(storedData));

            // Đánh dấu rằng hàm đã thực thi
            setHasExecuted(true);
        }
    }, [updateCounter, countData.currentMonth, hasExecuted]);

    const LIST_PIN = [
        {
            id: 1,
            image: 'https://i.pinimg.com/originals/f8/ba/44/f8ba44fa3acca8ef8266ec5692d50883.jpg',
            userImage: '../../avt.jpg',
            username: 'Cynthia Anna',
        },
        {
            id: 2,
            image: 'https://i.pinimg.com/originals/d3/07/2f/d3072fdfb56eef601042dec329a72744.jpg',
            userImage: '../../avt.jpg',
            username: '『𝕄𝕦𝕄𝕦』',
        },
        {
            id: 3,
            image: 'https://i.pinimg.com/564x/37/b9/71/37b97126dc5b1d1484e70ffd9b3033da.jpg',
            linkImage:
                'https://www.etsy.com/listing/1418220883/opalescent-luminous-seashell-wall-art?epik=dj0yJnU9Wl9vQ0RUNVQ4cWd1aHV4T3lNTnNLUkRKTXNOWEFnb08mcD0wJm49U04xTmtGdWQ3OEZHYzJHMjh2Rzk4QSZ0PUFBQUFBR1VSbzkw',
            userImage: '../../avt.jpg',
            username: 'Celestialmoonfire Art🌙✨',
        },
        {
            id: 4,
            image: 'https://i.pinimg.com/originals/f8/ba/44/f8ba44fa3acca8ef8266ec5692d50883.jpg',
            userImage: '../../avt.jpg',
            username: 'Cynthia Anna',
        },
        {
            id: 5,
            image: 'https://i.pinimg.com/originals/d3/07/2f/d3072fdfb56eef601042dec329a72744.jpg',
            userImage: '../../avt.jpg',
            username: '『𝕄𝕦𝕄𝕦』',
        },
        {
            id: 6,
            image: 'https://i.pinimg.com/564x/37/b9/71/37b97126dc5b1d1484e70ffd9b3033da.jpg',
            linkImage:
                'https://www.etsy.com/listing/1418220883/opalescent-luminous-seashell-wall-art?epik=dj0yJnU9Wl9vQ0RUNVQ4cWd1aHV4T3lNTnNLUkRKTXNOWEFnb08mcD0wJm49U04xTmtGdWQ3OEZHYzJHMjh2Rzk4QSZ0PUFBQUFBR1VSbzkw',
            userImage: '../../avt.jpg',
            username: 'Celestialmoonfire Art🌙✨',
        },
        {
            id: 7,
            image: 'https://i.pinimg.com/originals/f8/ba/44/f8ba44fa3acca8ef8266ec5692d50883.jpg',
            userImage: '../../avt.jpg',
            username: 'Cynthia Anna',
        },
        {
            id: 8,
            image: 'https://i.pinimg.com/originals/d3/07/2f/d3072fdfb56eef601042dec329a72744.jpg',
            userImage: '../../avt.jpg',
            username: '『𝕄𝕦𝕄𝕦』',
        },
        {
            id: 9,
            image: 'https://i.pinimg.com/564x/37/b9/71/37b97126dc5b1d1484e70ffd9b3033da.jpg',
            linkImage:
                'https://www.etsy.com/listing/1418220883/opalescent-luminous-seashell-wall-art?epik=dj0yJnU9Wl9vQ0RUNVQ4cWd1aHV4T3lNTnNLUkRKTXNOWEFnb08mcD0wJm49U04xTmtGdWQ3OEZHYzJHMjh2Rzk4QSZ0PUFBQUFBR1VSbzkw',
            userImage: '../../avt.jpg',
            username: 'Celestialmoonfire Art🌙✨',
        },
    ];

    const [statusSave, setSatusSave] = useState(false);

    const handleSaveResult = (result) => {
        setSatusSave(result);

        // Nếu result là true, đặt một timeout để đặt lại statusSave sau một khoảng thời gian
        if (result) {
            setTimeout(() => {
                setSatusSave(false);
            }, 2500);
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
            {statusSave && <ActionAlerts content={`Đã lưu pin`} action="UNDO" />}
        </div>
    );
}

export default Home;
