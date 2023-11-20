import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState, useRef, useContext  } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import styles from './Search.module.scss';
import { Wrapper as PopperWrapper } from '../../components/Popup';
import AccountItemSearch from '../AccountItemSearch';
import { useDebounce } from '../../hooks';
import { ThemeContext } from '../../context/ThemeContext';
import * as typeServices from '../../services/typeServices';
import * as userServices from '../../services/userServices';
import * as pinServices from '../../services/pinServices';
import * as userSavePinServices from '../../services/userSavePinServices';
import Pin from '../Pin';

const cx = classNames.bind(styles);

function Search({ className, width = '750px' }) {
    const { theme } = useContext(ThemeContext);

    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const debouncedValue = useDebounce(searchValue, 500);
    const inputRef = useRef();

    const location = useLocation();
    const pathname = location.pathname.split('/')[1];
    const [info, setInfo] = useState({});
    useEffect(() => {
        const fetchApi = async () => {
            const resultInfo = await userServices.getUserByUsername(pathname);
            setInfo(resultInfo);
        };
        fetchApi();
    }, [pathname]);

    const [pinByUser, setPinByUser] = useState([]);
    // useEffect(() =>  {
    //     const fetchApi = async () => {
    //         console.log(pathname);
    //         const result = await pinServices.getPinsByUsername(pathname);
    //         setPinByUser(result);
    //         console.log(result);
    //         console.log(pinByUser);
    //         const rs = await userSavePinServices.getPinByUserId(info.id);
    //         setPinByUser([...pinByUser, rs]);    
    //     };
    //     fetchApi();
    // },[debouncedValue]);

    // console.log(pinByUser);

    const [listType, setListType] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            const result = await typeServices.getAllType();
            // console.log(result);
            setListType(result);
        };
        fetchApi();
    }, []);

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
            setLoading(false); //bỏ loading sau khi gọi api
        })
        .catch(() => {
            setLoading(false); //bỏ loading khi bị lỗi
        });
    }, [debouncedValue]); //Khi người dùng gõ vào input => chạy lại useEffect

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleChange = (e) => {
        const searchValue = e.target.value;
        // setSearchResult(searchResult);
        if (!searchValue.startsWith(' ')) {
        //     // Không cho người dùng gõ dấu cách đầu tiên
            setSearchValue(searchValue);
            setShowResult(true);
        }
    };

    const handleClick = () => {
        setShowResult(true);
    }

    return (
        /*Using a wrapper <div> tag around the reference element solves this 
        by creating a new parentNode context.*/
        <div className={cx('wrapper', className)} style={{ width: width }}>
            <HeadlessTippy
                interactive //tippy được tương tác mà không ẩn đi
                visible={showResult} //Visible là Hiển thị không cần hover
                // Hiển thị khi kết quả tìm kiếm có length > 0
                render={(attrs) => (
                    <div style={{ width: width }} className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            {(!pathname) ? (
                                <div>
                                    {(searchResult.length > 0)&&
                                        <div>
                                            <h4 className={cx('search-title')}>Accounts</h4>
                                            {searchResult.map((result) => ( 
                                                <AccountItemSearch key={result.id} data={result} /> 
                                            ))}
                                        </div>
                                    }
                                    <h4 className={cx('search-title')}>Ý tưởng dành cho bạn</h4>
                                    <div className={cx('type')}>
                                        {listType.map((item, index) => {
                                            return (
                                                <NavLink className={(nav) => cx('menu-item')} to={`/search/type=${item.id}`}>
                                                    <button key={index} className={cx('item-type')} onClick={handleHideResult} >
                                                        <p>{item.typeName}</p>
                                                    </button>
                                                </NavLink>
                                            );
                                        })}
                                    </div>
                                </div>
                            ) : (
                                <div className={cx('searchUser')}>
                                    <h4 className={cx('searchUser-title')}>Tìm kiếm Pin của bạn</h4>
                                </div>
                            )}

                               
                        </PopperWrapper>
                    </div>
                )}
                
                onClickOutside={handleHideResult}
                //Bấm ngoài khu vực tippy
            >
                <div className={cx('search', theme === 'dark' ? 'dark' : '')} style={{ width: width }}>
                    {(!pathname) ? (
                        <input
                            ref={inputRef} //Lấy DOM element
                            value={searchValue}
                            placeholder="Search..."
                            spellCheck={false}
                            onChange={handleChange}
                            onClick={handleClick}
                        />

                    ) : (
                        <input
                        ref={inputRef} //Lấy DOM element
                        value={searchValue}
                        placeholder="Search your pins"
                        spellCheck={false}
                        onChange={handleChange}
                        onClick={handleClick}
                        />
                    )}

                    {!!searchValue && !loading && (
                        <button className={cx('clear-btn')} onClick={handleClear}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                    
                    {loading && <FontAwesomeIcon className={cx('loading-btn')} icon={faSpinner} />}

                    
                    {(searchResult.length > 0) ? (
                        (!pathname) ? (
                            <NavLink className={(nav) => cx('menu-item')} to={`/search/${searchValue}`}>
                                <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()} onClick={handleHideResult}>
                                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                                </button>
                            </NavLink>
                        ) : (
                            <NavLink className={(nav) => cx('menu-item')} to={`/search/user:${pathname}:${searchValue}`}>
                                <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()} onClick={handleHideResult}>
                                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                                </button>
                            </NavLink>
                        )
                    ) : (
                        <NavLink className={(nav) => cx('menu-item')} to={`/`}>
                            <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()} onClick={handleHideResult}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                        </NavLink>
                    )}
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;
