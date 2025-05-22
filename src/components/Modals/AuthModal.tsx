import React, { useEffect } from 'react';
import {IoClose } from "react-icons/io5"
import Login from './Login';
import Signup from './Signup';
import ResetPassword from './ResetPassword';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { authModalState } from '@/atoms/authModalAtom';
const AuthModal: React.FC = () => {
  const authModal = useRecoilValue(authModalState);
  const closeModal = useCloseModel();
  return (
    <>
      {/* A centered modal with a blurred background overlay that displays the login form. */}
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-10" onClick={closeModal}></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-full sm:w-[450px] px-4">
        <div className="bg-gradient-to-b from-blue-400 to-slate-800 rounded-lg shadow-lg w-full mx-6 px-6 py-6">
          <div className="flex justify-end p-2">
            <button
              type="button"
              className="bg-transparent rounded-lg text-sm p-1.5 inline-flex items-center hover:bg-gray-700 text-white"
             onClick={closeModal}>
              <IoClose className='h-5 w-5'/>
            </button>
          </div>
          {authModal.type === "login" ? <Login /> : authModal.type === "register" ? <Signup /> : <ResetPassword />}
        </div>
      </div>
    </>
  );
};


export default AuthModal;

{/* close modal hook */}
function useCloseModel() {
  const setAuthModal = useSetRecoilState(authModalState);
  const closeModal = () => {
    setAuthModal((prev) => ({ ...prev, isOpen: false, type: "login" }));
  };
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {closeModal();}
    };
    window.addEventListener("keydown", handleEsc);
    return () =>  window.removeEventListener("keydown", handleEsc);
  }, [closeModal]);

  return closeModal
}
