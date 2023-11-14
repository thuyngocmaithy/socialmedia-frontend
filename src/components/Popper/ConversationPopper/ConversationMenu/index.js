import Search from '../../../Search';
import ConversationList from './ConversationList';
import styles from './ConversationMenu.module.scss';
import classNames from 'classnames/bind';
import { CreateMessageIcon } from '../../../Icons';
import { useContext, useEffect } from 'react';
import { ThemeContext } from '../../../../context/ThemeContext';

const cx = classNames.bind(styles);
function ConversationMenu({ handleChange, chattingWithList }) {
    const { theme } = useContext(ThemeContext);
    return (
        <div className={cx('wrapper-conservation-menu')}>
            <div className={cx('mini-menu', theme === 'dark' ? 'dark' : '')}>
                <h2 className={cx('title')}>Inbox</h2>

                <Search width="310px" />

                <div className={cx('wrapper-create-conversation', theme === 'dark' ? 'dark' : '')}>
                    <div className={cx('wrapper-icon')}>
                        <CreateMessageIcon className={cx('gUZ', 'NUb', 'kVc', 'U90')} />
                    </div>
                    <button className={cx('create-conversation-button', theme === 'dark' ? 'dark' : '')}>
                        Tạo cuộc trò chuyện
                    </button>
                </div>
            </div>
            <ConversationList handleChange={handleChange} conversationList={chattingWithList}></ConversationList>
        </div>
    );
}

export default ConversationMenu;
