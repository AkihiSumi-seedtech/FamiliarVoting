import ElectionLayout from '@/Layouts/ElectionLayout';
import React from 'react';
import ResultChart from './ResultChart';

const Result = ({ election, results, electionId }) => {
    const filteredResults = results.filter(result => result.election_id === electionId);

    // chartDataを定義する
    const chartData = filteredResults.map(result => ({
        name: result.candidate_name,
        value: result.count,
        party: result.candidate_party,
        
    }));

    console.log(chartData)
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
                {/* <h1>投票結果</h1>
                <div>選挙名: {election.election_name}</div>
                <ul>
                    {results.map((item, index) => (
                        <li key={index}>
                            立候補者名: {item.candidate_name}, 獲得票数: {item.count}, 所属: {item.candidate_party}
                        </li>
                    ))}
                </ul> */}
            </div>

            <ResultChart chartData={chartData} />
        </ElectionLayout>
    );
};

export default Result;
