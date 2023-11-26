import classNames from 'classnames/bind';
import styles from './SearchMenu.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useRef, useState } from 'react';
import * as friendshipServices from '../../../../services/friendshipServices';
import * as conversationServices from '../../../../services/conversationServices';
import * as userServices from '../../../../services/userServices';
import * as participantServices from '../../../../services/participantServices';
import { ConversationContext } from '../../../../context/ConversationContext';
import { AccountLoginContext } from '../../../../context/AccountLoginContext';
import SearchResult from './SearchResult';
import { useDebounce } from '../../../../hooks';

const cx = classNames.bind(styles)

function SearchMenu({handleChange}) {
    const {conversationList, reloadList} = useContext(ConversationContext);
    const [searchResult, setSearchResult] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const { userId } = useContext(AccountLoginContext);
    const debouncedValue = useDebounce(searchValue, 500);
    const inputRef = useRef();
    const [load, setLoad] = useState(false);
    useEffect(() => {
        const fetchFriendList = async () => {
            const temp = await friendshipServices.getListFriend(userId);
            temp.forEach((item) => {
                if(item.user1.id === userId) {
                    setSearchResult([...searchResult, item.user2]);
                } else {
                    setSearchResult([...searchResult, item.user1]);
                }
            })
            inputRef.current.focus();
            setLoad(true);
        }
        fetchFriendList();
    },[]);

    useEffect(() => {
        if (!debouncedValue.trim()) {
            //trim() xóa khoảng trắng ở đầu và cuối
            setSearchResult([]);
            return;
        }

        fetch(`http://localhost:8080/users/getAll`)
            .then((res) => res.json())
            .then((res) => {
                let temp = [];
                for (let i = 0; i < res.length; i++) {
                    if (res[i].username.includes(debouncedValue)) {
                        temp.push(res[i]);
                    }
                }
                setSearchResult(temp);
                setLoad(false); //bỏ loading sau khi gọi api
            })
            .catch(() => {
                setLoad(false); //bỏ loading khi bị lỗi
            });
    }, [debouncedValue]); //Khi người dùng gõ vào input => chạy lại useEffect

    const handleChangeInput = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            // Không cho người dùng gõ dấu cách đầu tiên
            setSearchValue(searchValue);
        }
    };

    // const handleSelect = async (user_id) => {
    //     let lastID = 0;
    //     let created = false;
    //     let result = await participantServices.getFriendChattingWith(userId);
    //     result = result.map((item) => {return item.user});
    //     if(result.filter(e => e.id === user_id).length < 1) {

    //         const temp = [await userServices.getUserById(userId), await userServices.getUserById(user_id)];
    //         const conv = await conversationServices.getById(3);
    //         const convs = await conversationServices.getAllConversations();
    //         convs.forEach((item) => {
    //             if(item.id > lastID) {
    //                 lastID = item.id;
    //             }
    //         })
    //         // const createConv = await conversationServices.save({
    //         //     id: lastID+1,
    //         //     name:null,
    //         //     create_at: new Date()
    //         // });
    //         temp.forEach(async (user) => {
    //             const createPar = await participantServices.save({
    //                 conversation: conv,
    //                 user: user
    //             });
    //             if(createPar) {
    //                 created = true;
    //             }
    //         })
    //         if(created) {
    //             reloadList();
    //         }
    //     } 
    // }

    return ( 
        <div className={cx('search-menu-container')}>
            <div className={cx('header-container')}>
                <div className={cx('title-container')}><span>Tin nhắn mới</span></div>
                <button 
                    className={cx('cancel-search-btn')}
                    onClick={() => handleChange('', false, 0)}
                >
                    Huỷ
                </button>
            </div>
            <div className={cx('search-bar')}>
                <input 
                    className={cx('search-input')} 
                    placeholder="Nhập tên hoặc username"
                    value={searchValue}
                    onChange={handleChangeInput}
                    spellCheck={false}
                    ref={inputRef}
                />
                <div className={cx('search-icon')}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>
            </div>
            <div className={cx('search-result-container')}>
                {
                    searchResult.map((user) => {
                        return (
                            <SearchResult handleChange={handleChange} key={user.id} user={user}></SearchResult>
                        );
                    })
                }
            </div>
        </div> 
    );
}

export default SearchMenu;