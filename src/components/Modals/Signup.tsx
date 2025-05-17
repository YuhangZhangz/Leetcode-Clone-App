import React from 'react';
import { useSetRecoilState } from 'recoil'
import { authModalState } from '@/atoms/authModalAtom';

type SignupProps = {};

const Signup:React.FC<SignupProps> = () => {
    const setAuthModalState = useSetRecoilState(authModalState)
    const handleClick = () => {
        setAuthModalState((prev) => ({...prev,type:"login"}));
    };
    return (
        <form className='space-y-6 px-6 pb-4'>
            {/* title text */}
            <h3 className='text-xl front-medium text-white'>Register to LeetClone</h3>
            {/* Email input field */}
            <div>
                <label htmlFor="email" className='text-sm font-medium block mb-2 text-gray-300'>
                Email
                </label>
                <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    className="
                border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5
                bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                placeholder="name@company.com" 
                />
            </div>
            {/* Display Name input field */}
            <div>
                <label htmlFor="DisplayName" className='text-sm font-medium block mb-2 text-gray-300'>
                Display Name
                </label>
                <input 
                    type="DisplayName" 
                    name="DisplayName" 
                    id="DisplayName" 
                    className="
                border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5
                bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                placeholder="John Doe" 
                />
            </div>
            {/* Password input field */}
            <div>
                <label htmlFor="password" className='text-sm font-medium block mb-2 text-gray-300'>
                Password
                </label>
                <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    className="
                border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5
                 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                placeholder="********" 
                />
            </div>
            {/* Register button */}
            <button type="submit" className='w-full text-white focus:ring-blue-300 font-medium rounded-lg
                text-sm px-5 py-2.5 text-center bg-green-500 hover:bg-green-600'>
                    Register
            </button>
            {/* Create account link */}
            <div 
                className="text-sm font-medium text-gray-500 text-center">
                Already have an account?{""}
                <a href="#" className="text-blue-700 hover:underline ml-1" onClick={handleClick}>
                    Log In
                </a>
            </div>

        </form>
    )
}
export default Signup;