import React from 'react';
import {IoClose } from "react-icons/io5"
import Login from './Login';
type AuthModalProps = {};

const AuthModal: React.FC<AuthModalProps> = () => {
  return (
    <>
      {/* A centered modal with a blurred background overlay that displays the login form. */}
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-10"></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-full sm:w-[450px] px-4">
        <div className="bg-gradient-to-b from-blue-400 to-slate-800 rounded-lg shadow-lg w-full mx-6 px-6 py-6">
          <div className="flex justify-end p-2">
            <button
              type="button"
              className="bg-transparent rounded-lg text-sm p-1.5 inline-flex items-center hover:bg-gray-700 text-white"
            >
              <IoClose className='h-5 w-5'/>
            </button>
          </div>
          <Login />
        </div>
      </div>
    </>
  );
};


export default AuthModal;
