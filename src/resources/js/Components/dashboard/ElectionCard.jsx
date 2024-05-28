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

const ElectionCard = ({ electionName, electionStatus, electionStartDate, electionEndDate, }) => {
    const formattedStartDate = formatDateTime(electionStartDate);
    const formattedEndDate = formatDateTime(electionEndDate);

    return (
        <div className='relative border-solid border-2 flex flex-col min-w-0 bg-white bg-clip-border rounded-md mb-3'>
            <div className='flex-auto p-4'>
                <div className='flex flex-wrap -mr-[15px] -ml-[15px] justify-between items-center text-base'>
                    <div className='leading-normal flex-[0_0_50%] max-w-[50%]'>
                        <div className='mr-auto flex-[0_0_100%] max-w-full'>
                            <h6 className='text-xl font-extrabold mb-2 pl-[15px]'>
                                {electionName}
                            </h6>
                        </div>
                        <div className='w-auto flex-[0_0_100%] max-w-full pl-[15px]'>
                            {electionStatus}
                        </div>
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