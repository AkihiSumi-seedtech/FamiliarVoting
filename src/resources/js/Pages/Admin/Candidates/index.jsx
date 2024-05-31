import React from 'react';
import ElectionLayout from '@/Layouts/ElectionLayout';
import { router, useForm } from '@inertiajs/react';
import TableHeading from '@/Components/TableHeading';
import TextInput from '@/Components/TextInput';
import PageHeader from '@/Layouts/PageHeader';
import ElectionMuiIcon from '@/Layouts/Navbar/ElectionMuiIcon';

/**
 * Candidatesコンポーネントは、特定の選挙における立候補者の一覧を表示し、
 * CSVファイルから立候補者をインポートする機能を提供する。
 *
 * @param {Object} props - コンポーネントのプロパティ
 * @param {Array} props.candidates - 立候補者のリスト
 * @param {Object} props.election - 選挙の情報
 * @param {Object} [props.queryParams=null] - クエリパラメータ（検索条件やソート条件）
 * @returns {JSX.Element} Candidatesコンポーネント
 */
const Candidates = ({ candidates, election, queryParams = null }) => {
    // デフォルト値を設定
    queryParams = queryParams || {}

    /**
     * ソート条件が変更されたときに呼び出す関数
     *
     * @param {string} name - ソートするフィールド名
     */
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

    /**
     * 検索条件が変更されたときに呼び出される関数
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
        router.get(route('admin.election.candidates.index', [election.id, queryParams]))
    }
    /**
     * Enterキーが押されたときに呼び出される関数
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
    });

    /**
     * ファイルを選択するときに呼び出される関数
     *
     * @param {Object} e - イベントオブジェクト
     */
    const handleFileSelect = (e) => {
        const file = e.target.files[0]
        if (file) {
            setData({ file: file })
        }
    };

    /**
     * ファイルをインポートしてMySQLに保存する関数
     *
     * @param {Object} e - イベントオブジェクト
     */
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
            routeOverview={route('admin.election.show', election.id)}
            routeVoters={route('admin.election.voters.index', election.id)}
            routeResult={route('admin.election.indexAdminResult', election.id)}
            electionName={election.election_name}
            electionStatus={election.status}
            electionStartDate={election.start_date}
            electionEndDate={election.end_date}
        >
            <div>
                {candidates.data.length === 0 && (
                    <div className='flex -mr-[15px] h-screen dark:text-gray-300'>
                        <div className='text-center self-center flex-[0_0_100%] max-w-full'>
                            <div className='text-4xl flex items-center justify-center mb-2'>
                                <ElectionMuiIcon name='candidates' className='mx-4' sx={{ fontSize: 40 }} />
                                <div className='dark:text-gray-300'>立候補者を追加する</div>
                            </div>
                            <div>
                                下のボタンから立候補者のCSVを選択してインポートしましょう
                            </div>
                            <div className='mt-6 flex-[0_0_67%] max-w-[67%]'>
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

                {candidates.data.length > 0 && (
                    <div className='bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg border dark:border-gray-600 mt-20'>
                        <PageHeader icon="candidates" pageName="立候補者">
                            <div className='mr-auto flex-[0_0_33%] max-w-[33%] px-[15px]'>
                                <div className='mb-0 flex'>
                                    <ElectionMuiIcon name="candidates" className="text-white mr-3" />
                                    <div className='dark:text-white text-lg font-extrabold'>立候補者</div>
                                </div>
                            </div>
                            <div className='mt-0 flex-[0_0_67%] max-w-[67%]'>
                                <input id='file' type='file' name='file' onChange={handleFileSelect} />
                                <button
                                    className="bg-orange-600 w-28 h-30 rounded-lg font-bold"
                                    type='submit'
                                    value={data.file}
                                    onClick={handleImport}
                                >
                                    Upload
                                </button>
                            </div>
                        </PageHeader>
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
                )}
            </div>
        </ElectionLayout>
    );
};

export default Candidates;