import { Button } from '@mui/base'
import { DescriptionOutlined } from '@mui/icons-material'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material'
import React, { useState } from 'react'

function ElectionDescriptionDialog({ electionDescription }) {
    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose =() => {
        setOpen(false)
    }

    return (
        <React.Fragment>
            <IconButton onClick={handleClickOpen}>
                <DescriptionOutlined className='dark:text-white' />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                <DialogTitle id="alert-dialog-title">
                    {"選挙の概要"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {electionDescription}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>閉じる</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

export default ElectionDescriptionDialog