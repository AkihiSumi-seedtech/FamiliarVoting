import { Head, usePage } from '@inertiajs/react'
import React from 'react'

function Overview() {
    const { election } = usePage().props

    return (
        <div>
            <Head title='Dashboard' />
            <div>{election.election_name}</div>
        </div>
    )
}

export default Overview