import { useForm } from '@inertiajs/react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'
import React from 'react'

function EditFormDialog({ candidateName, candidateParty, editCandidateName, editCandidateParty, candidateId }) {
    const form = useForm({
        candidate_name: candidateName || "",
        candidate_party: candidateParty || "",
        _method: 'put',
    })

    const [open, setOpen] = React.useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        form.post(route('admin.candidates.update', candidateId))

        handleClose()
    };

    return (
        <React.Fragment>
            <Button variant='text' onClick={handleClickOpen}>
                編集
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: handleSubmit,
                }}
            >
                <DialogTitle className='dark:bg-gray-400'>{candidateName}さんの情報を編集</DialogTitle>
                <DialogContent className='dark:bg-gray-400'>
                    <DialogContentText>氏名</DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin='dense'
                        id='can_name'
                        name='can_name'
                        value={editCandidateName}
                        onChange={(e) => form.setData('candidate_name', e.target.value)}
                        defaultValue={candidateName}
                        type='text'
                        fullWidth
                        variant='standard'
                    />
                    <DialogContentText>政党</DialogContentText>
                    <TextField
                        required
                        margin='dense'
                        id='can_party'
                        name='can_party'
                        value={editCandidateParty}
                        onChange={(e) => form.setData('candidate_party', e.target.value)}
                        defaultValue={candidateParty}
                        type='text'
                        fullWidth
                        variant='standard'
                    />
                </DialogContent>
                <DialogActions className='dark:bg-gray-400'>
                    <Button onClick={handleClose}>キャンセル</Button>
                    <Button type='submit'>保存</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

export default EditFormDialog