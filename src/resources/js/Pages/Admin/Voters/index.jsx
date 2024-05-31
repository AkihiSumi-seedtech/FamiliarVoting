import TableHeading from '@/Components/TableHeading'
import TextInput from '@/Components/TextInput'
import ElectionLayout from '@/Layouts/ElectionLayout'
import { router, useForm } from '@inertiajs/react'
import React from 'react'

const Voters = ({ voters, election, queryParams = null, success }) => {
    queryParams = queryParams || {}

    // 並べ替えの処理
    const sortChanged = (name) => {
        if (name === queryParams.sort_field) {
            if (queryParams.sort_direction === 'asc') {
                queryParams.sort_direction = 'desc'
            } else {
                queryParams.sort_direction = 'asc'
            }
        } else {
            queryParams.sort_field = name
            queryParams.sort_direction = 'asc'
        }
        router.get(route('admin.election.voters.index', [election.id, queryParams]))
    }

    // Searching name and email
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value
        } else {
            delete queryParams[name]
        }
        router.get(route('admin.election.voters.index', [election.id, queryParams]))
    }
    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return

        searchFieldChanged(name, e.target.value)
    }

    const { data, setData, post } = useForm({
        file: null
    })

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData({ file: file })
        }
    }

    /// Importing voters CSV data file
    const handleImport = (e) => {
        e.preventDefault()

        if (!data.file) {
            alert('ファイルを選択してください')
            return
        }

        post(route('admin.election.voters.store', election.id), {
            onSuccess: () => {
                console.log("成功!")
            }
        })
    }

    return (
        <ElectionLayout
            title="投票者"
            iconName='voters'
            pageName='投票者'
            routeOverview={route('admin.election.show', election.id)}
            routeCandidate={route('admin.election.candidates.index', election.id)}
            routeResult={route('admin.election.indexAdminResult', election.id)}
            electionName={election.election_name}
            electionStatus={election.status}
            electionStartDate={election.start_date}
            electionEndDate={election.end_date}
        >
            <div>
                <input id='file' type='file' name='file' onChange={handleFileChange} />
                <button
                    className="bg-orange-600 py-4 w-32 items-center justify-center rounded-lg font-bold"
                    type='submit'
                    value={data.file}
                    onClick={handleImport}
                >
                    Upload
                </button>

                {voters.data.length != 0 || voters.data.filter(
                    voter => voter.election_id != election.id
                ) && (
                    <div className='mt-10 text-center'>
                        <p className='text-xl font-medium mb-4'>まだ投票者をアップロードしていないようです。</p>
                        <p className='text-xl font-medium mb-4'>投票者をアップロードしましょう。</p>
                    </div>
                )}

                <div className='bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg border dark:border-gray-600'>
                    <div className='p-6 text-gray-900 dark:text-gray-100'>
                        <div className='overflow-auto'>
                            <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                                <thead className='text-xs text-gray-700 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-700 border-b-2 border-gray-500'>
                                    <tr className='text-nowrap'>
                                        <TableHeading
                                            name="id"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                        >
                                            ID
                                        </TableHeading>
                                        <TableHeading
                                            name="name"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                        >
                                            氏名
                                        </TableHeading>

                                        <TableHeading
                                            name="email"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                        >
                                            メールアドレス
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
                                                defaultValue={queryParams.name}
                                                placeholder="投票者を検索"
                                                onBlur={(e) =>
                                                    searchFieldChanged("name", e.target.value)
                                                }
                                                onKeyPress={(e) => onKeyPress("name", e)}
                                            />
                                        </th>
                                        <th className="px-3 py-3">
                                            <TextInput
                                            className="w-full"
                                            defaultValue={queryParams.email}
                                            placeholder="メールアドレスを検索"
                                            onBlur={(e) =>
                                                searchFieldChanged("email", e.target.value)
                                            }
                                            onKeyPress={(e) => onKeyPress("email", e)}
                                            />
                                        </th>
                                        <th className="p-3"></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {voters.data.filter(
                                        voter => voter.election_id === election.id
                                    ).map((voter) => (
                                        <tr
                                            className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
                                            key={voter.id}
                                        >
                                            <td className='p-3'>{voter.id}</td>
                                            <td className='p-3 dark:text-gray-100 text-nowrap'>{voter.name}</td>
                                            <td className='p-3'>{voter.email}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </ElectionLayout>
    )
}

export default Voters