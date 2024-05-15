import { CloudUpload } from '@mui/icons-material'
import { Button, styled } from '@mui/material'
import React from 'react'

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
})

function ImportButton({ onChange }) {
    return (
        <div className='text-center'>
            <Button
                component="label"
                role={undefined}
                variant='contained'
                tabIndex={-1}
                startIcon={<CloudUpload />}
                onChange={onChange}
            >
                インポート
                <VisuallyHiddenInput type='file' />
            </Button>
        </div>
    )
}

export default ImportButton