import AddButton from '@/Components/AddButton';
import AuthenticatedLayout from '@/Layouts/AdminAuthLayout';
import { Head, Link } from '@inertiajs/react';
import ElectionCard from '@/Components/dashboard/ElectionCard';
import PageHeader from '@/Components/dashboard/PageHeader';

export default function Dashboard({ auth, elections }) {
    return (
        <AuthenticatedLayout
            auth={auth}
            user={auth.user}
        >
            <Head title="Dashboard" />

            {elections.data.length != 0 && ( <PageHeader /> )}
            {elections.data.map((item) => (
                <div className='bg-white dark:bg-gray-800' key={item.id}>
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div>
                            <Link href={route('admin.election.show', item.id)}>
                                <ElectionCard
                                    electionName={item.election_name}
                                    electionStartDate={item.start_date}
                                    electionEndDate={item.end_date}
                                    electionStatus={item.status}
                                    electionId={item.id}
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            ))}

            {elections.data.length === 0 &&(
                <div className='max-w-[720px] relative mr-auto ml-auto'>
                    <div className='flex flex-wrap -mr-[15px] -ml-[15px] content-center items-center h-[calc(100vh-60px)]'>
                        <div className='basis-full max-w-full self-center text-center'>
                        <h1 className='text-5xl font-medium mb-4'>ようこそ、FamiliarVoting へ！</h1>
                        <p className='text-xl font-light mb-4'>最初の選挙を作りましょう。</p>
                        <Link href={route('admin.election.create')}>
                            <AddButton>新規開設</AddButton>
                        </Link>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
