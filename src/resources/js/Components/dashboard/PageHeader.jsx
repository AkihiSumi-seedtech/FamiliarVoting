import { Link } from '@inertiajs/react'
import React from 'react'
import AddButton from '../AddButton'

function PageHeader() {
    return (
        <div className='bg-white dark:bg-gray-800 py-4 border-b mb-4'>
            <div className='w-full pr-[15px] pl-[15px] mr-auto ml-auto max-w-5xl'>
                <div className='flex flex-wrap mr-[15px] ml-[15px]'>
                    <div className='basis-0 grow max-w-full'>
                        <div className='border-b-0 m-0 min-h-[60px] flex items-center'>
                            <h1 className='m-0 dark:text-white text-4xl font-bold'>Dashboard</h1>
                            <Link href={route('admin.election.create')} className='ml-auto'>
                                <AddButton>新規開設</AddButton>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageHeader