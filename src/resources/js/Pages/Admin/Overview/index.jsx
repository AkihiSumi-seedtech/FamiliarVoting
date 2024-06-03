import React from 'react';
import LaunchButton from '@/Components/overview/LaunchButton'
import DeleteButton from '@/Components/overview/DeleteButton'
import ElectionLayout from '@/Layouts/ElectionLayout'
import { useForm } from '@inertiajs/react'

const Overview = ({ election }) => {
    const { post } = useForm();

    const handleLaunch = (e) => {
        e.preventDefault();
        window.location.href = '/admin/dashboard';
    
        try {
            if (election.status === 'building' && new Date(election.end_date) > new Date()) {
                post(route('admin.launch-election', election.id), {
                    method: 'put', // PUTメソッドを指定
                });
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleDelete = () => {
        // 削除処理の実装
    };
    
    return (
        <ElectionLayout
            title='概要'
            iconName="overview"
            pageName="概要"
            routeVoters={route('admin.election.voters.index', election.id)}
            routeCandidate={route('admin.election.candidates.index', election.id)}
            routeResult={route('admin.election.indexAdminResult', election.id)}
            electionName={election.election_name}
            electionStatus={election.status}
        >
            <div>
                {(election.status === 'building' && new Date(election.end_date) > new Date()) && (
                    <>
                        <LaunchButton launchElection={handleLaunch} />
                        <DeleteButton onDelete={handleDelete} election={election} />

                    </>
                )}
            </div>
        </ElectionLayout>
    )
}

export default Overview;
