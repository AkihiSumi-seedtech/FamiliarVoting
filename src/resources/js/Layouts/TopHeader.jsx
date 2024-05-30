import React from 'react'

function TopHeader({ electionName, electionStatus }) {
    return (
        <div className='flex items-center fixed t-0 left-60 right-0 h-[60px] m-h-[60px] bg-white dark:bg-gray-800 dark:text-white z-10 border-b border-solid dark:border-s-gray-100'>
            <div className='mb-0 ml-4 self-center text-2xl font-bold'>{electionName}</div>
            <span className='ml-4 bg-gray-100 text-gray-900 text-sm font-bold py-1 px-2 text-center leading-none align-baseline rounded-sm'>{electionStatus}</span>
        </div>
    )
}

export default TopHeader