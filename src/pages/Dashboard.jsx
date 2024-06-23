import { useSelector } from "react-redux";
import ListCard from "../components/ListCard";
import Nav from "../components/Nav";

function Dashboard() {
    const studentCourseDetails = useSelector(
        (state) => state.dashboard.studentCourseDetails
    );

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="fixed top-0 w-full bg-slate-200 z-10">
                <Nav link={"/"} title={"All Courses"} />
            </div>
            <div className="container mx-auto py-10 px-4">
                <h1 className="text-3xl font-bold text-center mt-8">Dashboard</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {studentCourseDetails.map((curCourse) => (
                        <ListCard
                            key={curCourse.id}
                            curCourse={curCourse}
                            type={"dashboard"}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
