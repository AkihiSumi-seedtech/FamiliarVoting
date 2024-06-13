import Pagination from '@/Components/Pagination'
import TableHeading from '@/Components/TableHeading'
import TextInput from '@/Components/TextInput'
import ElectionLayout from '@/Layouts/ElectionLayout'
import ElectionMuiIcon from '@/Layouts/Navbar/ElectionMuiIcon'
import PageHeader from '@/Layouts/PageHeader'
import { router, useForm } from '@inertiajs/react'
import React from 'react'

/**
 * Votersコンポーネントは、特手の選挙における投票者の一覧を表示し、
 * CSVファイルから投票者情報をインポートする機能を提供する。
 *
 * @param {Object} props - コンポーネントのプロパティ
 * @param {Array} props.voters - 投票者情報の配列
 * @param {Object} props.election - 選挙情報の配列
 * @param {Object} [props.queryParams=null] - クエリパラメータ(検索条件やソード条件)
 * @param {} props.success - インポート成功時のメッセージ
 * @returns {JSX.Element} Votersコンポーネント
 */
const Voters = ({ voters, election, queryParams = null, success }) => {
    queryParams = queryParams || {}
    console.log(election);
    /**
     * ソート条件が変更されたときに呼び出す
     *
     * @param {string} name - ソートするフィールド名
     */
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

    /**
     * 検索条件が変更されたときに呼び出される
     *
     * @param {string} name - 検索するフィールド名
     * @param {string} value - 検索する値
     */
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value
        } else {
            delete queryParams[name]
        }
        router.get(route('admin.election.voters.index', [election.id, queryParams]))
    }
    /**
     * Enterキーが押されたときに呼び出される
     *
     * @param {string} name - 検索するフィールド名
     * @param {Object} e - イベントオブジェクト
     */
    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return

        searchFieldChanged(name, e.target.value)
    }

    const { data, setData, post } = useForm({
        file: null
    })

    /**
     * ファイルを選択するときに呼び出される
     *
     * @param {SyntheticBaseEvent} e - イベントオブジェクト
     */
    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData({ file: file })
        }
    }

    /**
     * ファイルをインポートしてMySQLに保存するときに呼び出される
     *
     * @param {SyntheticBaseEvent} e - イベントオブジェクト
     */
    const handleImport = (e) => {
        e.preventDefault()

        if (!data.file) {
            alert('ファイルを選択してください')
            return
        }

        post(route('admin.election.voters.store', election.id), {
            onSuccess: () => {
                // console.log(success)
            }
        })
    }

    return (
        <ElectionLayout
            title="投票者"
            routeOverview={route('admin.election.show', election.id)}
            routeCandidate={route('admin.election.candidates.index', election.id)}
            routeResult={route('admin.election.showAdminResult', election.id)}
            electionId={election.id}
            electionName={election.election_name}
            electionStatus={election.status}
            electionStartDate={election.start_date}
            electionEndDate={election.end_date}
        >
            <div>
                {voters.data.length === 0 && (
                    <div className='flex -mr-[15px] h-screen dark:text-gray-300'>
                        <div className='text-center self-center flex-[0_0_100%] max-x-full'>
                            <div className='text-4xl flex items-center justify-center mb-2'>
                                <ElectionMuiIcon name="voters" className='mx-4' sx={{ fontSize: 40 }} />
                                <div className='dark:text-gray-300'>投票者を追加する</div>
                            </div>
                            <div>
                                下のボタンから投票者のCSVを選択してインポートしましょう
                            </div>
                            <div className='mt-6 flex-[0_0_67%]'>
                            <input id='file' type='file' name='file' onChange={handleFileSelect} />
                                <button
                                    className="bg-orange-600 w-32 h-12 rounded-lg font-bold"
                                    type='submit'
                                    value={data.file}
                                    onClick={handleImport}
                                >
                                    インポート
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {voters.data.length > 0 && (
                    <div className='py-20'>
                        <PageHeader icon="voters" pageName="投票者">
                            <div className='mr-auto flex-[0_0_33%] max-w-[33%] px-[15px]'>
                                <div className='mb-0 flex'>
                                    <ElectionMuiIcon name="candidates" className="text-white mr-3" />
                                    <div className='dark:text-white text-lg font-extrabold'>投票者</div>
                                </div>
                            </div>
                            <div className='mt-0 flex-[0_0_67%] max-w-[67%]'>
                                <input id='file' type='file' name='file' onChange={handleFileSelect} />
                                <button
                                    className="bg-orange-600 w-28 h-10 rounded-lg font-bold"
                                    type='submit'
                                    value={data.file}
                                    onClick={handleImport}
                                >
                                    追加
                                </button>
                            </div>
                        </PageHeader>
                        <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
                            {success && (
                                <div className='bg-emerald-500 py-2 px-6 text-white rounded mb-6'>
                                    {success}
                                </div>
                            )}
                            <div className='bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg'>
                                <div className=' text-gray-900 dark:text-gray-100'>
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
                                                {voters.data.map((voter) => (
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
                                    <Pagination links={voters.meta.links} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </ElectionLayout>
    )
}

export default Voters