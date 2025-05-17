import Link from "next/link";
import { auth } from "@/firebase/firebase";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Image from "next/image";
import Logout from "../Buttons/Logout";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import { FaChevronLeft } from "react-icons/fa";
import { BsList } from "react-icons/bs";
import { useRouter } from "next/router";
import { FaChevronRight } from "react-icons/fa";
import Timer from "../Timer/Timer";
type TopbarProps = {
  problemPage?: boolean;
};

const Topbar: React.FC<TopbarProps> = ({ problemPage }) => {
  const [user] = useAuthState(auth);
  const setAuthModalState = useSetRecoilState(authModalState);
  const router = useRouter();

  return (
    <nav className="relative flex h-[50px] w-full shrink-0 items-center px-5 bg-gray-900 text-gray-700">
      <div className={`flex w-full items-center justify-between ${!problemPage ? "max-w-[1200px] mx-auto" : ""}`}>
        {/* Logo - redirects to homepage */}
        <Link href="/">
          <div className="h-[22px] flex-1">
            <img src="/logo-full.png" alt="Logo" className="h-full" />
          </div>
        </Link>

        {/* Center - Problem List with left arrow */}
        {problemPage && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2">
            <div
              className="flex items-center justify-center rounded bg-gray-700 hover:bg-gray-600 h-8 w-8 cursor-pointer"
              onClick={() => router.back()}
            >
              <FaChevronLeft className="text-white" />
            </div>
            <Link href="/" className="flex items-center gap-2 font-semibold text-base max-w-[170px] text-white cursor-pointer">
              <BsList />
              <p>Problem List</p>
            </Link>
            <div>
              <div
                className="flex items-center justify-center rounded bg-gray-700 hover:bg-gray-600 h-8 w-8 cursor-pointer"
              >
                <FaChevronRight className="text-white" />
              </div>
            </div>
          </div>
        )}

        {/* Right-side buttons */}
        <div className="flex items-center space-x-4 flex-1 justify-end">
          {/* Premium link button */}
          <div>
            <a
              href="https://www.google.com/"
              target="_blank"
              rel="noreferrer"
              className="bg-gray-600 py-1.5 px-3 cursor-pointer rounded text-orange-300 hover:bg-gray-300 border border-black"
            >
              Premium
            </a>
          </div>
          {problemPage && <Timer />}
          {!user && (
            <Link href="/auth" onClick={() => {
              setAuthModalState((prev) => ({ ...prev, isOpen: true, type: "login" }));
            }}>
              <button className="bg-gray-600 py-1 px-2 cursor-pointer rounded border border-black hover:bg-gray-300 text-white">
                Sign In
              </button>
            </Link>
          )}
          {user && (
            <div className="cursor-pointer group relative">
              <Image src='/avatar.png' alt='Avatar' width={30} height={30} className='rounded-full' />
              <div
                className='absolute top-10 left-2/4 -translate-x-2/4 mx-auto bg-gray-800 text-orange-400 p-2 rounded shadow-lg 
                z-40 group-hover:scale-100 scale-0 
                transition-all duration-300 ease-in-out'
              >
                <p className='text-sm'>{user.email}</p>
              </div>
            </div>
          )}
          {user && <Logout />}
        </div>
      </div>
    </nav>
  );
};

export default Topbar;
