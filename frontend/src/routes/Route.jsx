import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "../pages/Homepage";
import CoursesForm from "../pages/CoursesForm";
import CourseDetails from "../pages/CourseDetails";

const AppRoute = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/coursesform" element={<CoursesForm />} />
                <Route path="/coursesdetails" element={<CourseDetails />} />
                
            </Routes>
        </>
    );
};

export default AppRoute;