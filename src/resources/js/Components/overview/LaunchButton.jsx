import { RocketLaunch } from '@mui/icons-material'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ThemeProvider, createTheme } from '@mui/material'
import React from 'react'

const muiTheme = createTheme({
    palette: {
        app_orange: {
            main: '#E75B0D',
        }
    }
})

const LaunchButton = ({ launchElection }) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <ThemeProvider theme={muiTheme}>
                <Button
                    variant='contained'
                    color='app_orange'
                    startIcon={<RocketLaunch className='dark:text-white' />}
                    onClick={handleClickOpen}
                >
                    <p className='text-white text-xl font-bold'>開始</p>
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"選挙を開始しますか？"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            開始した選挙は中断できません。
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>キャンセル</Button>
                        <Button onClick={launchElection} autoFocus>実行</Button>
                    </DialogActions>
                </Dialog>
            </ThemeProvider>
        </React.Fragment>
    )
}

export default LaunchButton