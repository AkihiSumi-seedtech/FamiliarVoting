import { DateRange } from '@mui/icons-material'
import React from 'react'

const DateCard = ({ dateText, electionDate }) => {
    return (
        <div className='relative flex flex-col min-w-0 bg-clip-border rounded-[3px] border border-solid dark:border-slate-400 dark:text-gray-300 mr-10'>
            <div className='flex font-extrabold text-xl border-b border-solid p-4 items-center'>
                <DateRange className='mr-2' />
                {dateText}
            </div>
            <div className='border-none flex-auto p-4'>
                <div className='text-base mb-0'>
                    {electionDate}
                </div>
            </div>
        </div>
    )
}

export default DateCard