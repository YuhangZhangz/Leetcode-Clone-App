"use client";
import React from 'react';
import { AiOutlineFullscreen, AiOutlineSetting } from 'react-icons/ai';

type PreferenceNavProps = {};

const PreferenceNav: React.FC<PreferenceNavProps> = () => {
  return (
    <div className="flex items-center justify-between bg-gray-700 h-11 w-full">
      <div className="flex items-center text-white">
        <button className="flex cursor-pointer items-center rounded focus:outline-none bg-gray-800 text-gray-300 hover:bg-gray-600 px-2 py-1.5 font-medium">
          <div className="flex items-center px-1">
            <div className="text-xs text-gray-300">JavaScript</div>
          </div>
        </button>
      </div>

      <div className="flex items-center m-2 space-x-2">
        <button className="relative group p-2 rounded hover:bg-gray-600">
          <AiOutlineSetting className="h-4 w-4 text-gray-400" />
          <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 whitespace-no-wrap bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
            Settings
          </div>
        </button>

        <button className="relative group p-2 rounded hover:bg-gray-600">
          <AiOutlineFullscreen className="h-4 w-4 text-gray-400" />
          <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 whitespace-no-wrap bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
            Full Screen
          </div>
        </button>
      </div>
    </div>
  );
};

export default PreferenceNav;
