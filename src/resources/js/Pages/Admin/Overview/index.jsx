import DateCard from '@/Components/overview/DateCard'
import LaunchButton from '@/Components/overview/LaunchButton'
import ElectionLayout from '@/Layouts/ElectionLayout'
import ElectionMuiIcon from '@/Layouts/Navbar/ElectionMuiIcon'
import PageHeader from '@/Layouts/PageHeader'
import formatDateTime from '@/constants/format_datetime'
import { router, useForm } from '@inertiajs/react'
import React from 'react'
import DeleteButton from '@/Components/overview/DeleteButton'
import DetailTextField from '@/Components/overview/DetailTextField'

const Overview = ({ election }) => {
    const formattedStartDate = formatDateTime(election.start_date)
    const formattedEndDate = formatDateTime(election.end_date)

    const { data, post } = useForm();

    const handleLaunch = async (e) => {
        e.preventDefault();

        try {
            const candidateElectionResponse = await fetch(`/api/candidate-election/${election.id}`);
            const electionUserResponse = await fetch(`/api/election-user/${election.id}`);

            if (!candidateElectionResponse.ok || !electionUserResponse.ok) {
                throw new Error('データベースエラーが発生しました');
            }

            const candidateElectionCount = await candidateElectionResponse.json();
            const electionUserCount = await electionUserResponse.json();

            if (candidateElectionCount > 0 && electionUserCount > 0) {
                if (election.status === 'Building' && new Date(election.end_date) > new Date()) {
                    post(route('admin.launch-election', election.id), {
                        method: 'put',
                    });
                }
            } else {
                alert('投票者および立候補者が登録されている必要があります。');
                window.location.href = `/admin/election/${election.id}`;
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleDelete = () => {
        router.delete(route('admin.election.destroy', election.id))
            .then(response => {
                if (response.ok) {
                    console.log('選挙が削除されました');
                    window.location.href = '/admin/dashboard';
                } else {
                    console.error('選挙の削除中にエラーが発生しました');
                }
            })
            .catch(error => {
                console.error('削除リクエスト中にエラーが発生しました:', error);
            });
    };

    return (
        <ElectionLayout
            title='概要'
            routeVoters={route('admin.election.voters.index', election.id)}
            routeCandidate={route('admin.election.candidates.index', election.id)}
            routeResult={route('admin.election.showAdminResult', election.id)}
            electionId={election.id}
            electionName={election.election_name}
            electionStatus={election.status}
            electionStartDate={election.start_date}
            electionEndDate={election.end_date}
        >
            <div className='py-20'>
                <PageHeader>
                    <div className='mr-auto flex-[0_0_33%] max-w-[33%] px-[15px]'>
                        <div className='mb-0 flex'>
                            <ElectionMuiIcon name="overview" className='text-white mr-3' />
                            <div className='dark:text-white text-lg font-extrabold'>概要</div>
                        </div>
                    </div>
                </PageHeader>
                <div className='max-w-7xl sm:px-6 lg:px-8'>
                    <div className=' dark:bg-gray-800 overflow-hidden'>
                        {(election.status === 'Building' && new Date(election.end_date) > new Date()) && (
                            <div className='w-full mb-8'>
                                <div className='flex flex-wrap'>
                                    <div className='flex mb-4'>
                                        <DateCard dateText='開始日時' electionDate={formattedStartDate} />
                                        <DateCard dateText='終了日時' electionDate={formattedEndDate} />
                                    </div>
                                </div>
                                <div className='mb-6'>
                                    <LaunchButton launchElection={handleLaunch} />
                                </div>
                            </div>
                        )}

                        {(election.status === 'Scheduling' && new Date(election.end_date) > new Date()) && (
                            <div className='w-full text-center mb-8'>
                                <div className='dark:text-gray-200 text-2xl'>
                                    この選挙は、{formattedStartDate}に開始予定です。
                                </div>
                            </div>
                        )}

                        {(election.status === 'Running' && new Date(election.end_date) > new Date()) && (
                            <div className='w-full text-center mb-8'>
                                <div className='dark:text-gray-200 text-2xl'>
                                    この選挙は、{formattedEndDate}に終了します。
                                </div>
                            </div>
                        )}

                        {(election.status === 'Closed' && new Date(election.end_date) > new Date()) && (
                            <div className='w-full text-center mb-8'>
                                <div className='dark:text-gray-200 text-2xl'>
                                    この選挙は、{formattedEndDate}に終了しました。
                                </div>
                            </div>
                        )}

                        <DetailTextField
                            defaultDescription={election.description}
                            electionDescription={data.description}
                            editElectionDescription={data.description}
                            electionId={election.id}
                        />

                        <DeleteButton onDelete={handleDelete} />
                    </div>
                </div>
            </div>
        </ElectionLayout>
    )
}

export default Overview
