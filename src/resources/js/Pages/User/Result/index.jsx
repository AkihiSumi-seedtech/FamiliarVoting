import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const Result = ({ auth }) => {
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title='結果' />

            <div>ここに結果を表示する</div>
        </AuthenticatedLayout>
    )
}

export default Result