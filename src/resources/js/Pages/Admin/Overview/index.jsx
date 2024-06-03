import LaunchButton from '@/Components/overview/LaunchButton'
import ElectionLayout from '@/Layouts/ElectionLayout'
import { useForm } from '@inertiajs/react'
import React from 'react'
import DeleteButton from '@/Components/overview/DeleteButton'; 

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
        fetch(route('admin.election.destroy', {election: election.id}), {
            method: 'DELETE',
        })
        
        .then(response => {
            if (response.ok) {
                console.log('選挙が削除されました');
                
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
            iconName="overview"
            pageName="概要"
            routeVoters={route('admin.election.voters.index', election.id)}
            routeCandidate={route('admin.election.candidates.index', election.id)}
            routeResult={route('admin.election.indexAdminResult', election.id)}
            electionName={election.election_name}
            electionStatus={election.status}
        >
            <div>
                {/* DeleteButtonを常に表示 */}
                <DeleteButton onDelete={handleDelete} />

                {(election.status === 'building' && new Date(election.end_date) > new Date()) && (
                    <LaunchButton launchElection={handleLaunch} />
                )}
            </div>
        </ElectionLayout>
    )
    
}

export default Overview
