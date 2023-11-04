import { useState, useRef, useLayoutEffect } from 'react';
// import { useLocation } from 'react-router-dom';
import ConversationMenu from './ConversationMenu';
import MessageBox from './MessageBox';
import * as messageServices from '../../../services/messageServices';
import * as participantServices from '../../../services/participantServices';
import classNames from 'classnames/bind';
import styles from './ConversationPopper.module.scss';

const cx = classNames.bind(styles);
const USER_ID = "1";
function ConversationPopper() {
    const [load, setLoad] = useState(false);
    const chattingWithList = useRef([]);
    // let chattingWithList = [];
    useLayoutEffect(() => {
        const fetchApi = async () => {
            setLoad(true);
            chattingWithList.current = await participantServices.getFriendChattingWith(USER_ID);
            chattingWithList.current.forEach(async (item) => {
                item.messages = await messageServices.getMessageByConversationId(item.conversation.id);
                item.lastMessage = item.messages.at(-1).content;
            })
            setLoad(false);
        };
        // console.log(chattingWithList);
        fetchApi();
    }, []);

    const [messageIsShown, setMessageIsShown] = useState(false);
    const [currentInfor, setCurrentInfor] = useState({});
    // const 
    const changeConversation = (chatWith = '') => {
        if (messageIsShown) {
            setMessageIsShown(false);
            setCurrentInfor({});
        } else {
            setMessageIsShown(true);
            // console.log(chatWith)
            chattingWithList.current.forEach((cons) => {
                if (cons.user.id === chatWith) {
                    setCurrentInfor({
                        // id: cons.user.id,
                        name: cons.user.fullname,
                        avatar: cons.user.avatar,
                        messages: cons.messages,
                    });
                }
            });
        }
    };
    return (
        <div className={cx('wrapper-conversation-popper')}>
            {!messageIsShown ? (
                <ConversationMenu handleChange={changeConversation} chattingWithList={chattingWithList} />
            ) : (
                <MessageBox handleChange={changeConversation} chatWith={currentInfor} />
            )}
        </div>
    );
}

export default ConversationPopper;
