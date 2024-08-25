import React from 'react'
import { BsCashCoin } from "react-icons/bs";
import { MdLogout } from "react-icons/md";

const Header = () => {
  
  const handleLogout = () => {
    console.log('Logout clicked');
  }

  return (
    <div className="sticky top-0 left-0 w-full h-[10vh] flex justify-between items-center bg-[#2970FF] px-3 text-white font-semibold text-2xl">
      <div className='flex justify-center items-center gap-2'>
        <BsCashCoin className='text-[26px] mt-2' />
        <p className='text-xl sm:text-[22px]'>BudgeBuddy</p>
      </div>
      <div 
        className="flex justify-center items-center gap-3 font-medium text-2xl cursor-pointer 
                  hover:text-gray-300 hover:transition-all hover:duration-300"
        onClick={handleLogout}
      >
        <p className='hidden sm:inline text-xl'>Logout</p>
        <MdLogout />
      </div>
    </div>
  )
}

export default Header

