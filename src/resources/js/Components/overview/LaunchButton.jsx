import { RocketLaunch } from '@mui/icons-material'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'
import { useForm } from '@inertiajs/react'
import axios from 'axios'
axios

const LaunchButton = () => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

        
    const launchElection = async (e) => {
        e.preventDefault()

       

        try {
            const response = await axios.post(`/admin/launch-election/${election}`);
            if (response.status === 200) {
                // 成功処理
                console.log('選挙が開始されました。')
                handleClose(); // ダイアログを閉じる
            } else {
                // 失敗処理
                console.error('選挙の開始に失敗しました。')
            }
        } catch (error) {
            console.error(error)
        }
    }

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
        </React.Fragment>
    )
}

export default LaunchButton