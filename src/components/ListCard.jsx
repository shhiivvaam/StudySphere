import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateSelectedCourse } from "../context/slices/courseListSlice";
import ProgressBar from "./ProgressBar";
import { updateCourseCompletion } from "../context/slices/dashboardSlice";
import course from "../assets/images/course.png"; // Replace with your actual image URL

function ListCard({ curCourse, type }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        id,
        name,
        instructor,
        description,
        enrollmentStatus,
        duration,
        courseComplete,
    } = curCourse;

    const handleOnClick = () => {
        dispatch(updateSelectedCourse(curCourse));
        navigate("/course-details");
    };

    const handleDashboardCourseClick = () => {
        dispatch(updateCourseCompletion(id));
    };

    return (
        <div className="w-full sm:w-72 mx-auto mt-10 p-4 sm:mt-8 border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out"
            onClick={handleOnClick}>
            <div className="flex flex-col items-center">
                <div className="w-full h-40 overflow-hidden rounded-t-lg">
                    <img
                        src={course}
                        alt="Course Thumbnail"
                        className="object-cover w-full h-full"
                    />
                </div>
                <div className="mt-4 flex flex-col items-center w-full">
                    <h2 className="text-xl font-semibold mb-1">{name}</h2>
                    <p className="text-gray-500 text-sm mb-2">{instructor}</p>
                    <p className="text-gray-600 text-sm text-center">{description}</p>
                    {type !== "dashboard" ? (
                        <div className="mt-4 w-full flex items-center justify-between">
                            <span className={`px-3 py-1 rounded-md text-white ${enrollmentStatus === "Open" ? "bg-green-500" : "bg-red-500"}`}>
                                {enrollmentStatus}
                            </span>
                            <span className="px-3 py-1 rounded-md bg-gray-400 text-white">
                                {duration}
                            </span>
                            <button
                                className="px-4 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none"
                                onClick={handleOnClick}
                            >
                                Details
                            </button>
                        </div>
                    ) : (
                        <div className="mt-4 w-full flex flex-col items-center">
                            <p className="text-gray-600">
                                <span className="font-semibold">Due in:</span> {duration}
                            </p>
                            <ProgressBar courseCompleted={courseComplete} />
                            {courseComplete ? (
                                <button
                                    className="px-4 py-1 mt-2 rounded-md bg-green-500 text-white"
                                    disabled
                                >
                                    Completed 😍
                                </button>
                            ) : (
                                <button
                                    className="px-4 py-1 mt-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none"
                                    onClick={handleDashboardCourseClick}
                                >
                                    Complete the Course
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ListCard;
