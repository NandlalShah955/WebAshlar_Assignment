import React, { useState, useEffect } from 'react'
import { getCourses } from '../services/CourseDataService'
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Homepage.css";
const Homepage = () => {
  const [courses, setcourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }
  const getData = async () => {
    try {
      setLoading(true);
      const response = await getCourses();
      setcourses(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching form data:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleGoCourseDetailpage = (courseid) => {
    navigate("/coursesdetails",{
      state: {courseid: courseid },
    });
  };

  return (
    <>
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
          <p>Loading courses...</p>
        </div>
      ) : (
        <div className="courses-container">
          {courses.map((course, index) => (
            <div className="course-card" key={index} onClick={()=>handleGoCourseDetailpage(course._id)}>
              <img src={'https://welloffun-api.aleaspeaks.com/storage/images/umCya4nX5DrV24zvb3B50ifX3D1VpcbVJBHikTwa.jpg'} alt={course.title} className="course-image" />
              <h3 className="course-title">{course.title}</h3>
              <p className="course-description">{course.description}</p>
              <p className="course-dates">
                <strong>Start Date:</strong> {formatDate(course.start_date)} <br />
                <strong>End Date:</strong> {formatDate(course.end_date)}
              </p>
              <div className="course-buttons">
                <button
                  className="btn edit-btn"
                  onClick={() => onEdit(course.id)}
                >
                  Edit
                </button>
                <button
                  className="btn delete-btn"
                  onClick={() => onDelete(course.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default Homepage