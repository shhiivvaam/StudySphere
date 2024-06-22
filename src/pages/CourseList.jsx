import { useDispatch, useSelector } from "react-redux";
import ListCard from "../components/ListCard";
import Nav from "../components/Nav";
import { useEffect } from "react";
import {
    updateCourseList,
    updateError,
    updateFilters,
    updateIsLoading,
} from "../context/slices/courseListSlice";
import Spinner from "../components/Spinner";

// const URL = // TODO : base API Link
function CourseList() {
    const data = useSelector((state) => state.courses.filters);
    const isLoading = useSelector((state) => state.courses.isLoading);
    console.log(isLoading);

    const disptach = useDispatch();

    useEffect(() => {
        async function fetchData() {
            disptach(updateIsLoading(true));

            try {
                const response = await fetch(URL);
                if (!response.ok) {
                    throw new Error("Failed to Fetch");
                }
                const result = await response.json();
                disptach(updateCourseList(result.courseModule));
                disptach(updateFilters(result.courseModule));
            } catch (error) {
                disptach(updateError(error));
            } finally {
                disptach(updateIsLoading(false));
            }
        }
        fetchData();
    }, []);

    return (
        <>
            {isLoading ? (
                <Spinner />
            ) : (
                <div className="flex flex-col items-center justify-center max-w-[1200px] ">
                    <div className="fixed top-0 bg-slate-200 z-10">
                        <Nav
                            link="/dashboard"
                            title="Dashboard"
                            type={"courseDetailPage"}
                        />
                    </div>
                    <div className="mt-[7rem] sm:flex sm:flex-wrap justify-center items-center gap-5 ">
                        {data?.map((curCourse) => (
                            <ListCard key={curCourse.id} curCourse={curCourse} />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}

export default CourseList;