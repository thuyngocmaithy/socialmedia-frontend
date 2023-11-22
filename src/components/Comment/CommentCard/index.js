import classNames from 'classnames/bind';
import styles from '../Comment.module.scss';
import AccountInfo from '../../../components/AccountInfo';
import { useEffect } from 'react';
import Tippy from '@tippyjs/react';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);
function CommentCard({ comment }) {
    useEffect(() => {
        // console.log(comment.user.avatar);
    }, []);

    const deleteComment = () => {};

    return (
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
                        <button className={cx('delete-button')} onClick={() => deleteComment()}>
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </div>
                </Tippy>
            </div>
        </div>
    );
}

export default CommentCard;
