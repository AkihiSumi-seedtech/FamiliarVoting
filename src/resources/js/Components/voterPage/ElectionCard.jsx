import { Link } from '@inertiajs/react'
import React from 'react'

const ElectionCard = ({ toRoute, electionName, startDate, endDate}) => {
    return (
        <Link href={toRoute}>
            <div className='rounded-lg bg-white p-4 shadow-md flex flex-col'>
                <h2 className='font-bold text-3xl mb-2 text-gray-800'>{electionName}</h2>
                <h3 className='text-lg font-medium text-gray-600'>期間</h3>
                <p className='text-base text-gray text-center'>{startDate} 〜 {endDate}</p>
            </div>
        </Link>
    )
}

export default ElectionCard