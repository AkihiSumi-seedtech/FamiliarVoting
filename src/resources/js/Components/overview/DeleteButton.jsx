import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ThemeProvider, createTheme } from '@mui/material';
import { Delete } from '@mui/icons-material'; 
import React from 'react';

const muiTheme = createTheme({
    palette: {
        app_red: {
            main: '#E75B0D',
        }
    }
});

const DeleteButton = ({ onDelete }) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        handleClose();
        onDelete();
    };

    return (
        <React.Fragment>
            <ThemeProvider theme={muiTheme}>
                <Button
                    variant='contained'
                    color='app_red'
                    startIcon={<Delete className='text-white' />}
                    onClick={handleClickOpen}
                >
                    <p className='text-white text-xl font-bold'>削除</p>
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"本当に削除しますか？"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            削除した選挙は復元できません。
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>キャンセル</Button>
                        <Button onClick={handleDelete} autoFocus>削除</Button>
                    </DialogActions>
                </Dialog>
            </ThemeProvider>
        </React.Fragment>
    );
};

export default DeleteButton;
