import React from 'react';

const CandidateCard = ({ candidates, electionId }) => {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th
                            scope="col"
                            className="text-center border-t border-b border-l border-r border-gray-300 rpx-6 py-3 bg-gray-200"
                        >
                            立候補者名
                        </th>
                        <th
                            scope="col"
                            className="text-center border-t border-b border-l border-r border-gray-300 px-6 py-3 bg-gray-200"
                        >
                            所属
                        </th>
                    </tr>
                </thead>
                <tbody>

                    {candidates.data.filter(
                        candidate => candidate.election_id === electionId
                    ).map((candidate) => (
                        <tr className='border-l border-r border-b border-t border-gray-300' key={candidate.id}>
                            <td className='text-center border-r border-gray-300'>{candidate.candidate_name}</td>
                            <td className='text-center border-gray-300'>{candidate.candidate_party}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CandidateCard;
