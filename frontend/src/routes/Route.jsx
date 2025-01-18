import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Courses from "../pages/Courses";
import CourseDetails from "../pages/CourseDetails";

const AppRoute = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/coursesdetails" element={<CourseDetails />} />
                
            </Routes>
        </>
    );
};

export default AppRoute;