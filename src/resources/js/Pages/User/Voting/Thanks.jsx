import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

const Thanks = ({ auth }) => {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title='投票完了' />

            <div className='flex'>
                <div className='mx-auto'>
                    <div className='pt-20'>
                        <h1 className='text-3xl font-medium mb-4 dark:text-gray-400'>投票が完了しました</h1>
                        <Link href={route('voterDashboard')}>
                            <div
                                className="bg-orange-600 py-4 w-40 mt-8 rounded-lg font-bold text-white text-center mx-auto"
                            >
                                トップページに戻る
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Thanks;