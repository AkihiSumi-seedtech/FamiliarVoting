import ElectionStatusBadge from '@/Components/election/ElectionStatusBadge'
import React from 'react'

function TopHeader({ electionName, electionStatus }) {
    return (
        <div className='flex items-center fixed t-0 left-60 right-0 h-[60px] m-h-[60px] bg-white dark:bg-gray-800 dark:text-white z-10 border-b border-solid dark:border-s-gray-100'>
            <div className='mb-0 ml-4 self-center text-2xl font-bold'>{electionName}</div>
            <ElectionStatusBadge children={electionStatus} />
        </div>
    )
}

export default TopHeader