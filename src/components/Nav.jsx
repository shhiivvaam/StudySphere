import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { updateFilters } from "../context/slices/courseListSlice";

function Nav({ link, title, type }) {
    const data = useSelector((state) => state.courses.courseList);
    const dispatch = useDispatch();

    const [searchInput, setSearchInput] = useState("");

    const filterCourses = (input) => {
        const userInputLowerCase = input.toLowerCase().trim();
        const searchTerms = userInputLowerCase
            .split(",")
            .map((term) => term.trim());
        if (input === "") {
            return data;
        }

        const filteredCourses = data.filter((course) => {
            return searchTerms.every(
                (term) =>
                    course.name.toLowerCase().includes(term) ||
                    course.instructor.toLowerCase().includes(term) ||
                    course.description.toLowerCase().includes(term) ||
                    course.duration.toLowerCase().includes(term)
            );
        });

        return filteredCourses;
    };

    const handleInputChange = (event) => {
        const input = event.target.value;
        setSearchInput(input);
        const filteredResults = filterCourses(input);
        dispatch(updateFilters(filteredResults));
    };

    return (
        <div className="bg-white shadow-md">
            <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                <div className="text-xl sm:text-2xl font-bold text-blue-600 mr-4">
                    <NavLink to="/StudySphere">StudySphere</NavLink>
                </div>
                {type === "courseDetailPage" && (
                    <div className="flex items-center flex-1 ml-1 sm:ml-0">
                        🔎
                        <input
                            type="text"
                            className="w-full py-2 px-3 focus:outline-none border border-gray-300 rounded-full transition-all duration-300"
                            placeholder="Search courses..."
                            value={searchInput}
                            onChange={handleInputChange}
                        />
                    </div>
                )}
                <div className="text-lg font-semibold ml-2">
                    <NavLink
                        to={link}
                        className="text-blue-600 hover:text-blue-700 transition-colors duration-300"
                    >
                        {title}
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default Nav;
