import { Link } from '@inertiajs/react'
import { MenuRounded } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import React, { useState } from 'react'
import MainMenu from './MainMenu'

function SidebarLogo() {
    const [menuOpened, setMenuOpened] = useState(false)

    return (
        <div className='flex items-center justify-between px-6 py-4 bg-[#E75B0D] md:flex-shrink-0 w-60 min-w-60 h-[60px] min-h-[60px] md:justify-center'>
            <Link className='mt-1' href={route('admin.dashboard')}>
                <h5>FamiliarVoting</h5>
            </Link>
            <div className='relative md:hidden'>
                <IconButton
                    onClick={() => setMenuOpened(true)}
                    className='fill-current'
                >
                    <MenuRounded />
                    <div className={`${menuOpened ? '' : 'hidden'} absolute z-20 right-0 translate-[-24px, 44px, 0px]`}>
                        <MainMenu className='relative z-20 px-8 py-4 pb-2 mt-2 bg-[#412E55] rounded shadow-lg' />
                        <div
                            onClick={() => {
                                setMenuOpened(false)
                            }}
                            className='fixed inset-0 z-10 bg-black opacity-25'>
                        </div>
                    </div>
                </IconButton>
            </div>
        </div>
    )
}

export default SidebarLogo