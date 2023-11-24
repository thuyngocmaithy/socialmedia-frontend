import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import { useContext, useState } from 'react';
import AccountInfo from '../../../components/AccountInfo';
import { AccountLoginContext } from '../../../context/AccountLoginContext';
import { deleted } from '../../../services/commentServices';
import { notificationDeleted } from '../../../services/notificationService';
import styles from '../Comment.module.scss';

const cx = classNames.bind(styles);
function CommentCard({ comment }) {
    const [appear, setAppear] = useState(true);
    const { userId } = useContext(AccountLoginContext);
    const deleteComment = async (event) => {
        setAppear(false);

        await deleted(comment.id);

        // Xóa luôn thông báo
        notificationDeleted(comment.notification.id)

    };

    return (appear &&
        <div className={cx('comment-wrapper')}>
            <div className={cx('comment-info')}>
                <div className={cx('user-infor')}>
                    <AccountInfo userImage={comment.user.avatar} username={comment.user.fullname}></AccountInfo>
                </div>
                <div className={cx('comment-body')}>
                    <p>{comment.content}</p>
                </div>
            </div>
            <div className={cx('comment-option')}>
                <Tippy delay={[0, 100]} content="Xóa bình luận" placement="bottom">
                    <div className={cx('delete-comment')}>
                        <button className={cx('delete-button')} onClick={(comment.user.id === userId) ? deleteComment : () => {
                            alert('You can just report this comment')
                        }}>
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </div>
                </Tippy>
            </div >
        </div >
    ) || ((comment.user.id !== userId) && <div className={cx('comment-body')}>
        <p>{'Bình luận đã bị thu hồi'}</p>
    </div>);
}

export default CommentCard;
