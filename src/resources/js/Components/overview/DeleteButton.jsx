import { Delete } from '@mui/icons-material'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React, { useState } from 'react'

const DeleteButton = ({ onDelete }) => {
    const [showDialog, setShowDialog] = useState(false);

    const handleDelete = () => {
        setShowDialog(true);
    };

    const handleConfirmDelete = () => {
        setShowDialog(false);
        onDelete(); 
    };

    const handleCancelDelete = () => {
        setShowDialog(false);
    };

    return (
        <React.Fragment>
            <Button variant='contained' startIcon={<Delete />} onClick={handleDelete}>
                削除
            </Button>
            <Dialog
                open={showDialog}
                onClose={handleCancelDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"本当に削除しますか？"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        この操作は取り消せません。
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelDelete}>キャンセル</Button>
                    <Button onClick={handleConfirmDelete} autoFocus>削除</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

export default DeleteButton
