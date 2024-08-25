import React from 'react'

const Button = ({ text, onClick, blue, disabled }) => {
  return (
    <div disabled={disabled} className={`${blue ? "bg-[#2970FF] text-white" : "border-[1px] text-[#2970FF] border-[#2970FF]"} text-center w-full py-2 cursor-pointer`} onClick={onClick}>
        {text}
    </div>
  )
}

export default Button
