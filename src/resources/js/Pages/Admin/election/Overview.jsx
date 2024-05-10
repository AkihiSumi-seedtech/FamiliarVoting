import Sidebar from '@/Components/overview/Sidebar'
import { Head, usePage } from '@inertiajs/react'
import React from 'react'

function Overview() {
    const { election } = usePage().props

    return (
        <div>
            <Head title='Overview' />

            <Sidebar />
        </div>
    )
}

export default Overview