import React from 'react'

function PageHeader({ children }) {
    return (
        <div className='flex fixed items-center dark:bg-gray-800 w-full left-0 pl-[240px] min-h-[60px] z-10 border-b dark:border-s-gray-100 top-[60px]'>
            <div className='w-full px-[15px] mx-auto'>
                <div className='flex flex-wrap -mx-[15px] items-center'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default PageHeader