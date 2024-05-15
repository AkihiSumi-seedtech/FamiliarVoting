import LaunchButton from '@/Components/overview/LaunchButton'
import ElectionLayout from '@/Layouts/ElectionLayout'
import React from 'react'

const Overview = () => {
    return (
        <div>
            概要

            <LaunchButton handleClick={null} />
        </div>
    )
}

Overview.layout = page => <ElectionLayout title="概要" children={page} />

export default Overview