import Search from "../../../Search";
import ConversationList from "./ConversationList";
import styles from './ConversationMenu.module.scss';
import classNames from "classnames/bind";
import { CreateMessageIcon } from "../../../Icons";

const cx = classNames.bind(styles);
function ConversationMenu({handleChange,  conversationList}) {
    return (
        <div className={cx('wrapper-conservation-menu')}>
            <div className={cx('mini-menu')}>
                <h2 className={cx('title')}>Inbox</h2>

                <Search />
                
                <div className={cx('wrapper-create-conversation')}>
                    <div className={cx('wrapper-icon')}>
                        <CreateMessageIcon className={cx('gUZ', 'NUb', 'kVc', 'U90')}/>
                    </div>
                    <button className={cx('create-conversation-button')}>Tạo cuộc trò chuyện</button>
                </div>
            </div>
            <ConversationList handleChange={handleChange}  conversationList={conversationList}  ></ConversationList>
        </div>
    );
}

export default ConversationMenu;