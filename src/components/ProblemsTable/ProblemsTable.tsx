import { problems } from "@/mockProblems/problem";
import Link from "next/link";
import React, { useState } from "react";
import { AiFillYoutube } from "react-icons/ai";
import { BsCheckCircle } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import YouTube from "react-youtube";

type ProblemsTableProps = {};

const ProblemsTable: React.FC<ProblemsTableProps> = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null);

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
        {problems.map((doc, idx) => {
          const difficultyColor =
            doc.difficulty === "Easy"
              ? "text-green-500"
              : doc.difficulty === "Medium"
              ? "text-yellow-500"
              : "text-pink-500";

          return (
            <tr
              key={doc.id}
              className={`${idx % 2 === 1 ? "bg-gray-800" : ""}`}
            >
              {/* Status icon */}
              <td className="px-2 py-4 font-medium whitespace-nowrap text-green-500">
                <BsCheckCircle fontSize="18" />
              </td>

              {/* Title with link */}
              <td className="px-6 py-4">
                <Link
                  className="hover:text-blue-600 cursor-pointer"
                  href={`/problems/${doc.id}`}
                >
                  {doc.title}
                </Link>
              </td>

              {/* Difficulty with dynamic color */}
              <td className={`px-6 py-4 ${difficultyColor}`}>
                {doc.difficulty}
              </td>

              {/* Category */}
              <td className="px-6 py-4">{doc.category}</td>

              {/* Solution link or placeholder */}
              <td className="px-6 py-4">
                {doc.videoId && doc.videoId.length > 0 ? (
                  <AiFillYoutube
                    fontSize={30}
                    className="cursor-pointer hover:text-red-600"
                    onClick={() => handleOpenModal(doc.videoId!)}
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
