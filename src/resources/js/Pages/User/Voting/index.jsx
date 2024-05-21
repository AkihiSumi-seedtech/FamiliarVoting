import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import React, { useState } from 'react';

const Voting = ({ auth, candidates, election_id, success }) => {
    const { post } = useForm()

    const [selectedCandidateId, setSelectedCandidateId] = useState(null); // 投票対象の候補者IDを保持するステート変数

    const handleCandidateChange = (e) => {
        const candidateId = parseInt(e.target.value);
        setSelectedCandidateId(candidateId);
    };

    const handleClick = () => {
        if (selectedCandidateId === null) {
            alert("候補者を選択してください。");
            return;
        }

        const confirmVote = window.confirm("投票後の変更はできません。よろしいですか？");

        if (confirmVote) {
            post(route('vote.store'), {
                voter_id: auth.user.id,
                candidate_id: selectedCandidateId,
                // election_id: election_id,
                election_id: 1
            })
            window.location.href = '/thanks';
        }
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title='投票' />

            <div className="text-4xl text-black-700 text-center font-semibold">選挙名</div>
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full text-center text-sm font-light text-surface dark:text-white">
                                <thead className="border-b border-neutral-200 bg-[#332D2D] font-medium text-white dark:border-white/10">
                                    <tr>
                                        <th scope="col" className="px-6 py-4">選択</th>
                                        <th scope="col" className="px-6 py-4">氏名</th>
                                        <th scope="col" className="px-6 py-4">所属</th>
                                        <th scope="col" className="px-6 py-4">詳細</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* "現在選択している選挙ID"と"Votesテーブルの選挙外部キー"が一致しているか検証 */}
                                    {candidates.data.map((candidate) => (
                                        <tr
                                            className="border-b border-neutral-200 dark:border-white/10"
                                            key={candidate.id}
                                        >
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <input
                                                    type="checkbox"
                                                    name="candidate_id"
                                                    value={candidate.candidate_id}
                                                    checked={selectedCandidateId === candidate.candidate_id}
                                                    onChange={handleCandidateChange}
                                                />
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-black text-base font-bold">
                                                {candidate.candidate_name}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-black text-base">
                                                {candidate.candidate_party}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                            </td>
                                        </tr>
                                    ))}
                                    <tr
                                        className="border-b border-neutral-200 dark:border-white/10"
                                        // key={candidate.id}
                                    >
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <input
                                                type="checkbox"
                                                onChange={handleCandidateChange}
                                            />
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-black text-base font-bold">選択しない</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <button onClick={(e) => handleClick(e.preventDefault())} className="block mx-auto mt-4 px-6 py-3 bg-orange-500 text-white font-bold rounded-full">
                投票する
            </button>

        </AuthenticatedLayout>
    )
}

export default Voting