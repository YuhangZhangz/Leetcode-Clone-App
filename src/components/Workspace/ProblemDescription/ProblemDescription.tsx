import { useEffect, useState } from 'react';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import { BsCheck2Circle } from 'react-icons/bs';
import { TiStarOutline } from 'react-icons/ti';
import YouTube from 'react-youtube';
import { IoClose } from 'react-icons/io5';
import { DBProblem, Problem } from "@/utils/types/problem";
import { doc, getDoc} from 'firebase/firestore';
import { firestore } from '@/firebase/firebase';
import RectangleSkeleton from '@/components/Skeletons/RectangleSkeleton';
import CircleSkeleton from '@/components/Skeletons/CircleSkeleton';
type ProblemDescriptionProps = {
  problem: Problem;
};

const ProblemDescription: React.FC<ProblemDescriptionProps> = ({ problem }) => {
  const { currentProblem, loading, problemDifficultyClass } = useGetcurrentProblem(problem.id);

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
              <div className="flex-1 mr-2 text-lg text-white font-medium">{problem.title}</div>
            </div>
            {!loading && currentProblem && (
              <div className="flex items-center mt-3">
              <div className={`${problemDifficultyClass} inline-block rounded-[21px] px-2.5 py-1 text-xs font-medium capitalize`}>
                {currentProblem.difficulty}
              </div>
              <div className="rounded p-[3px] ml-4 text-lg text-green-500">
                <BsCheck2Circle />
              </div>
              <div className="flex items-center cursor-pointer hover:bg-gray-600 space-x-1 rounded p-[3px] ml-4 text-lg text-gray-300">
                <AiFillLike />
                <span className="text-xs">{currentProblem.likes}</span>
              </div>
              <div className="flex items-center cursor-pointer hover:bg-gray-600 space-x-1 rounded p-[3px] ml-4 text-lg text-gray-300">
                <AiFillDislike />
                <span className="text-xs">{currentProblem.dislikes}</span>
              </div>
              <div className="cursor-pointer hover:bg-gray-600 rounded p-[3px] ml-4 text-xl text-gray-300">
                <TiStarOutline />
              </div>
            </div>
            )}
            {loading && (
              <div className='mt-3 flex space-x-2'>
                <RectangleSkeleton />
                <CircleSkeleton />
                <RectangleSkeleton />
                <RectangleSkeleton />
                <CircleSkeleton />
              </div>
            )}

            {/* Problem Statement(paragraphs) */}
            <div className="text-white text-sm">
              <div dangerouslySetInnerHTML={{ __html: problem.problemStatement }} />
            </div>

            {/* Examples */}
            <div className="mt-4">
              {/* Example 1 */}
              {problem.examples.map((example, index) => (
                <div key ={example.id}>
                <p className="font-medium text-white">Example {index + 1}:</p>
                {example.img && (<img src={example.img} alt="" className='mt-3'/>)}
                <div className="example-card">
                  <pre>
                    <strong className="text-white">Input:</strong>{example.inputText} 
                    <br />
                    <strong>Output:</strong> {example.outputText}  <br />
                    {
                      example.explanation && (
                        <>
                          <strong>Explanation:</strong> {example.explanation}
                        </>
                      )}
                  </pre>
                </div>
              </div>
              ))}

            </div>

            {/* Constraints */}
            <div className="my-8 pb-2">
              <div className="text-white text-sm font-medium">Constraints:</div>
              <ul className="text-white ml-5 list-disc">
                <div dangerouslySetInnerHTML={{ __html: problem.constraints }} />
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

function useGetcurrentProblem(problemId: string) {
  const [currentProblem, setCurrentProblem] = useState<DBProblem | null>(null);
  const [loading, setLoading] = useState(true);
  const [problemDifficultyClass, setProblemDifficultyClass] = useState<string>('');
  useEffect(() => {
    const getCurrentProblem = async () => {
      setLoading(true);
      const docRef = doc(firestore,"problems", problemId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const problem = docSnap.data();
        setCurrentProblem({id:docSnap.id, ...problem} as DBProblem);
        setProblemDifficultyClass(
          problem.difficulty === 'Easy' ? "bg-teal-700 text-teal-300" :
          problem.difficulty === 'Medium' ? "bg-yellow-700 text-amber-400" :
          "bg-rose-950 text-red-400"
        );
      }
      setLoading(false);
    };
    getCurrentProblem();
  }, [problemId]);
  return { currentProblem, loading, problemDifficultyClass };
}