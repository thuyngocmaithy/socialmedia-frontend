import styles from './Search.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ActionAlerts from '../../components/Alert';
import Pin from '../../components/Pin';
import * as pinServices from '../../services/pinServices';
import * as userServices from '../../services/userServices';
import * as userSavePin from '../../services/userSavePinServices';

const cx = classNames.bind(styles);


function DisplaySearch() {

    const location = useLocation();
    let searchValue = '';
    let searchType = '';
    let searchUser = '';
    let searchUserValue = '';

    //RENDER LIST PIN
    const [LIST_PIN, setListPin] = useState([]);
    useEffect(() => {
        searchValue = location.pathname.split('/')[2];
        searchType = location.pathname.split('=')[1];
        searchUser = location.pathname.split(':')[1];
        searchUserValue = location.pathname.split(':')[2];
        // console.log(searchUser);
        // console.log(searchUserValue);
        const fetchApi = async () => {
            const result = await pinServices.getAllPins();
            // console.log(result);
            let temp = [];
            if (searchUser !== '') {
                const pinCreated = await pinServices.getPinsByUsername(searchUser);
                const user = await userServices.getUserByUsername(searchUser);
                // console.log(user.id);
                // const pinSaved = await userSavePin.getPinByUserId(user.id);
                // console.log(pinSaved);
                for (let i = 0; i < pinCreated.length; i++) {
                    if ((pinCreated[i].title && pinCreated[i].title.includes(searchUserValue)) || (pinCreated[i].descriptio && pinCreated[i].description.includes(searchUserValue)) ) {
                        temp.push(result[i]);
                    }
                }
                // for (let i = 0; i < pinSaved.length; i++) {
                //     if ((pinSaved[i].title && pinSaved[i].title.includes(searchUserValue)) || (pinSaved[i].descriptio && pinSaved[i].description.includes(searchUserValue)) ) {
                //         temp.push(result[i]);
                //     }
                // }
            }
            if (searchType !== '') {
                for (let i = 0; i < result.length; i++) {
                    if (result[i].type !== null && result[i].type.id == parseInt(searchType)) {
                        temp.push(result[i]);
                    }
                }
            }
            if (searchValue !== '')  {
                for (let i = 0; i < result.length; i++) {
                    if ((result[i].title && result[i].title.includes(searchValue)) || (result[i].descriptio && result[i].description.includes(searchValue)) ) {
                        temp.push(result[i]);
                    }
                }
            }
            
            setListPin(temp); 
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
        }
    };

    return (
        <div className={cx('wrapper')}>
            {(LIST_PIN.length > 0) ? (
                LIST_PIN.map((pin, index) => {
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
                })
            ) : (
                <p>Không thể tìm thấy Pin nào</p>
            )}
            {statusSave && <ActionAlerts content={`Đã lưu pin`} action="UNDO" />}
        </div>
    );

}

export default DisplaySearch;