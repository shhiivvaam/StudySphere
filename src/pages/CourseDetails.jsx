import { useDispatch, useSelector } from "react-redux";
import Nav from "../components/Nav";
import { useNavigate } from "react-router-dom";
import { addStudentCourseDetails } from "../context/slices/dashboardSlice";
import AccordionItem from "../components/AccordianTab"
import course from "../assets/images/course.png"; // Replace with your actual image URL

function CourseDetails() {
    const navigate = useNavigate();
    const data = useSelector((state) => state.courses.selectedCourse);
    const studentCourseDetails = useSelector(
        (state) => state.dashboard.studentCourseDetails
    );
    const {
        name,
        instructor,
        description,
        enrollmentStatus,
        duration,
        schedule,
        location,
        prerequisites,
        syllabus,
    } = data;

    const dispatch = useDispatch();

    function handleEnroll() {
        dispatch(addStudentCourseDetails(data));
    }

    const isEnrolled = studentCourseDetails.some(
        (course) => course.id === data.id
    );

    const spanStyles = "font-semibold block tracking-wide";

    return (
        <div className="min-h-screen bg-gray-100">
            <Nav link={"/dashboard"} title={"Dashboard"} type={"courseDetailPage"} />

            <div className="container mx-auto px-4 py-8 md:py-5">
                {/* <button onClick={() => navigate(-1)}>back</button> */}
                <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="max-w-md">
                        <div className="container mx-auto px-4 py-8 md:py-12">
                            <button
                                onClick={() => navigate(-1)}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
                            >
                                Back
                            </button>
                        </div>
                        <img src={course} alt="Course" className="w-full rounded-lg shadow-md mb-4" />
                        <div className="flex justify-center">
                            {!isEnrolled && enrollmentStatus !== "Closed" ? (
                                <button
                                    className="px-5 py-2 bg-red-500 text-white text-lg font-semibold rounded-md w-full md:w-auto"
                                    onClick={handleEnroll}
                                >
                                    + Enroll
                                </button>
                            ) : (
                                <button
                                    className={`px-5 py-2 ${enrollmentStatus === "Closed" ? "bg-gray-400 text-slate-600 cursor-not-allowed" : "bg-green-500 text-white"} text-lg font-semibold rounded-md w-full md:w-auto`}
                                    disabled={enrollmentStatus === "Closed"}
                                >
                                    {enrollmentStatus === "Closed" ? "Closed 😪" : "Enrolled"}
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="flex-1">
                        <h1 className="text-3xl md:text-5xl font-bold mb-4">{name}</h1>
                        <p className="text-gray-600 mb-2">
                            <span className="font-bold">Instructor:</span> {instructor}
                        </p>
                        <p className="text-gray-600 mb-2">
                            <span className={spanStyles}>Description:</span> {description}
                        </p>
                        <p className="text-gray-600 mb-2">
                            <span className={spanStyles}>Duration:</span> {duration}
                        </p>
                        <p className="text-gray-600 mb-2">
                            <span className={spanStyles}>Schedule:</span> {schedule}
                        </p>
                        <p className="text-gray-600 mb-2">
                            <span className={spanStyles}>Location:</span> {location}
                        </p>
                        <p className="text-gray-600 mb-2">
                            <span className={spanStyles}>Prerequisites:</span>{" "}
                            {prerequisites.map((data, index) => (
                                <span key={index} className="block">
                                    {data}
                                </span>
                            ))}
                        </p>
                        <div className="mt-4 flex justify-between items-center">
                            <span className="px-3 py-1 bg-slate-500 text-white rounded-md">
                                {duration}
                            </span>
                            <span
                                className={`px-3 py-1 rounded-md text-white ${enrollmentStatus === "Open" ? "bg-green-500" : "bg-red-500"}`}
                            >
                                {enrollmentStatus}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mt-12">
                    <h2 className="text-3xl font-bold mb-4 text-center">Syllabus</h2>
                    <div className="divide-y">
                        {syllabus.map(({ week, topic, content }) => (
                            <AccordionItem
                                key={week}
                                week={week}
                                topic={topic}
                                content={content}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div >
    );
}

export default CourseDetails;
