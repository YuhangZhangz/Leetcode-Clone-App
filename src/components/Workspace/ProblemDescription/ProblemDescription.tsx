import { useEffect, useState } from 'react';
import { AiFillLike, AiFillDislike, AiOutlineLoading3Quarters, AiFillStar } from "react-icons/ai";
import { BsCheck2Circle } from 'react-icons/bs';
import { TiStarOutline } from 'react-icons/ti';
import YouTube from 'react-youtube';
import { IoClose } from 'react-icons/io5';
import { DBProblem, Problem } from "@/utils/types/problem";
import { arrayRemove, arrayUnion, doc, getDoc, runTransaction, updateDoc } from "firebase/firestore";
import { auth, firestore } from "@/firebase/firebase";
import RectangleSkeleton from '@/components/Skeletons/RectangleSkeleton';
import CircleSkeleton from '@/components/Skeletons/CircleSkeleton';
import { useAuthState } from "react-firebase-hooks/auth";
import {toast} from "react-toastify"
type ProblemDescriptionProps = {
  problem: Problem;
};

const ProblemDescription: React.FC<ProblemDescriptionProps> = ({ problem }) => {
  const { currentProblem, loading, problemDifficultyClass, setCurrentProblem } = useGetcurrentProblem(problem.id);
	const [user] = useAuthState(auth);
  const [youtubePlayer, setYoutubePlayer] = useState<{ isOpen: boolean; videoId: string }>({ isOpen: false, videoId: '' });
  const closeModal = () => setYoutubePlayer({ isOpen: false, videoId: '' });
  const { liked, disliked, starred, solved, setData } = useGetUsersDataOnProblem(problem.id);
  const [updating, setUpdating] = useState(false);
  const returnUserDataProblemData = async (transaction:any) => {
      const userRef = doc(firestore, "users", user!.uid);
      const problemRef = doc(firestore, "problems", problem.id);
      const userDoc = await transaction.get(userRef);
      const problemDoc = await transaction.get(problemRef);
      return { userDoc, problemDoc, userRef, problemRef };  
  }
  const handleLike = async()=>{
    if(!user){
      toast.error("You must logged in to like the problem",{position:"top-left",theme:"dark"})
      return;
    }
    if(updating) return;
    setUpdating(true);
    await runTransaction(firestore,async(transaction) => {
      const {userDoc, problemDoc, userRef, problemRef} = await returnUserDataProblemData(transaction)

      if(userDoc.exists() && problemDoc.exists()){
        if(liked){
          //remove problem id from user document
          transaction.update(userRef, {
            likeProblem: userDoc.data().likeProblem.filter((id: string) => id !== problem.id)
          });
          transaction.update(problemRef, {
            likes: problemDoc.data().likes - 1
          });

          setCurrentProblem(prev => prev ? {...prev, likes: prev.likes - 1}: null) 
          setData(prev => ({...prev, liked: false}))
        } else if(disliked){

          transaction.update(userRef,{
            likeProblem: [...userDoc.data().likeProblem, problem.id],
            dislikeProblem: userDoc.data().dislikeProblem.filter((id: string) => id !== problem.id)
          })
          transaction.update(problemRef,{
            likes: problemDoc.data().likes + 1,
            dislikes: problemDoc.data().dislikes - 1
          })

          setCurrentProblem(prev => prev ? {...prev, likes: prev.likes + 1, dislikes: prev.dislikes - 1}: null)
          setData(prev => ({...prev, liked: true, disliked: false}))
        } else{
          transaction.update(userRef,{
            likeProblem: [...userDoc.data().likeProblem, problem.id],
          })
          transaction.update(problemRef,{
            likes: problemDoc.data().likes + 1,
          })
          setCurrentProblem(prev => prev ? {...prev, likes: prev.likes + 1}: null)
          setData(prev => ({...prev, liked: true}))
        }
      }

    });
    setUpdating(false);
  };
  const handleDislike = async()=>{
    if(!user){
      toast.error("You must logged in to dislike the problem",{position:"top-left",theme:"dark"})
      return;
    }
    if(updating) return;
    setUpdating(true);
    await runTransaction(firestore,async(transaction) => {
      const {userDoc, problemDoc, userRef, problemRef} = await returnUserDataProblemData(transaction)
      if(userDoc.exists() && problemDoc.exists()){
        if(disliked){
          transaction.update(userRef, {
            dislikeProblem: userDoc.data().dislikeProblem.filter((id: string) => id !== problem.id) 

          })
          transaction.update(problemRef, {
            dislikes: problemDoc.data().dislikes - 1
          });
          setCurrentProblem(prev => prev ? {...prev, dislikes: prev.dislikes - 1}: null)
          setData(prev => ({...prev, disliked: false}))
        } else if(liked){
          transaction.update(userRef,{
            dislikeProblem: [...userDoc.data().dislikeProblem, problem.id],
            likeProblem: userDoc.data().likeProblem.filter((id: string) => id !== problem.id)
          })
          transaction.update(problemRef,{
            dislikes: problemDoc.data().dislikes + 1,
            likes: problemDoc.data().likes - 1
          })
          setCurrentProblem(prev => prev ? {...prev, dislikes: prev.dislikes + 1, likes: prev.likes - 1}: null)
          setData(prev => ({...prev, disliked: true, liked: false}))
        } else{
          transaction.update(userRef,{
            dislikeProblem: [...userDoc.data().dislikeProblem, problem.id],
          })
          transaction.update(problemRef,{
            dislikes: problemDoc.data().dislikes + 1,
          })
          setCurrentProblem(prev => prev ? {...prev, dislikes: prev.dislikes + 1}: null)
          setData(prev => ({...prev, disliked: true}))
        }
      }
    });
    setUpdating(false);
  };
	const handleStar = async () => {
		if (!user) {
			toast.error("You must be logged in to star a problem", { position: "top-left", theme: "dark" });
			return;
		}
		if (updating) return;
		setUpdating(true);

		if (!starred) {
			const userRef = doc(firestore, "users", user.uid);
			await updateDoc(userRef, {
				starredProblems: arrayUnion(problem.id),
			});
			setData((prev) => ({ ...prev, starred: true }));
		} else {
			const userRef = doc(firestore, "users", user.uid);
			await updateDoc(userRef, {
				starredProblems: arrayRemove(problem.id),
			});
			setData((prev) => ({ ...prev, starred: false }));
		}

		setUpdating(false);
	};
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
              {solved && (
                <div className="rounded p-[3px] ml-4 text-lg text-green-500">
                  <BsCheck2Circle />
                </div>
              )

              }
              <div className="flex items-center cursor-pointer hover:bg-gray-600 space-x-1 rounded p-[3px] ml-4 text-lg text-gray-300"
                onClick={handleLike}
              >
                {liked && !updating && <AiFillLike className='text-blue-500'/>}
                {!liked && !updating && <AiFillLike />}
                {updating && <AiOutlineLoading3Quarters className='animate-spin'/>}
                <span className="text-xs">{currentProblem.likes}</span>
              </div>
              <div className="flex items-center cursor-pointer hover:bg-gray-600 space-x-1 rounded p-[3px] ml-4 text-lg text-gray-300"
                onClick={handleDislike} >
                {disliked && !updating && <AiFillDislike className='text-blue-500'/>}
                {!disliked && !updating && <AiFillDislike />}
                {updating && <AiOutlineLoading3Quarters className='animate-spin'/>}
                <span className="text-xs">{currentProblem.dislikes}</span>
              </div>
              <div className="cursor-pointer hover:bg-gray-600 rounded p-[3px] ml-4 text-xl text-gray-300"
              onClick={handleStar}
              >
                {starred && !updating && <AiFillStar className='text-yellow-400'/>}
                {!starred && !updating && <TiStarOutline />}
                {updating && <AiOutlineLoading3Quarters className='animate-spin'/>}
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
  return { currentProblem, loading, problemDifficultyClass, setCurrentProblem };
}

function useGetUsersDataOnProblem(problemId: string) {
	const [data, setData] = useState({ liked: false, disliked: false, starred: false, solved: false });
	const [user] = useAuthState(auth);

	useEffect(() => {
		const getUsersDataOnProblem = async () => {
			const userRef = doc(firestore, "users", user!.uid);
			const userSnap = await getDoc(userRef);
			if (userSnap.exists()) {
				const data = userSnap.data();
				const { solvedProblem, likeProblem, dislikeProblem, starredProblem } = data;
				setData({
					liked: likeProblem.includes(problemId), // likedProblems["two-sum","jump-game"]
					disliked: dislikeProblem.includes(problemId),
					starred: starredProblem.includes(problemId),
					solved: solvedProblem.includes(problemId),
				});
			}
		};

		if (user) getUsersDataOnProblem();
		return () => setData({ liked: false, disliked: false, starred: false, solved: false });
	}, [problemId, user]);

	return { ...data, setData };
}