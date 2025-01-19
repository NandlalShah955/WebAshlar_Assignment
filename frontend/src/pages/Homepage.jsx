import React, { useState, useEffect } from "react";
import { getCourses, deleteCourse } from "../services/CourseDataService";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Swal from "sweetalert2";
import "../styles/Homepage.css";

const Homepage = () => {
  const [courses, setcourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getCourses();
      console.log(response.data);
      setcourses(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching form data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleGoCourseDetailpage = (courseid) => {
    navigate("/coursesdetails", {
      state: { courseid: courseid },
    });
  };

  const handleGoCourseEditPage = (courseid) => {
    navigate("/coursesform", {
      state: { courseid: courseid },
    });
  };

  const handleDelete = async (courseid) => {
    Swal.fire({
      title: "Are you sure you want to delete this course?",
      showDenyButton: true,
      icon: "warning",
      confirmButtonText: "Yes",
      denyButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        const response = deleteCourse(courseid);
        if (response) {
          Swal.fire({
            title: "Your Course is Deleted Successfully ",
            icon: "success",
          });
          getData();
        }else if(response.error){
            Swal.fire({
                title: response.error.data.message,
                icon: "error",
                confirmButtonText: 'OK'
            });
            return;
        }
      } else if (result.isDenied) {
        Swal.fire({
          title: "Your Course is safe!",
          icon: "info",
          confirmButtonText: "OK",
        });
      }
    });
   
  };

  return (
    <>
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
          <p>Loading courses...</p>
        </div>
      ) : courses.length === 0 ? (
        <div className="no-courses-message">
          <h1>No course available</h1>
          <p>You can add course on Course Management Section</p>
        </div>
      ) : (
        <div className="courses-container">
          {courses.map((course) => (
            <div className="course-card" key={course._id}>
              <img
                src={
                  course.image
                    ? course.image
                    : "https://welloffun.aleaspeaks.com/static/media/featureimg2.ba6c32d4531e50b4f159.png"
                }
                alt={course.title}
                className="course-image"
                onClick={() => handleGoCourseDetailpage(course._id)}
              />
              <h3 className="course-title">{course.title}</h3>
              <p className="course-description">{course.description}</p>
              <p className="course-dates">
                <strong>Start Date:</strong>{" "}
                {moment(course.start_date, "YYYY-MM-DD").format("DD-MM-YYYY")}{" "}
                <br />
                <strong>End Date:</strong>{" "}
                {moment(course.end_date, "YYYY-MM-DD").format("DD-MM-YYYY")}
              </p>
              <div className="course-buttons">
                <button
                  className="btn edit-btn"
                  onClick={() => handleGoCourseEditPage(course._id)}
                >
                  Edit
                </button>
                <button
                  className="btn delete-btn"
                  onClick={() => handleDelete(course._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Homepage;
