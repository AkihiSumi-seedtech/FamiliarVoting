import ElectionCard from '@/Components/voterPage/ElectionCard';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

/**
 * @param {Object} props - コンポーネントのプロパティ
 * @param {Array} props.usersElections - 投票者と関連のある選挙の配列
 * @param {Array} props.votedElections - 投票した選挙の配列
 * @param {Array} props.unVotedElections - 投票していない選挙の配列
 * @returns {JSX.Element} Dashboardコンポーネント
 */
export default function Dashboard({ auth, usersElections, votedElections, unVotedElections }) {
    const upcomingElections = usersElections.data.filter(
        election => election.status === 'Building' || election.status === 'Scheduling'
    )

    const runningElections = usersElections.data.filter(
        election => election.status === 'Running'
    )

    const closedElections = usersElections.data.filter(
        election => election.status === 'Closed'
    )

    /// ステータスが「Building」もしくは「Scheduling」かつ、未投票の選挙を返す。
    const duplicatedUpcomingElections = upcomingElections.filter(election => {
        return unVotedElections.data.some(unVoted => unVoted.id === election.id)
    })

    /// ステータスが「Running」かつ、未投票の選挙を返す。
    const duplicatedRunningElections = runningElections.filter(
        election => unVotedElections.data.some(unVoted => unVoted.id === election.id)
    )

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-center text-3xl text-gray-800 dark:text-gray-300 leading-tight">選挙一覧</h2>}
        >
            <Head title="選挙一覧" />

            {/* 選挙が作成されていない場合、もしくは既に投票済みで他に選挙が無い場合 */}
            {usersElections.data.length === 0 || votedElections.data.length === 0 || unVotedElections.length > 0 && (
                <div className='text-xl dark:text-white text-center p-10'>予定されている選挙はありません</div>
            )}

            {/* 選挙が作成済み、かつ、ステータスが`Running`、かつ、投票者が投票済みでない場合 */}
            {duplicatedRunningElections.length > 0 && (
                <div className='pt-6'>
                    <div className="font-bold text-2xl text-gray-800 dark:text-gray-400 text-center">開催中の選挙</div>
                    {duplicatedRunningElections.map((election) => (
                        <div className='p-4' key={election.id}>
                            <ElectionCard
                                toRoute={route('election.vote.index', election.id)}
                                electionName={election.election_name}
                                startDate={election.start_date}
                                endDate={election.end_date}
                            />
                        </div>
                    ))}
                </div>
            )}

            {/* 選挙がまだ開始されていない場合、かつ投票済みではない */}
            {duplicatedUpcomingElections.length > 0 && (
                <div className='pt-6'>
                    <div className="font-bold text-2xl text-gray-800 dark:text-gray-400 text-center">開催予定の選挙</div>
                    <div className='p-4'>
                        <ul className='text-center'>
                            {duplicatedUpcomingElections.map((election) => (
                                <li key={election.id} className="text-gray-600 dark:text-gray-400 mb-2">
                                    {election.election_name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}


            {/* 選挙が終了した場合 */}
            {closedElections.length > 0 && (
                <div className='pt-6'>
                    <div className="font-bold text-2xl text-gray-800 dark:text-gray-400 text-center">終了した選挙</div>
                    {closedElections.map((election) => (
                        <div key={election.id}>
                            <div className='p-4' key={election.id}>
                                <ElectionCard
                                    toRoute={route('showVoterResult', election.id)}
                                    electionName={election.election_name}
                                    startDate={election.start_date}
                                    endDate={election.end_date}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </AuthenticatedLayout>
    );
}
