import { HowToRegRounded, HowToVoteOutlined, InterpreterModeRounded, SpaceDashboardTwoTone } from '@mui/icons-material'
import React from 'react'

const ElectionMuiIcon = ({ name, className, sx }) => {
    if (name === 'overview') {
        return (
            <SpaceDashboardTwoTone className={className} />
        )
    }

    if (name === 'voters') {
        return (
            <HowToRegRounded className={className} sx={sx} />
        )
    }

    if (name === 'candidates') {
        return (
            <InterpreterModeRounded className={className} sx={sx} />
        )
    }

    if (name === 'result') {
        return (
            <HowToVoteOutlined className={className} />
        )
    }
    return null
}

export default ElectionMuiIcon