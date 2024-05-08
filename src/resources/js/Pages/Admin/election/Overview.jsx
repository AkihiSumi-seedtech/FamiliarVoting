import { Head, usePage } from '@inertiajs/react'
import React from 'react'

function Overview() {
    const { election } = usePage().props

    return (
        <div>
            <Head title='Dashboard' />
            <div>{election.start_date}</div>
        </div>
    )
}

export default Overview