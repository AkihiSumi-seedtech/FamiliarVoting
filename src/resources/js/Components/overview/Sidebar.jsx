import { Link } from '@inertiajs/react'
import React from 'react'

function Sidebar({ elections }) {
    return (
        <aside className='fixed left-0 top-0 bottom-0 w-[200px] z-[100] bg-[#412E55]'>
            <div className='flex w-[200px] min-w-[200px] px-[1em] h-[60px] min-h-[60px] bg-[#E75B0D]'>
                <Link href={route('admin.election.index')} className='self-center'>
                    FamiliarVoting
                </Link>
            </div>
            <div className='w-full text-white p-0 mt-2'>
                <ul className='flex flex-wrap pl-0 list-none flex-col mb-6 text-base'>
                    <li className='list-item font-base active:bg-[#141d28] active:rounded aria-selected:bg-[#141d28]' aria-selected="true">
                        <Link className='block py-1 px-14'>概要</Link>
                    </li>
                    <li className='font-base active:bg-[#141d28] active:rounded aria-selected:bg-[#141d28]' aria-selected="true">
                        <Link className='block py-1 px-14'>投票者</Link>
                    </li>
                    <li className='block font-base active:bg-[#141d28] active:rounded' aria-selected="true">
                    <Link href={route('admin.candidates')} className='block py-1 px-14'>立候補者</Link>
                    </li>
                    <li className='block font-base active:bg-[#141d28] active:rounded' aria-selected="true">
                        <Link className='block py-1 px-14'>結果</Link>
                    </li>
                </ul>
            </div>
        </aside>
    )
}

export default Sidebar