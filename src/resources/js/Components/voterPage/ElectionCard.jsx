import formatDateTime from '@/constants/format_datetime';
import { Link } from '@inertiajs/react'
import React from 'react'

const ElectionCard = ({ toRoute, electionName, startDate, endDate}) => {
    const formattedStartDate = formatDateTime(startDate);
    const formattedEndDate = formatDateTime(endDate);

    return (
        <Link href={toRoute}>
            <div className='rounded-lg bg-white dark:bg-gray-800 p-4 shadow-md flex flex-col'>
                <h1 className='font-bold text-3xl mb-2 text-gray-800 dark:text-gray-300'>{electionName}</h1>
                <p className='text-lg text-gray text-center dark:text-gray-300'>
                    開始：{formattedStartDate}<br/>
                    終了：{formattedEndDate}
                </p>
            </div>
        </Link>
    )
}

export default ElectionCard