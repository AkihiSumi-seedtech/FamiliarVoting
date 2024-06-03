import ElectionLayout from '@/Layouts/ElectionLayout';
import React, { useEffect } from 'react';
import PieChart from '@/Components/result/PieChart';

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
            // アラートを表示
            alert('この選挙はまだ終了していません。\n 投票結果は選挙期間終了後に可能になります。');
            // 概要ページに遷移
            window.location.href = route('admin.election.show', election);
        } else if (filteredResults.length === 0) {
            // 結果がない場合にアラートを表示
            alert('投票結果該当なし');
        }
    }, [election.status, filteredResults.length, election]);

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
