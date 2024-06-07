import Checkbox from '@/Components/Checkbox';
import { Button } from '@mui/material';
import VotingConfirmDialog from '@/Components/voterPage/VotingConfirmDialog';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import React, { useState } from 'react';
import ShowDetail from './ShowDetail'; 

const Voting = ({ auth, candidates, election }) => {
    const { post, data, setData } = useForm({
        voter_id: auth.user.id,
        election_id: election.id,
        candidate_id: null,
        is_chose_not_select: false
    })

    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [isChoseNotSelect, setIsChoseNotSelect] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [candidateManifest, setCandidateManifest] = useState(null);
    const [candidateName, setCandidateName] = useState(null); 

    const handleCandidateCheckboxChange = (candidateId) => {
        setSelectedCandidate(candidateId);
        setIsChoseNotSelect(false);

        setData({
            ...data,
            candidate_id: candidateId,
            is_chose_not_select: false,
        })
    };1

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

    const showCandidateManifest = (candidateId) => {
        const candidate = candidates.data.find(candidate => candidate.id === candidateId);
        if (candidate) {
            setCandidateManifest(candidate.candidate_manifest);
            setCandidateName(candidate.candidate_name);
            setDialogOpen(true);
        } else {
            alert("選択された候補者のmanifestはありません。");
        }
    };

    const handleCloseDialog = () => {
        setCandidateManifest(null);
        setDialogOpen(false);
        setCandidateName(null);
    };

    const handleDetail = (candidateId) => {
        showCandidateManifest(candidateId);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-center text-3xl text-gray-800 dark:text-gray-300 leading-tight">{election.election_name}</h2>}
        >
            <Head title='投票' />

            <>
                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full text-center text-sm font-light text-surface dark:text-white">
                                    <thead className="border-b border-neutral-200 dark:bg-[#332D2D] font-medium text-white dark:border-white/10">
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
                                                <td className="whitespace-nowrap px-6 py-4 dark:text-gray-300 text-lg font-bold">
                                                    {candidate.candidate_name}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 dark:text-gray-300 text-base">
                                                    {candidate.candidate_party}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <Button onClick={() => handleDetail(candidate.id)}><div className='font-bold'>政策を見る</div></Button>
                                                    <ShowDetail open={dialogOpen} handleClose={handleCloseDialog} candidateManifest={candidateManifest} candidateName={candidateName} />
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
