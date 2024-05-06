import AddButton from '@/Components/AddButton';
import AuthenticatedLayout from '@/Layouts/AdminAuthLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            // header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className='max-w-[720px] relative mr-auto ml-auto'>
              <div className='flex flex-wrap -mr-[15px] -ml-[15px] content-center items-center h-[calc(100vh-60px-50px)]'>
                <div className='basis-full max-w-full self-center text-center'>
                  <h1 className='text-5xl font-medium mb-4'>ようこそ、FamiliarVoting へ！</h1>
                  <p className='text-xl font-light mb-4'>最初の選挙を作りましょう。</p>
                  <Link href={route('admin.create_election')}>
                    <AddButton>新規開設</AddButton>
                  </Link>
                </div>
              </div>
            </div>
        </AuthenticatedLayout>
    );
}
