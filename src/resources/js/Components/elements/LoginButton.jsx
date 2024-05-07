import React from 'react'

function LoginButton({ className = '', disabled, children, ...props }) {
  return (
    <button
        className='px-4 py-2 text-base relative block w-full bg-orange-600 hover:bg-orange-800 cursor-pointer border border-transparent rounded-md font-extrabold text-white'
        {...props}
        disabled={disabled}
    >
        {children}
    </button>
  )
}

export default LoginButton