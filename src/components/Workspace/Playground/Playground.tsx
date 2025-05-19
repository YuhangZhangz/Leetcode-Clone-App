"use client";
import {useState} from 'react';
import dynamic from 'next/dynamic';
import PreferenceNav from './PreferenceNav/PreferenceNav';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { javascript } from '@codemirror/lang-javascript';
import EditorFooter from './EditorFooter';
import { Problem } from '@/utils/types/problem';
const Split = dynamic(() => import('react-split'), { ssr: false });
const CodeMirror = dynamic(
  () => import('@uiw/react-codemirror').then(mod => mod.default),
  { ssr: false }
);

type PlaygroundProps = {
  problem: Problem;
};

const Playground: React.FC<PlaygroundProps> = ({ problem }) => {
  const [activeTestCaseId, setActiveTestCaseId] = useState<number>(0);
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
            value={problem.starterCode}
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

          
          <div className="flex">
            {/* Test Case Button */}
            {problem.examples.map((example, index) => (
              <div className="mr-2 items-start mt-2 text-white" key={example.id}
              onClick={() => setActiveTestCaseId(index)}
              >
              <div className="flex flex-wrap items-center gap-y-4">
                <div className={`font-medium items-center transition-all focus:outline-none inline-flex bg-neutral-700 hover:bg-neutral-600 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap
                  ${activeTestCaseId === index ? 'text-white' : 'text-gray-500'}
                  `}>
                  Case {index + 1}
                </div>
              </div>
            </div>
            ))}
          </div>

          <div className='font-semibold my-4'>
            <p className='text-sm font-medium mt-4 text-white'>
              Input:
            </p>
            <div className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-neutral-600 border-transparent text-white mt-2'>
              {problem.examples[activeTestCaseId].inputText}
            </div>
            <p className='text-sm font-medium mt-4 text-white'>
              Output:
            </p>
            <div className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-neutral-600 border-transparent text-white mt-2'>
              {problem.examples[activeTestCaseId].outputText}
            </div>
          </div>
        </div>
      </Split>
      <EditorFooter />
    </div>
  );
};

export default Playground;
