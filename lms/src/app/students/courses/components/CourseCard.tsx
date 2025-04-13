import { ICourse } from "@/store/courses/types";


function CourseCard({course}:{course:ICourse}) {
  return (
    <div>
      <div className="max-w-md mt-3 bg-gray-900 shadow-lg rounded-2xl">
        <div className="px-6 py-5">
          <div className="flex items-start">
            <div className="flex-grow truncate">
              <div className="w-full sm:flex justify-between items-center mb-3">
                <h2 className="text-2xl leading-snug font-extrabold text-gray-50 truncate mb-1 sm:mb-0">
                  {course?.title}
                </h2>
              </div>
              <span className="bg-red-500 px-2 py-0.5 font-semibold text-sm rounded-lg text-white">
                Open
              </span>
             
              <div className="flex items-end justify-between whitespace-normal">
                <div className="max-w-md text-indigo-100">
                  <p className="mb-2">
                    {course?.description.substring(0,80)}...
                  </p>
                </div>
              </div>
              <div className="flex items-center  ml-4">
                <div className="flex gap-4  items-center mr-4">
                  <button className="cursor-pointer ">
                    <svg
                      width="48px"
                      height="48px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15 11L12 8M12 8L9 11M12 8V16M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                        stroke="#fff"
                        strokeWidth={1}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <span className="text-white">0</span>
                  <button className="cursor-pointer">
                    <svg
                      width="48px"
                      height="48px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 13L12 16M12 16L15 13M12 16V8M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                        stroke="#fff"
                        strokeWidth={1}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
                <span className="text-sm text-gray-400">
                 {course?.duration}
                </span>
              </div>
            </div>
           
          </div>
        </div>
      </div>
      {"}"}
    </div>
  );
}

export default CourseCard;
