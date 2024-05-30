import React from 'react'
import MenuIcon from './Navbar/MenuIcon'

function PageHeader({ icon, text }) {
    return (
        <div className='flex fixed dark:bg-gray-800 w-full left-60 z-30 border-b dark:border-s-gray-100 items-center min-h-[60px] h-[60px]'>
            <div className='w-full -px-[15px] mx-auto'>
                <div className='flex flex-wrap mx-[15px]'>
                    <div className='mr-3'>
                        <MenuIcon name={icon} className="text-white" />
                    </div>
                    <div className='dark:text-white text-lg font-extrabold'>{text}</div>
                </div>
            </div>
        </div>
    )
}

export default PageHeader