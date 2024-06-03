import ElectionLayout from '@/Layouts/ElectionLayout';
import React from 'react';
import PieChart from '@/Components/result/PieChart';

const Result = ({ election, results, electionId }) => {
    const filteredResults = results.filter(result => result.election_id === electionId);

    // chartDataを定義する
    const chartData = filteredResults.map(result => ({
        name: result.candidate_name,
        value: result.count,
        party: result.candidate_party,
    }));

    return (
        <ElectionLayout
            title='結果'
            iconName='result'
            pageName='結果'
            routeVoters={route('admin.election.voters.index', election)}
            routeOverview={route('admin.election.show', election)}
            routeCandidate={route('admin.election.candidates.index', election)}
            electionId={election.id}
            electionName={election.election_name}
            electionStatus={election.status}
            electionStartDate={election.start_date}
            electionEndDate={election.end_date}
        >

            <PieChart chartData={chartData} />
        </ElectionLayout>
    );
};

export default Result;
