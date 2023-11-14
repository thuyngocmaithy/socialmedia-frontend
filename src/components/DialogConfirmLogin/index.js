import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Button from '../Button';
import { useNavigate } from 'react-router';

function DialogConfirmLogin({ open, setOpen }) {
    const navigate = useNavigate();
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Dialog fullWidth={true} maxWidth="xs" open={open} onClose={handleClose}>
            <DialogTitle sx={{ marginTop: '10px', fontSize: '20px', fontWeight: '700', textAlign: 'center' }}>
                Bạn chưa đăng nhập. Tham gia DATH để bước vào thế giới sáng tạo.
            </DialogTitle>
            <form
                onSubmit={() => {
                    navigate('/login');
                }}
            >
                <DialogActions sx={{ marginBottom: '10px' }}>
                    <div>
                        <Button sx={{ fontSize: '14px' }} red type="submit">
                            Đăng nhập
                        </Button>
                    </div>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default DialogConfirmLogin;
