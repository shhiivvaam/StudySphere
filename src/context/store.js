import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "../context/slices/dashboardSlice";
import courseListReducer from "../context/slices/courseListSlice";

export default configureStore({
    reducer: {
        dashboard: dashboardReducer,
        courses: courseListReducer,
    },
});