import Link from "next/link";
import React from "react";

type TopbarProps = {};

const Topbar: React.FC<TopbarProps> = () => {
  return (
    <nav className="relative flex h-[50px] w-full shrink-0 items-center px-5 bg-gray-900 text-gray-700">
      <div className="flex w-full items-center justify-between max-w-[1200px] mx-auto">
        
        {/* Logo - redirects to homepage */}
        <Link href="/">
          <div className="h-[22px] flex-1">
            <img src="/logo-full.png" alt="Logo" className="h-full" />
          </div>
        </Link>

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

          {/* Sign In button leading to auth page */}
          <Link href="/auth">
            <button className="bg-gray-600 py-1 px-2 cursor-pointer rounded border border-black hover:bg-gray-300 text-white">
              Sign In
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Topbar;
