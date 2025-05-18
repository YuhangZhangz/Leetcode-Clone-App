import Link from "next/link";
import { auth } from "@/firebase/firebase";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Image from "next/image";
import Logout from "../Buttons/Logout";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BsList } from "react-icons/bs";
import { useRouter } from "next/router";
import Timer from "../Timer/Timer";
// Import your problems list
import { problems } from "@/utils/problems";
import { Problem } from "@/utils/types/problem";

type TopbarProps = {
  problemPage?: boolean;
};

const Topbar: React.FC<TopbarProps> = ({ problemPage }) => {
  const [user] = useAuthState(auth);
  const setAuthModalState = useSetRecoilState(authModalState);
  const router = useRouter();

  // Navigate to previous or next problem
  const handleProblemChange = (isForward: boolean) => {
    const pid = router.query.pid as string;
    const current = problems[pid] as Problem;
    if (!current) return;

    const direction = isForward ? 1 : -1;
    const nextOrder = current.order + direction;

    // Find the key of the problem with that order
    const nextKey = Object.keys(problems).find(
      (key) => problems[key].order === nextOrder
    );

    if (nextKey) {
      router.push(`/problems/${nextKey}`);
    } else {
      // If at either end, wrap around
      const wrapOrder = isForward ? 1 : Object.keys(problems).length;
      const wrapKey = Object.keys(problems).find(
        (key) => problems[key].order === wrapOrder
      );
      if (wrapKey) router.push(`/problems/${wrapKey}`);
    }
  };

  return (
    <nav className="relative flex h-[50px] w-full shrink-0 items-center px-5 bg-gray-900 text-gray-700">
      <div
        className={`flex w-full items-center justify-between ${
          !problemPage ? "max-w-[1200px] mx-auto" : ""
        }`}
      >
        {/* Logo - redirects to homepage */}
        <Link href="/">
          <div className="h-[22px] flex-1">
            <img src="/logo-full.png" alt="Logo" className="h-full" />
          </div>
        </Link>

        {/* Show prev/next controls when on a problem page */}
        {problemPage && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2">
            <div
              className="flex items-center justify-center rounded bg-gray-700 hover:bg-gray-600 h-8 w-8 cursor-pointer"
              onClick={() => handleProblemChange(false)}
            >
              <FaChevronLeft className="text-white" />
            </div>
            <Link
              href="/"
              className="flex items-center gap-2 font-semibold text-base max-w-[170px] text-white cursor-pointer"
            >
              <BsList />
              <p>Problem List</p>
            </Link>
            <div
              className="flex items-center justify-center rounded bg-gray-700 hover:bg-gray-600 h-8 w-8 cursor-pointer"
              onClick={() => handleProblemChange(true)}
            >
              <FaChevronRight className="text-white" />
            </div>
          </div>
        )}

        {/* Right-side buttons */}
        <div className="flex items-center space-x-4 flex-1 justify-end">
          {/* Premium link button */}
          <a
            href="https://www.google.com/"
            target="_blank"
            rel="noreferrer"
            className="bg-gray-600 py-1.5 px-3 cursor-pointer rounded text-orange-300 hover:bg-gray-300 border border-black"
          >
            Premium
          </a>
          {problemPage && <Timer />}
          {!user ? (
            <Link
              href="/auth"
              onClick={() =>
                setAuthModalState((prev) => ({
                  ...prev,
                  isOpen: true,
                  type: "login",
                }))
              }
            >
              <button className="bg-gray-600 py-1 px-2 cursor-pointer rounded border border-black hover:bg-gray-300 text-white">
                Sign In
              </button>
            </Link>
          ) : (
            <>
              {/* User avatar with hover email tooltip */}
              <div className="cursor-pointer group relative">
                <Image
                  src="/avatar.png"
                  alt="Avatar"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
                <div
                  className="absolute top-10 left-2/4 -translate-x-2/4 mx-auto bg-gray-800 text-orange-400 p-2 rounded shadow-lg 
                  z-40 group-hover:scale-100 scale-0 
                  transition-all duration-300 ease-in-out"
                >
                  <p className="text-sm">{user.email}</p>
                </div>
              </div>
              <Logout />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Topbar;
