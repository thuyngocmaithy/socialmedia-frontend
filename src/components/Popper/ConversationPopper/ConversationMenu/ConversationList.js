import ConversationCard from "./ConversationCard";
import styles from './ConversationMenu.module.scss'
import classNames from 'classnames/bind';

const cx = classNames.bind(styles)
function ConversationList({ handleChange, chattingWithList }) {
    return (
        <div className={cx('wrapper-conversation-list')}>
            <h3 className={cx('title')}>Messages</h3>
            {
                chattingWithList.current.map((chattingWith, index) => {
                    return <div key={index}>
                        <ConversationCard handleChange={handleChange} chattingWith={chattingWith}></ConversationCard>
                    </div>

                })
            }
        </div>
    );
}

export default ConversationList;