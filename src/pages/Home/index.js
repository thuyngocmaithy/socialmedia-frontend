import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Pin from '../../components/Pin';
import { useEffect, useState } from 'react';
import ActionAlerts from '../../components/Alert';
import { useCountAccess } from '../../context/CountAccessContext';
import * as pinServices from '../../services/pinServices';
import * as userServices from '../../services/userServices';

const cx = classNames.bind(styles);

function Home() {
    // COUNT ACCESS
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

    //RENDER LIST PIN
    const [LIST_PIN, setListPin] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            const result = await pinServices.getAllPins();
            setListPin(result);
        };

        fetchApi();
    }, []);

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
                // console.log(pin);
                const user = pin.user;
                return (
                    <Pin
                        key={index}
                        stt={index + 1}
                        id={pin.id}
                        image={pin.image}
                        // linkImage={pin.linkImage}
                        title={pin.title}
                        userImage={user.avatar}
                        username={user.username}
                        onSaveResult={handleSaveResult}
                    />
                );
            })}
         {statusSave && <ActionAlerts content={`Đã lưu pin`} action='UNDO' />}
        </div>
    );
}

export default Home;
