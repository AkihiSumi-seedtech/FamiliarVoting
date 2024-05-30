import SidebarLogo from '@/Layouts/Navbar/SidebarLogo'
import { Head } from '@inertiajs/react'
import React from 'react'
import MainMenu from './Navbar/MainMenu'
import TopHeader from './TopHeader'
import PageHeader from './PageHeader'

const ElectionLayout = ({ title, children, routeOverview, routeVoters, routeCandidate, routeResult, electionName, electionStatus, iconName, pageName }) => {
    return (
        <div>
            <Head title={title} />

            <div>
                <div className='flex flex-col h-screen'>
                    <div>
                        <SidebarLogo />
                    </div>
                    <TopHeader
                        electionName={electionName}
                        electionStatus={electionStatus}
                    />
                    <div className='flex flex-grow'>
                        <PageHeader icon={iconName} text={pageName} />
                        <MainMenu
                            className="flex-shrink-0 hidden w-60 p-12 overflow-y-auto bg-[#412E55] md:block z-20"
                            routeOverview={routeOverview}
                            routeVoters={routeVoters}
                            routeCandidate={routeCandidate}
                            routeResult={routeResult}
                        />
                        <div className='w-full pt-[80px] bg-white dark:bg-gray-800'>
                            <div className='h-full min-h-full mx-5'>
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ElectionLayout