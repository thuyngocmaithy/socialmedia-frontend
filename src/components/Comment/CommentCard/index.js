import React, { useEffect, useState } from 'react';
import Tippy from '@tippyjs/react';
import { faTrash, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from '../Comment.module.scss';
import AccountInfo from '../../../components/AccountInfo';
import * as commentServices from '../../../services/commentServices';
import SelectReportOption from '../../SelectReportOption';

const cx = classNames.bind(styles);
function CommentCard({ comment, currentUser }) {

    const [del, setDelComment] = useState(false);
    useEffect(() => {
        if (comment.user.id === currentUser.id) {
            setDelComment(true);
        }
    }, []);

    const deleteComment = (comment) => {
        const fetchApi = async () => {
            const rs = await commentServices.del(comment);
        };
        fetchApi();
        window.location.reload();
    };

    // Turn on select report
    const [showSelectReport, setShowSelectReport] = React.useState(false);
    const handleTurnOnSelectReport = (isShown) => {
        setShowSelectReport(isShown);
    }

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
                {(del) ? (
                    <Tippy delay={[0, 100]} content="Xóa bình luận" placement="bottom">
                        <div className={cx('action-comment')}>
                            <button className={cx('action-button', 'delete-button')} onClick={() => deleteComment(comment)}>
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>
                    </Tippy>
                ) : (
                    <Tippy delay={[0, 100]} content="Báo cáo bình luận" placement="bottom">
                        <div className={cx('action-comment')}>
                            <button className={cx('action-button', 'report-button')} onClick={() => handleTurnOnSelectReport(true)}>
                                <FontAwesomeIcon icon={faTriangleExclamation} />
                            </button>
                        </div>
                    </Tippy>   
                )}
            </div>
            {showSelectReport && <SelectReportOption handleTurnOnSelectReport={handleTurnOnSelectReport} comment={comment} user={currentUser} />}
        </div>
    );
}

export default CommentCard;
