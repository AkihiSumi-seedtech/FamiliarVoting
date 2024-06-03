import React from 'react'
import ElectionStatusBadge from '../election/ElectionStatusBadge';
import formatDateTime from '@/constants/format_datetime';

const ElectionCard = ({ electionId, electionName, electionStatus, electionStartDate, electionEndDate, }) => {
    const formattedStartDate = formatDateTime(electionStartDate);
    const formattedEndDate = formatDateTime(electionEndDate);

    return (
        <div className='relative border-solid border dark:border-gray-400 flex flex-col min-w-0 bg-white dark:bg-gray-800 bg-clip-border rounded-md mb-8 dark:text-gray-300'>
            <div className='flex-auto p-4'>
                <div className='flex flex-wrap -mr-[15px] -ml-[15px] justify-between items-center text-base'>
                    <div className='leading-normal flex-[0_0_50%] max-w-[50%]'>
                        <div className='mr-auto flex-[0_0_100%] max-w-full'>
                            <h6 className='text-xl font-extrabold mb-2 pl-[15px]'>
                                {electionName}
                            </h6>
                        </div>
                        <ElectionStatusBadge
                            electionId={electionId}
                            initialStatus={electionStatus}
                            start_date={formattedStartDate}
                            end_date={formattedEndDate}
                        />
                    </div>
                    <div className='leading-normal flex-[0_0_50%] max-w-[50%]'>
                        <div className='flex flex-wrap items-center mt-0 -mr-[15px] -ml-[15px]'>
                            <div className='basis-0 grow max-w-full text-base'>
                                <div className='flex flex-col'>
                                    <div className='font-bold text-xs'>開始日</div>
                                    <div className='font-light'>{formattedStartDate}</div>
                                </div>
                            </div>
                            <div className='basis-0 grow max-w-full text-base'>
                                <div className='flex flex-col'>
                                    <div className='font-bold text-xs'>終了日</div>
                                    <div className='font-light'>{formattedEndDate}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ElectionCard