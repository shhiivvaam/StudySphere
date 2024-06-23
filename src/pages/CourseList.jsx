import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
    updateCourseList,
    updateError,
    updateFilters,
    updateIsLoading,
} from "../context/slices/courseListSlice";
import Spinner from "../components/Spinner";
import Nav from "../components/Nav";
import ListCard from "../components/ListCard";

import courseData from "../data/data.json";

function CourseList() {
    const dispatch = useDispatch();
    const filters = useSelector((state) => state.courses.filters);
    const isLoading = useSelector((state) => state.courses.isLoading);

    useEffect(() => {
        async function fetchData() {
            dispatch(updateIsLoading(true));

            try {
                // const response = await fetch(URL);
                // if (!response.ok) {
                //     throw new Error("Failed to fetch data");
                // }
                // const result = await response.json();
                const result = courseData;
                dispatch(updateCourseList(result.courseModule));
                dispatch(updateFilters(result.courseModule));
            } catch (error) {
                dispatch(updateError(error.message));
            } finally {
                dispatch(updateIsLoading(false));
            }
        }

        fetchData();
    }, [dispatch]);

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="fixed top-0 w-full bg-blue-500 z-10 shadow-md">
                <Nav link="/dashboard" title="Dashboard" type="courseDetailPage" />
            </div>

            {isLoading ? (
                <Spinner />
            ) : (
                <div className="container mx-auto py-8 px-4 mt-8">
                    <h1 className="text-3xl font-bold text-center mt-8">Select Courses</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filters.map((curCourse) => (
                            <ListCard key={curCourse.id} curCourse={curCourse} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default CourseList;
