import React from 'react'

const ElectionStatusBadge = ({ children }) => {
    return (
        <span className='inline-block text-xs leading-none text-center whitespace-nowrap align-baseline rounded border-solid border bg-white'>
            <span className='hidden w-[7px] h-[7px] rounded-[50%] text-bold text-black'>

            </span>
        </span>
    )
}

export default ElectionStatusBadge