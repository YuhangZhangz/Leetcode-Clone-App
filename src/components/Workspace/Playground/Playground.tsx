"use client";
import React from 'react';
import dynamic from 'next/dynamic';
import PreferenceNav from './PreferenceNav/PreferenceNav';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { javascript } from '@codemirror/lang-javascript';
import EditorFooter from './EditorFooter';
const Split = dynamic(() => import('react-split'), { ssr: false });
const CodeMirror = dynamic(
  () => import('@uiw/react-codemirror').then(mod => mod.default),
  { ssr: false }
);

type PlaygroundProps = {};

const Playground: React.FC<PlaygroundProps> = () => {
  return (
    <div className="flex flex-col bg-neutral-800 relative">
      <PreferenceNav />

      <Split
        className="h-[calc(100vh-94px)]"
        direction="vertical"
        sizes={[60, 40]}
        minSize={60}
      >
        <div className="w-full overflow-auto">
          <CodeMirror
            value="const a = 1;"
            theme={vscodeDark}
            extensions={[javascript()]}
            style={{ fontSize: 16 }}
          />
        </div>

        <div className="w-full px-5 overflow-auto">
          {/* Test Case  head*/}
          <div className="flex h-10 items-center space-x-6">
            <div className="relative flex h-full flex-col justify-center cursor-pointer">
              <div className="text-sm font-medium leading-5 text-white">
                Test Case
              </div>
              <hr className="absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white" />
            </div>
          </div>

          {/* Test Case Button */}
          <div className="flex mt-2 space-x-2 text-white">
            {['Case 1', 'Case 2', 'Case 3'].map(label => (
              <div key={label} className="inline-flex items-center gap-y-4">
                <div className="font-medium transition-all focus:outline-none bg-neutral-600 hover:bg-neutral-500 rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap">
                  {label}
                </div>
              </div>
            ))}
          </div>
          <div className='font-semibold my-4'>
            <p className='text-sm font-medium mt-4 text-white'>
              Input:
            </p>
            <div className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-neutral-600 border-transparent text-white mt-2'>
              nums:[2, 7, 11, 15],target: 9
            </div>
            <p className='text-sm font-medium mt-4 text-white'>
              Output:
            </p>
            <div className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-neutral-600 border-transparent text-white mt-2'>
              [0, 1]
            </div>
          </div>
        </div>
      </Split>
      <EditorFooter />
    </div>
  );
};

export default Playground;
