import React, { useEffect } from 'react';
import { BsCashCoin } from "react-icons/bs";
import { MdLogout } from "react-icons/md";
import { auth } from '../../firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from 'react-router-dom';

const Header = () => {

  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/auth");
      toast.success("Logout successful");
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error("Failed to logout");
    }
  }

  return (
    <div className="sticky overflow-y-auto top-0 left-0 w-full h-[10vh] flex justify-between items-center bg-[#2970FF] px-3 text-white font-semibold text-2xl">
      <div className='flex justify-center items-center gap-2'>
        <BsCashCoin className='text-[26px] mt-2' />
        <p className='text-xl sm:text-[22px]'>BudgeBuddy</p>
      </div>
      {
        user && (
          <div 
            className="flex justify-center items-center gap-3 font-medium text-2xl cursor-pointer 
                      hover:text-gray-300 hover:transition-all hover:duration-300"
            onClick={handleLogout}
          > 
            {/* <img src={user.photoURL} alt="user-image" className='h-10 w-10 rounded-full'/> */}
            <p className='hidden sm:inline text-xl'>Logout</p>
            <MdLogout />
          </div>
        )
      }
    </div>
  );
}

export default Header;
