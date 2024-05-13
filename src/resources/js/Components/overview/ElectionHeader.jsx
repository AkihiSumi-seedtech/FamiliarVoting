import React from 'react'

function ElectionHeader({ elections }) {
    return (
        <div className='fixed top-0 left-[200px] right-0 h-[60px] min-h-[60px] bg-white text-black z-[100] border-b flex items-center'>
            <h5 className='mb-0 ml-4 self-center font-bold'>
                {elections.data.election_name}
            </h5>
        </div>
    )
}

export default ElectionHeader