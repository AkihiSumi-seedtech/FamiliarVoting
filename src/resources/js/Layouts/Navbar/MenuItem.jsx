import { Link } from '@inertiajs/react'
import classNames from 'classnames'
import React from 'react'
import ElectionMuiIcon from './ElectionMuiIcon'

const MenuItem = ({ icon, link, text, href }) => {
    const isActive = route().current(link + '*')

    const iconClasses = classNames('w-4 h-4 mr-2', {
        'text-[#E75B0D] fill-current': isActive,
        'text-white group-hover:text-[#E75B0D] fill-current': !isActive
    })

    const textClass = classNames({
        'text-[#E75B0D]': isActive,
        'text-white group-hover:text-[#E75B0D] fill-current': !isActive
    })

    return (
        <div className='mb-4'>
            <Link className='flex items-center group py-3' href={href}>
                <ElectionMuiIcon name={icon} className={iconClasses} />
                <div className={textClass}>{text}</div>
            </Link>
        </div>
    )
}

export default MenuItem