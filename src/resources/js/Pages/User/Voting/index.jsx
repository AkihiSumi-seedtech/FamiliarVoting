import Checkbox from '@/Components/Checkbox';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import React, { useState } from 'react';

const Voting = ({ auth, candidates, election }) => {
    const { post, setData } = useForm({
        voter_id: auth.user.id,
        election_id: election.id,
        candidate_id: null,
        is_chose_not_select: false
    })

    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [isChoseNotSelect, setIsChoseNotSelect] = useState(false);

    const handleCandidateCheckboxChange = (candidateId) => {
        setSelectedCandidate(candidateId);
        setIsChoseNotSelect(false);

        setData('candidate_id', candidateId)
        setData('is_chose_not_select', false)
        console.log(candidateId)
    };

    const handleNotSelectCheckboxChange = () => {
        setSelectedCandidate(null);
        setIsChoseNotSelect(true);

        setData('candidate_id', null)
        setData('is_chose_not_select', true)
    };

    const handleVoting = (e) => {
        e.preventDefault()

        if (isChoseNotSelect === false && selectedCandidate === null) {
            alert("いずれかの選択を有効にしてください。");
            return;
        }

        // const confirmVote = window.confirm("投票後の変更はできません。よろしいですか？");

        post(route('election.vote.store', election.id), {
            onSuccess: () => {
                console.log("成功!")
            }
        })
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title='投票' />

            <form onSubmit={handleVoting}>
                <div className="text-4xl text-black-700 text-center font-semibold">{election.election_name}</div>
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
                                        {candidates.data.map((candidate) => (
                                            <tr
                                                className="border-b border-neutral-200 dark:border-white/10"
                                                key={candidate.id}
                                            >
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <Checkbox
                                                        name="candidate_id"
                                                        checked={selectedCandidate === candidate.id}
                                                        onChange={() => handleCandidateCheckboxChange(candidate.id)}
                                                    />
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-black text-base font-bold">
                                                    {candidate.candidate_name}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-black text-base">
                                                    {candidate.candidate_party}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    {/* 詳細リンクなど */}
                                                </td>
                                            </tr>
                                        ))}
                                        <tr
                                            className="border-b border-neutral-200 dark:border-white/10"
                                        >
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <Checkbox
                                                    name="is_chose_not_select"
                                                    checked={isChoseNotSelect}
                                                    onChange={() => handleNotSelectCheckboxChange()}
                                                />
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-black text-base font-bold">
                                                選択しない
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <button className="block mx-auto mt-12 px-6 py-3 bg-orange-500 text-white font-bold rounded-full">
                    投票する
                </button>
            </form>

        </AuthenticatedLayout>
    )
}

export default Voting