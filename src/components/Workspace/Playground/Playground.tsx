"use client";

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import PreferenceNav from './PreferenceNav/PreferenceNav';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { javascript } from '@codemirror/lang-javascript';
import EditorFooter from './EditorFooter';
import { Problem } from '@/utils/types/problem';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '@/firebase/firebase';
import { toast } from 'react-toastify';
import { problems } from '@/utils/problems';
import { useRouter } from 'next/router';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import useLocalStorage from '@/hooks/useLocalStorage';

const Split = dynamic(() => import('react-split'), { ssr: false });
const CodeMirror = dynamic(
  () => import('@uiw/react-codemirror').then(mod => mod.default),
  { ssr: false }
);

export interface ISettings {
  fontSize: string;
  settingModalIsOpen: boolean;
  dropdownIsOpen: boolean;
}

type PlaygroundProps = {
  problem: Problem;
  setSucess: React.Dispatch<React.SetStateAction<boolean>>;
  setSolved: React.Dispatch<React.SetStateAction<boolean>>;
};

const Playground: React.FC<PlaygroundProps> = ({ problem, setSucess, setSolved }) => {
  const [activeTestCaseId, setActiveTestCaseId] = useState<number>(0);
  const [userCode, setUserCode] = useState<string>(problem.starterCode);

  const [fontSize] = useLocalStorage("lcc-fontSize", "16px");
  const [settings, setSettings] = useState<ISettings>({
    fontSize,
    settingModalIsOpen: false,
    dropdownIsOpen: false,
  });

  const [user] = useAuthState(auth);
  const { query: { pid } } = useRouter();

  const handleSubmit = async () => {
    if (!user) {
      toast.error("Please login to submit your code", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark"
      });
      return;
    }

    try {
      const code = userCode.slice(userCode.indexOf(problem.starterFunctionName));
      const cb = new Function(`return ${code}`)();
      const handler = problems[pid as string].handlerFunction;

      if (typeof handler === "function") {
        const success = handler(cb);
        if (success) {
          toast.success("Your code is correct!", {
            position: "top-center",
            autoClose: 3000,
            theme: "dark"
          });
          setSucess(true);
          setTimeout(() => setSucess(false), 4000);

          const userRef = doc(firestore, "users", user.uid);
          await updateDoc(userRef, {
            solvedProblem: arrayUnion(pid),
          });
          setSolved(true);
        }
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      if (message.startsWith("AssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal:")) {
        toast.error("Opss! One or more test cases failed", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark"
        });
      } else {
        toast.error(message, {
          position: "top-center",
          autoClose: 3000,
          theme: "dark"
        });
      }
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem(`code-${pid}`);
    setUserCode(user && saved ? JSON.parse(saved) : problem.starterCode);
  }, [pid, user, problem.starterCode]);

  const onChange = (value: string) => {
    setUserCode(value);
    localStorage.setItem(`code-${pid}`, JSON.stringify(value));
  };

  return (
    <div className="flex flex-col bg-neutral-800 relative">
      <PreferenceNav settings={settings} setSettings={setSettings} />
      <Split className="h-[calc(100vh-94px)]" direction="vertical" sizes={[60, 40]} minSize={60}>
        <div className="w-full overflow-auto">
          <CodeMirror
            value={userCode}
            theme={vscodeDark}
            onChange={onChange}
            extensions={[javascript()]}
            style={{ fontSize: settings.fontSize }}
          />
        </div>
        <div className="w-full px-5 overflow-auto">
          <div className="flex h-10 items-center space-x-6">
            <div className="relative flex h-full flex-col justify-center cursor-pointer">
              <div className="text-sm font-medium leading-5 text-white">Test Case</div>
              <hr className="absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white" />
            </div>
          </div>
          <div className="flex">
            {problem.examples.map((example, index) => (
              <div
                key={example.id}
                className="mr-2 items-start mt-2 text-white"
                onClick={() => setActiveTestCaseId(index)}
              >
                <div
                  className={`font-medium items-center transition-all focus:outline-none inline-flex bg-neutral-700 hover:bg-neutral-600 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap ${
                    activeTestCaseId === index ? 'text-white' : 'text-gray-500'
                  }`}
                >
                  Case {index + 1}
                </div>
              </div>
            ))}
          </div>
          <div className="font-semibold my-4">
            <p className="text-sm font-medium mt-4 text-white">Input:</p>
            <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-neutral-600 border-transparent text-white mt-2">
              {problem.examples[activeTestCaseId].inputText}
            </div>
            <p className="text-sm font-medium mt-4 text-white">Output:</p>
            <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-neutral-600 border-transparent text-white mt-2">
              {problem.examples[activeTestCaseId].outputText}
            </div>
          </div>
        </div>
      </Split>
      <EditorFooter handleSubmit={handleSubmit} />
    </div>
  );
};

export default Playground;
