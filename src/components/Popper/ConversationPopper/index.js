import { useState } from 'react';
import ConversationMenu from './ConversationMenu';
import MessageBox from './MessageBox';
import classNames from 'classnames/bind';
import styles from './ConversationPopper.module.scss';

const cx = classNames.bind(styles);

function ConversationPopper() {
    const conversationList = [
        {
            conversationID: '1',
            avatar: '../../../assets/no-image-temp.png',
            user_id: 'U01',
            senderName: 'Thanh An',
            lastMessage: 'an ba to com',
            messages: [
                {
                    message_id: 1,
                    type: 'send',
                    content: 'Vl luon dau cat moi',
                    send_date: '10/16/2023',
                },
                {
                    message_id: 2,
                    type: 'receive',
                    content: 'wù man bu di dăn',
                    send_date: '10/16/2023',
                },
                {
                    message_id: 3,
                    type: 'send',
                    content: 'an ba to com',
                    send_date: '10/16/2023',
                },
                {
                    message_id: 4,
                    type: 'receive',
                    content: '2222',
                    send_date: '10/17/2023',
                },
            ],
        },
        {
            conversationID: '2',
            avatar: '../../../assets/no-image-temp.png',
            user_id: 'U02',
            senderName: 'Van Kiet',
            lastMessage: 'an 4 to com',
            messages: [
                {
                    message_id: 1,
                    type: 'send',
                    content: 'Vl luon dau cat moi',
                    send_date: '10/16/2023',
                },
                {
                    message_id: 2,
                    type: 'receive',
                    content: 'wù man bu di dăn',
                    send_date: '10/16/2023',
                },
                {
                    message_id: 3,
                    type: 'send',
                    content: 'an ba to com',
                    send_date: '10/16/2023',
                },
            ],
        },
    ];
    const [messageIsShown, setMessageIsShown] = useState(false);
    const [currentChattingWith, setCurrentChattingWith] = useState({});
    const changeConversationState = (chatWith = '') => {
        if (messageIsShown) {
            setMessageIsShown(false);
            setCurrentChattingWith({});
        } else {
            setMessageIsShown(true);
            conversationList.forEach((cons) => {
                if (cons.senderName === chatWith) {
                    setCurrentChattingWith({
                        name: cons.senderName,
                        avatar: cons.avatar,
                        messages: cons.messages,
                    });
                }
            });
        }
    };
    return (
        <div className={cx('wrapper-conversation-popper')}>
            {!messageIsShown ? (
                <ConversationMenu handleChange={changeConversationState} conversationList={conversationList} />
            ) : (
                <MessageBox handleChange={changeConversationState} chatWith={currentChattingWith} />
            )}
        </div>
    );
}

export default ConversationPopper;
