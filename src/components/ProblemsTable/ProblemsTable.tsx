import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsCheckCircle } from "react-icons/bs";
import { AiFillYoutube } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import YouTube from "react-youtube";
import { collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore";
import { auth, firestore } from "@/firebase/firebase";
import { DBProblem } from "@/utils/types/problem";
import { useAuthState } from "react-firebase-hooks/auth";
type ProblemsTableProps = {
  setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProblemsTable: React.FC<ProblemsTableProps> = ({ setLoadingProblems }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null);
  const problems = useGetProblems(setLoadingProblems);
  const solvedProblem = useGetsolvedProblem();
  console.log("solvedProblem", solvedProblem)
  const handleOpenModal = (videoId: string) => {
    setCurrentVideoId(videoId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentVideoId(null);
  };

  return (
    <>
      <tbody className="text-white">
        {problems.map((problem, idx) => {
          const difficultyColor =
            problem.difficulty === "Easy"
              ? "text-green-500"
              : problem.difficulty === "Medium"
              ? "text-yellow-500"
              : "text-pink-500";

          return (
            <tr
              key={problem.id}
              className={`${idx % 2 === 1 ? "bg-gray-800" : ""}`}
            >
              {/* Status icon */}
              <td className="px-2 py-4 font-medium whitespace-nowrap text-green-500">
                {solvedProblem.includes(problem.id) && <BsCheckCircle fontSize="18" />}
              </td>

              {/* Title with link */}
              <td className="px-6 py-4">
                {problem.link ? (
                <Link href={problem.link} className="hover:text-blue-600 cursor-pointer" target="_blank">
                  {problem.title}
                  </Link>
                
                ):(
                  <Link
                  className="hover:text-blue-600 cursor-pointer"
                  href={`/problems/${problem.id}`}
                >
                  {problem.title}
                </Link>
                )}
              </td>

              {/* Difficulty with dynamic color */}
              <td className={`px-6 py-4 ${difficultyColor}`}>
                {problem.difficulty}
              </td>

              {/* Category */}
              <td className="px-6 py-4">{problem.category}</td>

              {/* Solution link or placeholder */}
              <td className="px-6 py-4">
                {problem.videoId && problem.videoId.length > 0 ? (
                  <AiFillYoutube
                    fontSize={30}
                    className="cursor-pointer hover:text-red-600"
                    onClick={() => handleOpenModal(problem.videoId!)}
                  />
                ) : (
                  <p className="text-gray-400">No Video Available</p>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>

      {/* Modal */}
      {showModal && currentVideoId && (
        <div className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center z-50">
          {/* Overlay background */}
          <div
            className="bg-black opacity-70 absolute top-0 left-0 w-screen h-screen"
            onClick={handleCloseModal}
          ></div>

          {/* Modal wrapper */}
          <div className="w-full z-50 h-full px-6 relative max-w-4xl flex items-center justify-center">
            <div className="w-full relative">
              {/* Close icon */}
              <IoClose
                fontSize={35}
                className="cursor-pointer absolute -top-16 right-0 text-white"
                onClick={handleCloseModal}
              />

              {/* YouTube player */}
              <YouTube
                videoId={currentVideoId}
                loading="lazy"
                iframeClassName="w-full min-h-[500px]"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProblemsTable;


function useGetProblems(setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>) {
  const [problems, setProblems] = useState<DBProblem[]>([]);
  useEffect(() => {
    const getProblems = async () => {
      setLoadingProblems(true);
      const q = query(collection(firestore, "problems"), orderBy("order", "asc"));
      const querySnapshot = await getDocs(q);
      const tmp: DBProblem[] = [];

      querySnapshot.forEach((doc) => {
        tmp.push({id:doc.id, ...doc.data()} as DBProblem);
      });
      setProblems(tmp);
      setLoadingProblems(false);
      
    };

    getProblems();
  }, [setLoadingProblems]);
  // Return the problems array
  return problems;
}

function useGetsolvedProblem() {
	const [solvedProblem, setsolvedProblem] = useState<string[]>([]);
	const [user] = useAuthState(auth);

	useEffect(() => {
		const getsolvedProblem = async () => {
			const userRef = doc(firestore, "users", user!.uid);
			const userDoc = await getDoc(userRef);

			if (userDoc.exists()) {
				setsolvedProblem(userDoc.data().solvedProblem);
			}
		};

		if (user) getsolvedProblem();
		if (!user) setsolvedProblem([]);
	}, [user]);

	return solvedProblem;
}
