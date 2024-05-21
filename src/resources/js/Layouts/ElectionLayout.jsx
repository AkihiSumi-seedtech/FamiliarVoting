import TopHeader from '@/Layouts/Navbar/TopHeader'
import { Head } from '@inertiajs/react'
import React from 'react'
import MainMenu from './Navbar/MainMenu'

const ElectionLayout = ({ title, children, routeOverview, routeCandidate }) => {
    return (
        <div>
            <Head title={title} />

            <div className='flex flex-col'>
                <div className='flex flex-col h-screen'>
                    <div className='md:flex'>
                        <TopHeader />
                    </div>
                    <div className='flex flex-grow overflow-hidden'>
                        <MainMenu
                            className="flex-shrink-0 hidden w-60 p-12 overflow-y-auto bg-[#412E55] md:block"
                            routeOverview={routeOverview}
                            routeCandidate={routeCandidate}
                        />
                        <div className='w-full px-4 py-8 overflow-hidden overflow-y-auto md:p-12'>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ElectionLayout