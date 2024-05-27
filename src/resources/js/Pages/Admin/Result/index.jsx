import ElectionLayout from '@/Layouts/ElectionLayout'
import React from 'react'

const Result = ({ election }) => {
    return (
        <ElectionLayout
            routeVoters={route('admin.election.voters.index', election)}
            routeOverview={route('admin.election.show', election)}
            routeCandidate={route('admin.election.candidates.index', election)}
        >
            <div>Result page</div>
        </ElectionLayout>
    )
}

export default Result