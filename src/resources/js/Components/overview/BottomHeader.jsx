import { usePage } from '@inertiajs/react'
import React, { useState } from 'react'

const BottomHeader = () => {
    const { auth } = usePage().props
    const [menuOpened, setMenuOpened] = useState(false)

    return (
        <div className='flex items-center justify-between w-full p-4 text-sm bg-white border-b md:py-0 md:px-12 d:text-md'>
            <div className='mt-1 mr-4'></div>
        </div>
    )
}

export default BottomHeader