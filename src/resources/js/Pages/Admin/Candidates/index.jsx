import React from 'react';
import ElectionLayout from '@/Layouts/ElectionLayout';
import { useForm } from '@inertiajs/react';
import CandidateCard from './CandidateCard';

const Candidates = ({ candidates, election }) => {
    const { data, setData, post } = useForm({
        file: null
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setData({ file: file })
        }
    };

    const handleImport = (e) => {
        e.preventDefault()
        if (!data.file) {
            alert('ファイルを選択してください')
            return
        }

        post(route('admin.election.candidates.store', election.id), {
            onSuccess: () => {
                console.log("成功!")
            }
        });
    };

    return (
        <ElectionLayout
            title="立候補者"
            iconName='candidates'
            pageName='立候補者'
            routeOverview={route('admin.election.show', election.id)}
            routeVoters={route('admin.election.voters.index', election.id)}
            routeResult={route('admin.election.indexAdminResult', election.id)}
            electionName={election.election_name}
            electionStatus={election.status}
        >
            <div>
                <input id='file' type='file' name='file' onChange={handleFileChange} />
                <button
                    className="bg-orange-600 py-4 w-32 mt-4 items-center justify-center rounded-lg font-bold"
                    type='submit'
                    value={data.file}
                    onClick={handleImport}
                >
                    Upload
                </button>

                {!candidates.data.length && (
                    <div className='mt-10 text-center'>
                        <p className='text-xl font-medium mb-4'>まだアップロードされた立候補者がいないようです。</p>
                        <p className='text-xl font-medium mb-4'>立候補者をアップロードしましょう。</p>
                    </div>
                )}

                {candidates.data.length > 0 && (
                    <CandidateCard candidates={candidates} electionId={election.id}  />
                )}
            </div>
        </ElectionLayout>
    );
};

export default Candidates;