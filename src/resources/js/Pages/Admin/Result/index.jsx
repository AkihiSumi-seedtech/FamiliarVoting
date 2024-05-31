import ElectionLayout from '@/Layouts/ElectionLayout';
import React, { useEffect } from 'react';
import ResultChart from './ResultChart';

const Result = ({ election, results, electionId }) => {
    const filteredResults = results.filter(result => result.election_id === electionId);

    // chartDataを定義する
    const chartData = filteredResults.map(result => ({
        name: result.candidate_name,
        value: result.count,
        party: result.candidate_party,
        
    }));

    // 選挙が終了していない場合にアラートを表示
    useEffect(() => {
        if (election.status !== 'closed') {
            alert('この選挙はまだ終了していません');
        }
    }, [election.status]);

    return (
        <ElectionLayout
            title='結果'
            iconName='result'
            pageName='結果'
            routeVoters={route('admin.election.voters.index', election)}
            routeOverview={route('admin.election.show', election)}
            routeCandidate={route('admin.election.candidates.index', election)}
            electionName={election.election_name}
            electionStatus={election.status}
        >
            <div>
                <ResultChart chartData={chartData} />
            </div>
        </ElectionLayout>
    );
};

export default Result;
