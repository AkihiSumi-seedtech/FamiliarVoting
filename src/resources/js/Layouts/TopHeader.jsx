import ElectionStatusBadge from '@/Components/election/ElectionStatusBadge'
import React from 'react'

function formatDateTime(dateTime) {
    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}/${month}/${day} ${hours}:${minutes}`;
}

function TopHeader({ electionId, electionName, electionStartDate, electionEndDate, electionStatus }) {
    const formattedStartDate = formatDateTime(electionStartDate);
    const formattedEndDate = formatDateTime(electionEndDate);

    return (
        <div className='flex items-center fixed t-0 left-60 right-0 h-[60px] m-h-[60px] bg-white dark:bg-gray-800 dark:text-white z-10 border-b border-solid dark:border-s-gray-100'>
            <div className='mb-0 ml-4 self-center text-2xl font-bold'>{electionName}</div>
            <ElectionStatusBadge
                electionId={electionId}
                initialStatus={electionStatus}
                start_date={formattedStartDate}
                end_date={formattedEndDate}
            />
        </div>
    )
}

export default TopHeader