import ElectionCard from '@/Components/voterPage/ElectionCard';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth, elections }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-center text-xl text-gray-800 leading-tight">開催中の選挙一覧</h2>}
        >
            <Head title="選挙一覧" />

            {!elections.data.length && (
                <div className='text-center p-10'>現在、開催中の選挙はありません</div>
            )}

            {elections.data.length > 0 && elections.data.filter(
                election => election.status === 'running' || election.status === 'close'
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

            {elections.data.length > 0 && elections.data.filter(
                (election) => election.status === "building" || election.status === "scheduling"
            ).length > 0 && (
                <div className='mt-14 text-center'>
                    <h3 className="font-bold text-2xl text-gray-800">開催予定の選挙があります</h3>
                        <ul className="list-none mt-6">
                            {elections.data.map((election) => (
                                <li key={election.id} className="text-gray-600">
                                    {election.election_name}
                                </li>
                            ))}
                        </ul>
                </div>
            )}

        </AuthenticatedLayout>
    );
}
