import DateCard from '@/Components/overview/DateCard'
import LaunchButton from '@/Components/overview/LaunchButton'
import ElectionLayout from '@/Layouts/ElectionLayout'
import ElectionMuiIcon from '@/Layouts/Navbar/ElectionMuiIcon'
import PageHeader from '@/Layouts/PageHeader'
import formatDateTime from '@/constants/format_datetime'
import { useForm } from '@inertiajs/react'
import React from 'react'

const Overview = ({ election }) => {
    const formattedStartDate = formatDateTime(election.start_date)
    const formattedEndDate = formatDateTime(election.end_date)

    const { post } = useForm();

    const handleLaunch = (e) => {
        e.preventDefault();
        window.location.href = '/admin/dashboard';

        try {
            if (election.status === 'Building' && new Date(election.end_date) > new Date()) {
                post(route('admin.launch-election', election.id), {
                    method: 'put',
                });
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <ElectionLayout
            title='概要'
            routeVoters={route('admin.election.voters.index', election.id)}
            routeCandidate={route('admin.election.candidates.index', election.id)}
            routeResult={route('admin.election.indexAdminResult', election.id)}
            electionId={election.id}
            electionName={election.election_name}
            electionStatus={election.status}
            electionStartDate={election.start_date}
            electionEndDate={election.end_date}
        >
            <div className='py-20'>
                <PageHeader icon="overview" pageName="概要">
                    <div className='mr-auto flex-[0_0_33%] max-w-[33%] px-[15px]'>
                        <div className='mb-0 flex'>
                            <ElectionMuiIcon name="overview" className='text-white mr-3' />
                            <div className='dark:text-white text-lg font-extrabold'>概要</div>
                        </div>
                    </div>
                </PageHeader>
                <div className='max-w-7xl sm:px-6 lg:px-8'>
                    <div className='bg-white dark:bg-gray-800 overflow-hidden shadow-sm'>
                        {(election.status === 'Building' && new Date(election.end_date) > new Date()) && (
                            <div className='w-full'>
                                <div className='flex flex-wrap'>
                                    <div className='flex mb-4'>
                                        <DateCard dateText='開始日時' electionDate={formattedStartDate} />
                                        <DateCard dateText='終了日時' electionDate={formattedEndDate} />
                                    </div>
                                </div>
                                <LaunchButton launchElection={handleLaunch} />
                            </div>
                        )}

                        {(election.status === 'Scheduling' && new Date(election.end_date) > new Date()) && (
                            <div className='w-full text-center'>
                                <div className='dark:text-gray-200 text-2xl'>
                                    この選挙は、{formattedStartDate}に開始予定です。
                                </div>
                            </div>
                        )}

                        {(election.status === 'Running' && new Date(election.end_date) > new Date()) && (
                            <div className='w-full text-center'>
                                <div className='dark:text-gray-200 text-2xl'>
                                    この選挙は、{formattedEndDate}に終了します。
                                </div>
                            </div>
                        )}

                        {(election.status === 'Closed' && new Date(election.end_date) > new Date()) && (
                            <div className='w-full text-center'>
                                <div className='dark:text-gray-200 text-2xl'>
                                    この選挙は、{formattedEndDate}に終了しました。
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </ElectionLayout>
    )
}

export default Overview