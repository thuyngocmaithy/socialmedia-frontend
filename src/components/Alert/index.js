import { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Button from '../Button';
import classNames from 'classnames/bind';
import styles from './Alert.module.scss';

const cx = classNames.bind(styles);

export default function ActionAlerts({ content, action }) {
    const [open, setOpen] = useState(true);

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
    return (
        <Stack className={cx('wrapper')} sx={{ width: '25%' }} spacing={2}>
            <Alert
                variant="filled"
                severity="success"
                sx={{ fontSize: '16px', fontWeight: '600', textAlign: 'center', justifyContent: 'center' }}
                action={
                    action ? (
                        <Button primary small>
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
