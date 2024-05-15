import { RocketLaunch } from '@mui/icons-material'
import { Button, Dialog } from '@mui/material'
import React from 'react'

const LaunchButton = ({ handleClickOpen, open, handleClose }) => {
    return (
        <React.Fragment>
            <Button variant='contained' startIcon={<RocketLaunch />} onClick={handleClickOpen}>
                開始
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >

            </Dialog>
        </React.Fragment>
    )
}

export default LaunchButton