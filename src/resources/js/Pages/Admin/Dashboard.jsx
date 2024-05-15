import AddButton from '@/Components/AddButton';
import AuthenticatedLayout from '@/Layouts/AdminAuthLayout';
import { Head, Link } from '@inertiajs/react';
import ElectionCard from './ElectionCard';
import PageHeader from '@/Components/dashboard/PageHeader';

export default function Dashboard({auth, elections}) {
    return (
        <AuthenticatedLayout
            auth={auth}
            user={auth.user}
        >
            <Head title="Dashboard" />

            {elections.data.length != 0 && ( <PageHeader /> )}
            {elections.data.map((item) => (
                <div className='mb-24' key={item.id}>
                    <div className='flex-auto p-4'>
                        <div className='flex flex-wrap -mr-[15px] -ml-[15px] justify-between items-center text-base'>
                            <div className='relative w-full pr-[15px] pl-[15px] font-bold mb-1 basis-1/2 '>
                                <div className='items-center'>
                                    <div className='mr-auto'>
                                        <Link href={route('admin.election.show', item.id)}>
                                            <ElectionCard
                                                electionName={item.election_name}
                                                electionStartDate={item.start_date}
                                                electionEndDate={item.end_date}
                                            
                                            />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {elections.data.length === 0 &&(
                <div className='max-w-[720px] relative mr-auto ml-auto'>
                    <div className='flex flex-wrap -mr-[15px] -ml-[15px] content-center items-center h-[calc(100vh-60px-50px)]'>
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
