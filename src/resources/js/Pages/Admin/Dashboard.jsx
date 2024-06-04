import AddButton from '@/Components/AddButton';
import AuthenticatedLayout from '@/Layouts/AdminAuthLayout';
import { Head, Link } from '@inertiajs/react';
import ElectionCard from '@/Components/dashboard/ElectionCard';
import PageHeader from '@/Components/dashboard/PageHeader';

export default function Dashboard({ auth, elections }) {
    // ログインしている管理者のIDを取得
    const currentAdminId = auth.user.id;
    // console.log(currentAdminId)
    // console.log(auth)
    // console.log(elections)

    // フィルタリングされた選挙のみを取得
    const filteredElections = elections.data.filter(election => election.admin_id === currentAdminId);
    // console.log(filteredElections);
    console.log(elections.data)
    // フィルタリングされた選挙が存在しない場合はダッシュボードに何も表示しない
    if (filteredElections.length === 0) {
        return (
            <AuthenticatedLayout
                auth={auth}
                user={auth.user}
            >
                <Head title="Dashboard" />
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
            </AuthenticatedLayout>
        );
    }

    return (
        <AuthenticatedLayout
            auth={auth}
            user={auth.user}
        >
            <Head title="Dashboard" />
            <PageHeader />
            {elections.data.filter(
                election => election.admin_id === auth.user.id
            ).map((election) => (
                <div className='bg-white dark:bg-gray-800' key={election.id}>
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div>
                            <Link href={route('admin.election.show', election.id)}>
                                <ElectionCard
                                    electionName={election.election_name}
                                    electionStartDate={election.start_date}
                                    electionEndDate={election.end_date}
                                    electionStatus={election.status}
                                    electionId={election.id}
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </AuthenticatedLayout>
    );
}
