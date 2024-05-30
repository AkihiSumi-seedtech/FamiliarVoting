import { Link } from '@inertiajs/react'
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

const ElectionCard = ({ toRoute, electionName, startDate, endDate}) => {
    const formattedStartDate = formatDateTime(startDate);
    const formattedEndDate = formatDateTime(endDate);

    return (
        <Link href={toRoute}>
            <div className='rounded-lg bg-white dark:bg-gray-800 p-4 shadow-md flex flex-col'>
                <h2 className='font-bold text-3xl mb-2 text-gray-800 dark:text-gray-400'>{electionName}</h2>
                <h3 className='text-lg font-medium text-gray-600 dark:text-gray-400'>期間</h3>
                <p className='text-lg text-gray text-center dark:text-gray-400'>{formattedStartDate} 〜 {formattedEndDate}</p>
            </div>
        </Link>
    )
}

export default ElectionCard