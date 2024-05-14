import { Link } from '@inertiajs/react'
import classNames from 'classnames'
import React from 'react'
import MenuIcon from './MenuIcon'

const MenuItem = ({ icon, link, text }) => {
    const isActive = route().current(link + '*')

    const iconClasses = classNames('w-4 h-4 mr-2', {
        'text-white fill-current': isActive,
        'text-white group-hover:text-white fill-current': !isActive
    })

    const textClass = classNames({
        'text-white': isActive,
        'text-white group-hover:text-white fill-current': !isActive
    })

    return (
        <div className='mb-4'>
            <Link className='flex items-center group py-3'>
                <MenuIcon name={icon} className={iconClasses} />
                <div className={textClass}>{text}</div>
            </Link>
        </div>
    )
}

export default MenuItem