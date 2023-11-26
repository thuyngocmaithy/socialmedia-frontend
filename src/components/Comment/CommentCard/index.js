import React, { useContext, useEffect, useState } from 'react';
import Tippy from '@tippyjs/react';
import { faTrash, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from '../Comment.module.scss';
import AccountInfo from '../../../components/AccountInfo';
import * as commentServices from '../../../services/commentServices';
import SelectReportOption from '../../SelectReportOption';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Button from '../../Button';
import { ThemeContext } from '../../../context/ThemeContext';

const cx = classNames.bind(styles);
function CommentCard({handleTurnOnSelectReport, comment, currentUser }) {
    const [del, setDelComment] = useState(false);
    const { theme } = useContext(ThemeContext);
    const [commentDelete, setCommentDelete] = useState({});
    const [confirmDelete, setConfirmDelete] = useState(false); //Mở dialog xóa
    useEffect(() => {
        if (comment.user.id === currentUser.id) {
            setDelComment(true);
        }
    }, []);

    const confirmDeleteComment = (comment) => {
        setCommentDelete(comment);
        setConfirmDelete(true);
    };

    const deleteComment = () => {
        const fetchApi = async () => {
            const rs = await commentServices.del(commentDelete);
            if (rs) {
                setConfirmDelete(false);
            }
        };
        fetchApi();
        window.location.reload();
    };

    const handleCloseConfirm = () => {
        setConfirmDelete(false);
    };

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
                {del ? (
                    <Tippy delay={[0, 100]} content="Xóa nhận xét" placement="bottom">
                        <div className={cx('action-comment')}>
                            <button
                                className={cx('action-button', 'delete-button')}
                                onClick={() => confirmDeleteComment(comment)}
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>
                    </Tippy>
                ) : (
                    <Tippy delay={[0, 100]} content="Báo cáo nhận xét" placement="bottom">
                        <div className={cx('action-comment')}>
                            <button
                                className={cx('action-button', 'report-button')}
                                onClick={() => handleTurnOnSelectReport(true, comment)}
                                // onClick={() => turnOnReportComment(comment)}
                            >
                                <FontAwesomeIcon icon={faTriangleExclamation} />
                            </button>
                        </div>
                    </Tippy>
                )}
            </div>
            {confirmDelete && (
                <Dialog
                    className={cx(theme === 'dark' ? 'dark' : '')}
                    fullWidth={true}
                    maxWidth="sm"
                    open={confirmDelete}
                >
                    <DialogTitle sx={{ marginTop: '10px', fontSize: '20px', fontWeight: '700', textAlign: 'center' }}>
                        Xóa nhận xét?
                    </DialogTitle>
                    <form onSubmit={deleteComment}>
                        <DialogContent>Nhận xét bạn đã gửi cho ghim này sẽ bị xóa.</DialogContent>
                        <DialogActions sx={{ marginBottom: '10px' }}>
                            <div>
                                <Button style={{ fontSize: '14px' }} type="button" onClick={handleCloseConfirm}>
                                    Hủy
                                </Button>
                                <Button style={{ fontSize: '14px', marginLeft: '8px' }} red type="submit">
                                    Xóa
                                </Button>
                            </div>
                        </DialogActions>
                    </form>
                </Dialog>
            )}
        </div>
    );
}

export default CommentCard;
