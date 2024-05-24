import { Button, Dialog, DialogActions, DialogTitle, Slide } from '@mui/material'
import React from 'react'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />
})

function VotingConfirmDialog({ open, handleClickOpen, handleClose, handleVotingDecide }) {
    return (
        <React.Fragment>
            <button
                className="block mx-auto mt-12 px-6 py-3 bg-orange-500 text-white font-bold rounded-full"
                onClick={handleClickOpen}
            >
                投票する
            </button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby='alert-dialog-slide-description'
            >
                <DialogTitle>
                    {"投票後の変更はできません。"}
                    <br/>
                    {"本当によろしいですか？"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>キャンセル</Button>
                    <Button onClick={handleVotingDecide}>投票を確定する</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

export default VotingConfirmDialog