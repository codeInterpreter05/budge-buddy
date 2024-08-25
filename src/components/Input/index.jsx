import React from 'react'

const Input = ({ state, setState, placeholder, type }) => {
  return (
    <div className='w-full'>
        <input className='w-full focus:outline-none py-2 border-b-2' type={type} value={state} onChange={(e) => setState(e.target.value)} placeholder={placeholder} />
    </div>
  )
}

export default Input
