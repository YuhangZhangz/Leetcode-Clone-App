import ProblemTable from "@/components/ProblemTable/ProblemTable";
import Topbar from "@/components/Topbar/Topbar";

export default function Home() {
  return (
    <>
      <main className="bg-[#202124] min-h-screen"> 
        <Topbar />
        <h1
          className="text-2xl text-center text-gray-300 font-medium uppercase mt-10 mb-5"
        >
          &ldquo; Every problem. Every step. Every win. &rdquo; 👇
        </h1>

        <div className="relative overflow-x-auto mx-auto px-6 pb-10">
          <table className="text-sm text-left text-gray-400 sm:w-7/12 w-full max-w-[1200px] mx-auto">
            <thead className="text-xs text-gray-400 uppercase border-b border-gray-700">
              <tr>
                <th scope="col" className="px-1 py-3 w-0 font-medium">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 w-0 font-medium">
                  Title
                </th>
                <th scope="col" className="px-6 py-3 w-0 font-medium">
                  Difficulty
                </th>
                <th scope="col" className="px-6 py-3 w-0 font-medium">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 w-0 font-medium">
                  Solution
                </th>
              </tr>
            </thead>
            <ProblemTable />
          </table>
        </div>
      </main>
    </>
  );
}
