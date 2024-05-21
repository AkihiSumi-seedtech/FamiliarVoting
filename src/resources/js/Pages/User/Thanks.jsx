import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Thanks = ({ auth }) => {
    return (
        <AuthenticatedLayout user={auth.user}>
            <div className='max-w-[720px] relative mr-auto ml-auto'>
                <div className='flex flex-wrap -mr-[15px] -ml-[15px] content-center items-center h-[calc(100vh-60px-50px)]'>
                <div className='basis-full max-w-full self-center text-center'>
                    <h1 className='text-3xl font-medium mb-4'>投票が完了しました!</h1>
                </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Thanks;
