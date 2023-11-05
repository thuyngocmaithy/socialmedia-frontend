import { useState, useRef, useLayoutEffect, createContext, useContext } from 'react';
import { StompContext } from '../../../context/StompContext';
import ConversationMenu from './ConversationMenu';
import MessageBox from './MessageBox';
import * as messageServices from '../../../services/messageServices';
import * as participantServices from '../../../services/participantServices';
import classNames from 'classnames/bind';
import styles from './ConversationPopper.module.scss';

const cx = classNames.bind(styles);
export const UserIDContext = createContext('');

let USER_ID = 0 ;
function ConversationPopper() {
    let stompClient = useContext(StompContext);

    const [load, setLoad] = useState(false);
    const chattingWithList = useRef([]);
    useLayoutEffect(() => {
        USER_ID = prompt("Nhap USER_ID: ");
        const fetchApi = async () => {
            setLoad(true);
            chattingWithList.current = await participantServices.getFriendChattingWith(USER_ID);
            chattingWithList.current.forEach(async (item) => {
                item.messages = await messageServices.getMessageByConversationId(item.conversation.id);
                item.lastMessage = item.messages.at(-1).content;
            })
            setLoad(false);
        };
        console.log(stompClient)
        // stompClient.connect({}, function(frame) {
        //     console.log('Connected: ' + frame);
        // //     stompClient.subscribe('/topic/greetings', function(greeting){
        // //         addMessage(greeting);
        // //         console.log(JSON.parse(greeting.body).content)
        // //         addMessage(JSON.parse(greeting.body).content )
        // //     });
        // });
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
        <UserIDContext.Provider value={parseInt(USER_ID)} >
            <div className={cx('wrapper-conversation-popper')}>
                {!messageIsShown ? (
                    <ConversationMenu handleChange={changeConversation} chattingWithList={chattingWithList} />
                ) : (
                    <MessageBox handleChange={changeConversation} chatWith={currentInfor} />
                )}
            </div>
        </UserIDContext.Provider>
    );
}

export default ConversationPopper;
