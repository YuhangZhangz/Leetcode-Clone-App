import React, { useState } from 'react';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import { BsCheck2Circle } from 'react-icons/bs';
import { TiStarOutline } from 'react-icons/ti';
import YouTube from 'react-youtube';
import { IoClose } from 'react-icons/io5';

type ProblemDescriptionProps = {};

const ProblemDescription: React.FC<ProblemDescriptionProps> = () => {
  const [youtubePlayer, setYoutubePlayer] = useState<{ isOpen: boolean; videoId: string }>({ isOpen: false, videoId: '' });
  const closeModal = () => setYoutubePlayer({ isOpen: false, videoId: '' });

  return (
    <div className="bg-neutral-800">
      {/* TAB */}
      <div className="flex h-11 w-full items-center pt-2 bg-gray-700 text-white overflow-x-hidden">
        <div className="bg-gray-800 rounded-t-[5px] px-5 py-[10px] text-xs cursor-pointer">
          Description
        </div>
      </div>

      <div className="flex px-0 py-4 h-[calc(100vh-94px)] overflow-y-auto">
        <div className="px-5">
          {/* Problem heading */}
          <div className="w-full">
            <div className="flex space-x-4">
              <div className="flex-1 mr-2 text-lg text-white font-medium">1. Two Sum</div>
            </div>
            <div className="flex items-center mt-3">
              <div className="text-green-500 inline-block rounded-[21px] bg-green-100 px-2.5 py-1 text-xs font-medium capitalize">
                Easy
              </div>
              <div className="rounded p-[3px] ml-4 text-lg text-green-500">
                <BsCheck2Circle />
              </div>
              <div className="flex items-center cursor-pointer hover:bg-gray-600 space-x-1 rounded p-[3px] ml-4 text-lg text-gray-300">
                <AiFillLike />
                <span className="text-xs">120</span>
              </div>
              <div className="flex items-center cursor-pointer hover:bg-gray-600 space-x-1 rounded p-[3px] ml-4 text-lg text-gray-300">
                <AiFillDislike />
                <span className="text-xs">2</span>
              </div>
              <div className="cursor-pointer hover:bg-gray-600 rounded p-[3px] ml-4 text-xl text-gray-300">
                <TiStarOutline />
              </div>
            </div>

            {/* Problem Statement(paragraphs) */}
            <div className="text-white text-sm">
              <p className="mt-3">
                Given an array of integers <code>nums</code> and an integer <code>target</code>, return
                <em>indices of the two numbers such that they add up to</em> <code>target</code>.
              </p>
              <p className="mt-3">
                You may assume that each input would have <strong>exactly one solution</strong>, and you
                may not use the same element twice.
              </p>
              <p className="mt-3">You can return the answer in any order.</p>
            </div>

            {/* Examples */}
            <div className="mt-4">
              {/* Example 1 */}
              <div>
                <p className="font-medium text-white">Example 1:</p>
                <div className="example-card">
                  <pre>
                    <strong className="text-white">Input:</strong> nums = [2,7,11,15], target = 9
                    <br />
                    <strong>Output:</strong> [0,1] <br />
                    <strong>Explanation:</strong> Because nums[0] + nums[1] == 9, we return [0, 1].
                  </pre>
                </div>
              </div>

              {/* Example 2 */}
              <div>
                <p className="font-medium text-white">Example 2:</p>
                <div className="example-card">
                  <pre>
                    <strong className="text-white">Input:</strong> nums = [3,2,4], target = 6
                    <br />
                    <strong>Output:</strong> [1,2] <br />
                    <strong>Explanation:</strong> Because nums[1] + nums[2] == 6, we return [1, 2].
                  </pre>
                </div>
              </div>
              {/* Example 3 */}
              <div>
                <p className="font-medium text-white">Example 3:</p>
                <div className="example-card">
                  <pre>
                    <strong className="text-white">Input:</strong> nums = [3,3], target = 6
                    <br />
                    <strong>Output:</strong> [0,1] <br />
                  </pre>
                </div>
              </div>
            </div>

            {/* Constraints */}
            <div className="my-5">
              <div className="text-white text-sm font-medium">Constraints:</div>
              <ul className="text-white ml-5 list-disc">
                <li className="mt-2">
                  <code>2 ≤ nums.length ≤ 10</code>
                </li>

                <li className="mt-2">
                  <code>-10 ≤ nums[i] ≤ 10</code>
                </li>
                <li className="mt-2">
                  <code>-10 ≤ target ≤ 10</code>
                </li>
                <li className="mt-2 text-sm">
                  <strong>Only one valid answer exists.</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {youtubePlayer.isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black opacity-70" onClick={closeModal} />
          {/* Modal content */}
          <div className="relative bg-white p-4 rounded-lg max-w-2xl w-full">
            <IoClose
              fontSize={24}
              className="absolute top-2 right-2 cursor-pointer"
              onClick={closeModal}
            />
            <YouTube videoId={youtubePlayer.videoId} loading="lazy" iframeClassName="w-full h-64" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProblemDescription;
