import LaunchButton from '@/Components/overview/LaunchButton'
import ElectionLayout from '@/Layouts/ElectionLayout'
import { useForm } from '@inertiajs/react'
import React from 'react'

const Overview = ({ election }) => {
    const { post } = useForm();

    const handleLaunch = (e) => {
        e.preventDefault()
        window.location.href = '/admin/dashboard';

        try {
            if (election.status === 'building') {
                post(route('admin.launch-election', election.id), {
                    method: 'put', // PUTメソッドを指定
                })
            } else {
                window.alert("この選挙はすでに開始されています。")
            }
        } catch (error) {
            console.error(error)
        }
    }

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
                <LaunchButton launchElection={handleLaunch} />
            </div>
        </ElectionLayout>
    )
}

export default Overview