import React from 'react';
import { FiLogOut } from 'react-icons/fi';    
import {useSignOut} from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase';
const Logout:React.FC = () => {
    const [signOut, loading, error] = useSignOut(auth);
    const handleLogOut =() => {
        signOut();
    };  
    return(
        <button className='bg-dark-fill-3 py-1.5 px-3 cursor-pointer rounded text-orange-300 hover:bg-gray-600 border border-black' onClick = {handleLogOut}>
        <FiLogOut />
        </button>
    )
}
export default Logout;