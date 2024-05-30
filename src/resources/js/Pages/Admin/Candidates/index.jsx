import React from 'react';
import ElectionLayout from '@/Layouts/ElectionLayout';
import { router, useForm } from '@inertiajs/react';
import TableHeading from '@/Components/TableHeading';
import TextInput from '@/Components/TextInput';

const Candidates = ({ candidates, election, queryParams = null }) => {
    queryParams = queryParams || {}

    const sortChanged = (name) => {
        if (name === queryParams.sort_field) {
            if (queryParams.sort_field === 'asc') {
                queryParams.sort_direction = 'desc'
            } else {
                queryParams.sort_direction = 'asc'
            }
        } else {
            queryParams.sort_field = name
            queryParams.sort_direction = 'asc'
        }
        router.get(route('admin.election.candidates.index', [election.id, queryParams]))
    }

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value
        } else {
            delete queryParams[name]
        }
        router.get(route('admin.election.candidates.index', [election.id, queryParams]))
    }
    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return

        searchFieldChanged(name, e.target.value)
    }

    const { data, setData, post } = useForm({
        file: null
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setData({ file: file })
        }
    };

    /// Importing candidates CSV data file
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

                {candidates.data.length != 0 || candidates.data.filter(
                    candidate => candidate.election_id != election.id
                ) && (
                    <div className='mt-10 text-center'>
                        <p className='text-xl font-medium mb-4'>まだアップロードされた立候補者がいないようです。</p>
                        <p className='text-xl font-medium mb-4'>立候補者をアップロードしましょう。</p>
                    </div>
                )}

                <div className='bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg border dark:border-gray-600'>
                    <div className='p-6 text-gray-900 dark:text-gray-100'>
                        <div className='overflow-auto'>
                            <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                                <thead className='text-xs text-gray-700 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-700 border-b-2 border-gray-500'>
                                    <tr className='text-nowrap'>
                                        <TableHeading
                                            name='id'
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                        >
                                            ID
                                        </TableHeading>
                                        <TableHeading
                                            name="candidate_name"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                        >
                                            氏名
                                        </TableHeading>
                                        <TableHeading
                                            name="candidate_party"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                        >
                                            政党
                                        </TableHeading>

                                        <th className='p-3 text-right'>Actions</th>
                                    </tr>
                                </thead>

                                <thead className='test-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500'>
                                    <tr className='text-nowrap'>
                                        <th className='p-3'></th>
                                        <th className='p-3'>
                                            <TextInput
                                                className='w-full'
                                                defaultValue={queryParams.candidate_name}
                                                placeholder="立候補者を検索"
                                                onBlur={(e) =>
                                                    searchFieldChanged("candidate_name", e.target.value)
                                                }
                                                onKeyPress={(e) => onKeyPress("candidate_name", e)}
                                            />
                                        </th>
                                        <th className="px-3 py-3">
                                            <TextInput
                                            className="w-full"
                                            defaultValue={queryParams. candidate_party}
                                            placeholder="政党を絞り込む"
                                            onBlur={(e) =>
                                                searchFieldChanged("candidate_party", e.target.value)
                                            }
                                            onKeyPress={(e) => onKeyPress("candidate_party", e)}
                                            />
                                        </th>
                                        <th className="p-3"></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {candidates.data.filter(
                                        candidate => candidate.election_id === election.id
                                    ).map((candidate) => (
                                        <tr
                                            className='bg-white dark:bg-gray-800 border-b dark:border-gray-700'
                                            key={candidate.id}
                                        >
                                            <td className='p-3'>{candidate.id}</td>
                                            <td className='p-3 dark:text-gray-100 text-nowrap'>{candidate.candidate_name}</td>
                                            <td className='p-3'>{candidate.candidate_party}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </ElectionLayout>
    );
};

export default Candidates;