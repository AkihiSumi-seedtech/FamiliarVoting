import { HowToRegRounded, HowToVoteOutlined, InterpreterModeRounded, SpaceDashboardTwoTone } from '@mui/icons-material'
import React from 'react'

const MenuIcon = ({ name, className }) => {
    if (name === 'overview') {
        return (
            <SpaceDashboardTwoTone className={className} />
        )
    }

    if (name === 'voters') {
        return (
            <HowToRegRounded className={className} />
        )
    }

    if (name === 'candidates') {
        return (
            <InterpreterModeRounded className={className} />
        )
    }

    if (name === 'result') {
        return (
            <HowToVoteOutlined className={className} />
        )
    }
    return null
}

export default MenuIcon