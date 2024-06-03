import ElectionStatusBadge from '@/Components/election/ElectionStatusBadge'
import React from 'react'

function TopHeader({ electionId, electionName, electionStartDate, electionEndDate, electionStatus }) {
    return (
        <div className='flex items-center fixed t-0 left-60 right-0 h-[60px] m-h-[60px] bg-white dark:bg-gray-800 dark:text-white z-10 border-b border-solid dark:border-s-gray-100'>
            <div className='mb-0 ml-4 self-center text-2xl font-bold'>{electionName}</div>
            <ElectionStatusBadge
                electionId={electionId}
                initialStatus={electionStatus}
                start_date={electionStartDate}
                end_date={electionEndDate}
            />
        </div>
    )
}

export default TopHeader