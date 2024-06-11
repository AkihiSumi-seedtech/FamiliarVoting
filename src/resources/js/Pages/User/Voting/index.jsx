import Checkbox from '@/Components/Checkbox';
import ShowDetail from '@/Components/voterPage/ShowDetail';
import VotingConfirmDialog from '@/Components/voterPage/VotingConfirmDialog';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import React, { useState } from 'react';
import ElectionDescriptionDialog from '@/Components/voterPage/ElectionDescriptionDialog';
import DetailTextField from '@/Components/overview/DetailTextField';

const Voting = ({ auth, candidates, election }) => {
    const { post, data, setData } = useForm({
        voter_id: auth.user.id,
        election_id: election.id,
        candidate_id: null,
        is_chose_not_select: false
    })

    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [isChoseNotSelect, setIsChoseNotSelect] = useState(false);
    const [editedDescription, setEditedDescription] = useState(election.description); // 追加

    const handleDescriptionUpdate = (description) => {
        setEditedDescription(description);
    }

    const handleCandidateCheckboxChange = (candidateId) => {
        setSelectedCandidate(candidateId);
        setIsChoseNotSelect(false);

        setData({
            ...data,
            candidate_id: candidateId,
            is_chose_not_select: false,
        })
    };

    const handleNotSelectCheckboxChange = () => {
        setSelectedCandidate(null);
        setIsChoseNotSelect(true);

        setData({
            ...data,
            candidate_id: null,
            is_chose_not_select: true
        })
    };

    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        if (isChoseNotSelect === false && selectedCandidate === null) {
            alert("いずれかの選択を有効にしてください。");
            return;
        } else {
            setOpen(true)
        }
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleVoting = (e) => {
        e.preventDefault()

        post(route('election.vote.store', election.id))
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-center text-3xl text-gray-800 dark:text-gray-300 leading-tight">{election.election_name}</h2>}
            electionDescription={election.description}
        >
            <Head title='投票' />

            <>
                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full text-center text-sm font-light text-surface dark:text-white">
                                    <thead className="border-b border-neutral-200 dark:bg-[#332D2D] font-medium dark:text-white dark:border-white/10">
                                        <tr>
                                            <ElectionDescriptionDialog electionDescription={editedDescription} />
                                            <p>選挙概要はこちらをクリック</p>
                                            <DetailTextField
                                                defaultDescription={election.description}
                                                electionDescription={election.description}
                                                editElectionDescription={editedDescription}
                                                electionId={election.id}
                                                onUpdateDescription={handleDescriptionUpdate} // 編集された内容を受け取るコールバック関数を渡す
                                            />
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {candidates.data.map((candidate) => (
                                            <tr
                                                className="border-b border-neutral-300 dark:border-white/10"
                                                key={candidate.id}
                                            >
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <Checkbox
                                                        name="candidate_id"
                                                        checked={selectedCandidate === candidate.id}
                                                        onChange={() => handleCandidateCheckboxChange(candidate.id)}
                                                    />
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 dark:text-gray-300 text-lg font-bold">
                                                    {candidate.candidate_name}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 dark:text-gray-300 text-base">
                                                    {candidate.candidate_party}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <ShowDetail
                                                        candidateName={candidate.candidate_name}
                                                        candidateManifest={candidate.candidate_manifest}
                                                    />
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
                                            <td className="whitespace-nowrap px-6 py-4 dark:text-gray-300 text-lg font-bold">
                                                選択しない
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <VotingConfirmDialog
                    open={open}
                    handleClickOpen={handleClickOpen}
                    handleClose={handleClose}
                    handleVotingDecide={handleVoting}
                />
            </>

        </AuthenticatedLayout>
    )
}

export default Voting;
