import React from 'react';
import { BsChevronUp } from 'react-icons/bs';

type EditorFooterProps = {
  handleSubmit: () => void;
};

const EditorFooter: React.FC<EditorFooterProps> = ({ handleSubmit }) => {
  return (
    <div className="flex bg-neutral-800 absolute bottom-0 z-10 w-full">
      <div className="mx-5 my-[10px] flex justify-between w-full">
        <div className="mr-2 flex flex-1 flex-nowrap items-center space-x-4">
          <button className="px-3 py-1.5 font-medium items-center transition-all inline-flex bg-neutral-700 text-sm hover:bg-neutral-600 text-neutral-400 rounded-lg">
            Console
            <div className="ml-1 transform transition flex items-center">
              <BsChevronUp className="fill-gray-600 mx-1" />
            </div>
          </button>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <button className="px-3 py-1.5 text-sm font-medium items-center whitespace-nowrap transition-all focus:outline-none inline-flex bg-neutral-700 hover:bg-neutral-600 text-neutral-400 rounded-lg">
            Run
          </button>
          <button
            className="px-3 py-1.5 font-medium items-center transition-all focus:outline-none inline-flex text-sm text-white bg-green-600 hover:bg-green-400 rounded-lg"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditorFooter;
