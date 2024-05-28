import ElectionLayout from '@/Layouts/ElectionLayout';
import React from 'react';

const Result = ({ election, result }) => {
    return (
        <ElectionLayout
            routeVoters={route('admin.election.voters.index', election)}
            routeOverview={route('admin.election.show', election)}
            routeCandidate={route('admin.election.candidates.index', election)}
        >
           <div>
                <h1>Result Page</h1>
                <div>Election: {election.name}</div>
                <ul>
                    {result.map((item, index) => (
                        <li key={index}>
                            立候補者名: {item.candidate_id}, 獲得票数: {item.count}
                        </li>
                    ))}
                </ul>
            </div>
        </ElectionLayout>
    );
};

export default Result;
