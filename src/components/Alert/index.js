import { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Button from '../Button';
import classNames from 'classnames/bind';
import styles from './Alert.module.scss';
import * as userSavePinServices from '../../services/userSavePinServices';
import * as pinServices from '../../services/pinServices';
import * as boardServices from '../../services/boardServices';
import * as userServices from '../../services/userServices';

const cx = classNames.bind(styles);

export default function ActionAlerts({ content, action, id }) {
    const [open, setOpen] = useState(true);

    const handleUndoClick = () => {
        const fetchApi = async () => {
            const userId = 1;
            const pinId = id;
            const boardId = 1;

            const user = await userServices.getUserById(userId);
            const pin = await pinServices.getPinById(pinId);
            const board = await boardServices.getBoardById(boardId);

            const userSavePin = { user, pin, board };
            const result = await userSavePinServices.del(userSavePin);
            if (result) {    
                alert("Hủy");
            }
        };
        fetchApi();

        // if (onUndo) {
        //     onUndo();
        //   }
      };   
      
     
  

    useEffect(() => {
        const timer = setTimeout(() => {
            setOpen(false);
        }, 2500); // Đóng sau 2.5 giây

        return () => {
            clearTimeout(timer);
        };
    }, []);

    if (!open) {
        return null;
    }

    const handleUndoClick = () => {
        const fetchApi = async () => {
            const userId = 1;
            const pinId = id;
            const boardId = 1;

            const user = await userServices.getUserById(userId);
            const pin = await pinServices.getPinById(pinId);
            const board = await boardServices.getBoardById(boardId);

            const userSavePin = { user, pin, board };
            const result = await userSavePinServices.del(userSavePin);
            if (result) {
                alert('Hủy');
            }
        };
        fetchApi();
    };
    return (
        <Stack className={cx('wrapper')} sx={{ width: '25%' }} spacing={2}>
            <Alert
                variant="filled"
                severity="success"
                sx={{ fontSize: '16px', fontWeight: '600', textAlign: 'center', justifyContent: 'center' }}
                action={
                    action ? (
                        <Button primary small onClick={handleUndoClick}>
                            {action}
                        </Button>
                    ) : null
                }
            >
                {content}
            </Alert>
        </Stack>
    );
}
