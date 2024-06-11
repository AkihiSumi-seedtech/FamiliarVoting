import React, { useState } from 'react'
import { Box, IconButton, TextField } from '@mui/material'
import { DoneOutline, Edit } from '@mui/icons-material'
import { useForm } from '@inertiajs/react'


function DetailTextField({ defaultDescription, electionDescription,editElectionDescription, electionId }) {
    const form = useForm({
        description: electionDescription || "",
        _method: 'put',
    })

    const [disabled, setDisabled] = useState(true)

    const handleCanEdit = () => {
        setDisabled(false)
    }

    const handleDoneEdit = (e) => {
        e.preventDefault()
        form.post(route('admin.election.update', electionId))
        setDisabled(true)
        onUpdateDescription(form.data.description);
    }

    return (
        <Box
            component='form'
            noValidate
            autoComplete='off'
            // onSubmit={disabled ? null : handleDoneEdit}
        >
            <div className='mb-8'>
                <div className='text-right'>
                    {disabled
                        ? <IconButton aria-label='edit' onClick={handleCanEdit}>
                            <Edit className='dark:text-white' />
                        </IconButton>
                        : <IconButton aria-label='done' onClick={handleDoneEdit}>
                            <DoneOutline className='dark:text-white' />
                        </IconButton>
                    }
                </div>
                <div className='dark:bg-white'>
                    <TextField
                        id='outlined-multiline-static'
                        label='選挙の概要'
                        multiline
                        fullWidth
                        disabled={disabled}
                        rows={4}
                        value={editElectionDescription}
                        onChange={(e) => form.setData('description', e.target.value)}
                        defaultValue={defaultDescription}
                        type='text'
                        variant='filled'
                        color='warning'
                    />
                </div>
            </div>
        </Box>
    )
}

export default DetailTextField