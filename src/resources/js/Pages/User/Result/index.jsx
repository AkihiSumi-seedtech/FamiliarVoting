import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import PieChart from '@/Components/result/PieChart';

const Result = ({ auth, election, result, electionId }) => {
    const filteredResult = result.filter(result => result.election_id === electionId)

    const chartData = filteredResult.map(result => ({
        name: result.candidate_name,
        value: result.count,
        party: result.candidate_party,
    }))

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-center text-3xl text-gray-800 dark:text-gray-300 leading-tight">投票結果</h2>}
        >
            <Head title='結果' />

            <div className='flex justify-center'>
                <PieChart chartData={chartData} />
            </div>
        </AuthenticatedLayout>
    )
}

export default Result