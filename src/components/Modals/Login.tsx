import React from 'react';

type LoginProps = {
    
};

const Login:React.FC<LoginProps> = () => {
    
    return (
        <form className='space-y-6 px-6 pb-4'>
            {/* title text */}
            <h3 className='text-xl front-medium text-white'>Sign in LeetClone</h3>
            {/* Email input field */}
            <div>
                <label htmlFor="email" className='text-sm font-medium block mb-2 text-gray-300'>
                Your Email
                </label>
                <input type="email" name="email" id="email" className="
                border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5
                bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                placeholder="name@company.com" 
                />
            </div>
            {/* Password input field */}
            <div>
                <label htmlFor="password" className='text-sm font-medium block mb-2 text-gray-300'>
                Your Password
                </label>
                <input type="password" name="password" id="password" className="
                border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5
                 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                placeholder="********" 
                />
            </div>
            {/* login button */}
            <button type="submit" className='w-full text-white focus:ring-blue-300 font-medium rounded-lg
                text-sm px-5 py-2.5 text-center bg-green-500 hover:bg-green-600'>
                    login
            </button>
            {/* Forgot Password? text */}
            <div className="flex w-full justify-end">
                <a href="#" className="text-sm block text-brand-orange hover:underline text-right">
                Forgot Password?
                </a>
            </div>
            {/* Create account link */}
            <div className="text-sm font-medium text-gray-500 text-center">
            Not Registered?
                <a href="#" className="text-blue-700 hover:underline ml-1">
                Create account
                </a>
            </div>

        </form>

    )
}
export default Login;