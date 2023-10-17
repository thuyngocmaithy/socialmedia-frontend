import { useState } from 'react';
import { Unstable_Popup as Popup } from '@mui/base/Unstable_Popup';
import { styled } from '@mui/system';
import classNames from 'classnames/bind';
import styles from './SimplePopper.module.scss';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';



const cx = classNames.bind(styles);

const grey = {
    50: '#f6f8fa',
    100: '#eaeef2',
    200: '#d0d7de',
    300: '#afb8c1',
    400: '#8c959f',
    500: '#6e7781',
    600: '#57606a',
    700: '#424a53',
    800: '#32383f',
    900: '#24292f',
};

const PopupBody = styled('div')(
    ({ theme }) => `
        width: max-content;
        background-color: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
        border-radius: 8px;
        border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
        box-shadow: ${theme.palette.mode === 'dark' ? `0px 4px 8px rgb(0 0 0 / 0.7)` : `0px 4px 8px rgb(0 0 0 / 0.1)`};
        padding: 1rem;
        font-size: 1.5rem;
        font-family: 'IBM Plex Sans', sans-serif;
        font-weight: 500;
        opacity: 1;
        margin: 0.25rem 0;    
        z-index: 10;
    `,
);

function SimplePopper({ title, body, className, left = '0', placement = 'bottom' }) {
    const [anchor, setAnchor] = useState(null);
    const [open, setOpen] = useState(false);

    const handleClick = (event) => {
        setAnchor(anchor ? null : event.currentTarget);
        setOpen(!open);
    };

    // const open = Boolean(anchor);
    const id = open ? 'simple-popper' : null;

    const handleClickAway = () => {
        setOpen(false);
        setAnchor(null);
    };

    const offset = { top: 10, left: 200 };
    return (
        <div>
            <span className={className} aria-describedby={id} onClick={handleClick}>
                {title}
            </span>
            {open ? (
                <Popup style={{ left: left, zIndex: '10' }} id={id} open={open} anchor={anchor} className={cx('wrapper- popper')} placement={placement} offset={offset}>
                    <ClickAwayListener onClickAway={handleClickAway}>
                        <PopupBody >{body}</PopupBody>
                    </ClickAwayListener>
                </Popup>
            ) : null
            }
        </div >
    );
}
export default SimplePopper;
