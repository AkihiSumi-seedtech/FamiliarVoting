import React from 'react';

const CandidateCard = ({ candidates }) => {

    if (!candidates || candidates.length === 0) {
        return (
            <div>
                <p className='text-2xl text-center font-medium mb-4'>まだアップロードされた立候補者がいないようです。</p>
                <p className='text-2xl text-center font-medium mb-4'>立候補者をアップロードしましょう。</p>
            </div>
        );
    }


    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th scope="col" className="text-center border-t border-b border-l border-r border-gray-300 rpx-6 py-3 bg-gray-200">
                            立候補者名
                        </th>
                        <th scope="col" className="text-center border-t border-b border-l border-r border-gray-300 px-6 py-3 bg-gray-200">
                            所属
                        </th>
                        <th scope="col" className="text-center border-t border-b border-l border-r border-gray-300 px-6 py-3 bg-gray-200">
                            出馬選挙名
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {candidates.map(candidate => (
                        
                        <tr className='border-l border-r border-b border-gray-300' key={candidate.can_id}>
                            <td className='text-center border-r border-gray-300'>{candidate.can_name}</td>
                            <td className='text-center border-gray-300'>{candidate.can_party}</td>
                            <td className='border-l border-gray-300'></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CandidateCard;
