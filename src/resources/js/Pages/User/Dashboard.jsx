import ElectionCard from '@/Components/voterPage/ElectionCard';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth, elections }) {
    // console.log(auth.user.is_voted)
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-center text-xl text-gray-800 dark:text-gray-300 leading-tight">開催中の選挙一覧</h2>}
        >
            <Head title="選挙一覧" />

            {/* 選挙が作成されていない場合 */}
            {!elections.data.length && (
                <div className='text-center p-10'>現在、開催中の選挙はありません</div>
            )}

            {/* 選挙がまだ開始されていない場合 */}
            {elections.data.length > 0 && (
                <div className='mt-14 text-center'>
                    <h3 className="font-bold text-2xl text-gray-800 dark:text-gray-400">開催予定の選挙があります</h3>
                        <ul className="list-none mt-6">
                            {elections.data.filter(
                                election => auth.user.election_id === election.id && (election.status === "building" || election.status === "scheduling") && auth.user.is_voted === 0
                            ).map((election) => (
                                <li key={election.id} className="text-gray-600 dark:text-gray-300 text-xl mb-2">
                                    {election.election_name}
                                </li>
                            ))}
                        </ul>
                </div>
            )}

            {/* 選挙が作成済み、かつ、ステータスが実行中、かつ、投票者が投票済みでない場合 */}
            {elections.data.length > 0 && elections.data.filter(
                election => auth.user.election_id === election.id && election.status === 'running' && auth.user.is_voted === 0
            ).map((election) => (
                <div className='p-4' key={election.id}>
                    <ElectionCard
                        toRoute={route('election.vote.index', election.id)}
                        electionName={election.election_name}
                        startDate={election.start_date}
                        endDate={election.end_date}
                    />
                </div>
            ))}

            {/* 選挙が終了した場合 */}
            {elections.data.length > 0 && elections.data.filter(
                election => election.status === 'closed'
            ).map((election) => (
                <div className='p-4' key={election.id}>
                    <ElectionCard
                        toRoute={route('indexVoterResult', election.id)}
                        electionName={election.election_name}
                        startDate={election.start_date}
                        endDate={election.end_date}
                    />
                </div>
            ))}

            {/* 投票者が投票した */}
            {/* {auth.user.is_voted === 1 && (
                <div className='text-center text-3xl'>
                    あなたは投票済みです。
                </div>
            )} */}

        </AuthenticatedLayout>
    );
}
