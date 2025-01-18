import React, { useState, useEffect } from 'react'
import { getCourses } from '../services/CourseDataService'
import "../styles/Homepage.css";
const Homepage = () => {
  const [courses, setcourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const getData = async () => {
    try {
      setLoading(true);
      const response = await getCourses();
      console.log(response);
      setcourses(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching form data:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
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
            <div className="course-card" key={index}>
              <img src={'https://welloffun-api.aleaspeaks.com/storage/images/umCya4nX5DrV24zvb3B50ifX3D1VpcbVJBHikTwa.jpg'} alt={course.title} className="course-image" />
              <h3 className="course-title">{course.title}</h3>
              <p className="course-description">{course.description}</p>
              <p className="course-dates">
                <strong>Start Date:</strong> {course.start_date} <br />
                <strong>End Date:</strong> {course.end_date}
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