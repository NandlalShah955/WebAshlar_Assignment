import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Collapse, Rate } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { EditOutlined } from "@ant-design/icons";
import { getLessons, deleteLesson ,completeLesson} from "../services/LessonsDataService";
import "../styles/CourseDetails.css";
import moment from 'moment';

const { Panel } = Collapse;

const LessonsCollapse = () => {
  const [lessons, setLessons] = useState([]);
  const [course, setcourse] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { courseid } = location.state || {};

  const getLessonsData = async () => {
    try {
      setLoading(true);
      const response = await getLessons(courseid);
      setLessons(response.data.lessons);
      setcourse(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching lessons data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!courseid) {
      navigate("/");
    } else {
      getLessonsData();
    }
  }, [courseid, navigate]);

  const handleGoLessonEditPage = (lessonid) => {
    navigate("/lessonform", {
      state: { lessonid: lessonid, courseid: courseid },
    });
  };
  const handleAddLesson = () => {
    navigate("/lessonform", {
      state: { courseid: courseid },
    });

  }
  const handleDeleteLesson = async (lessonid) => {
    try {
      // setLoadingDelete(lessonid); 
      await deleteLesson(lessonid);
      // setLoadingDelete(null); 
      getLessonsData();
    } catch (error) {
      console.error("Error deleting course:", error);
      setLoadingDelete(null);
    }
  };
  const handleCompleteLesson = async (lessonid) => {
    const response = await completeLesson(lessonid);
    getLessonsData();
  }
  return (
    <div className="course-details">
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
          <p>Loading Lessons...</p>
        </div>
      ) : (
        <div className="course-container">
          <div className="course-header">
            <div className="course-info">
              <h1 className="course-title">
                {course.title}
              </h1>
              <p className="course-description">{course.description}</p>
              <div className="course-meta">
                <span className="bestseller">Bestseller</span>
                <Rate allowHalf defaultValue={4.5} className="rating" />
                <span className="rating-text">(43,269 ratings) 245,728 students</span>
              </div>
              <p className="course-update">Start Date: {moment(course.start_date, "YYYY-MM-DD").format("DD-MM-YYYY")} • English • Subtitles: Arabic, Hindi, and more</p>
              <p className="course-update">End Date: {moment(course.end_date, "YYYY-MM-DD").format("DD-MM-YYYY")} </p>
            </div>
            <div className="course-pricing">
              <img
                src="https://welloffun-api.aleaspeaks.com/storage/images/umCya4nX5DrV24zvb3B50ifX3D1VpcbVJBHikTwa.jpg"
                alt="Course Preview"
                className="course-image"
              />
            </div>
          </div>

          <div className="course-content">
            <div className="header-with-button">
              <h2 className="section-heading">Lessons</h2>
              <button className="add-lesson-button" onClick={() => handleAddLesson()}>
                Add Lesson
              </button>
            </div>
            {lessons.length === 0 ? (
              <p className="no-lessons-message">No lessons available.</p>
            ) : (
              <Collapse accordion>
                {lessons.map((lesson) => (
                  <Panel
                    key={lesson._id}
                    header={
                      <div className="panel-header">
                        <span>{lesson.title}</span>
                        <div className="icon-container">


                          <EditOutlined
                            className="edit-icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleGoLessonEditPage(lesson._id);
                            }}
                          />
                          <DeleteOutlined
                            className="delete-icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteLesson(lesson._id);
                            }}
                          />
                          <Button
                            className="edit-icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCompleteLesson(lesson._id);
                            }}>
                            {lesson.completed == true ? "Completed" : 'Not Completed'}

                          </Button>
                        </div>
                      </div>
                    }
                  >
                    <p>{lesson.content}</p>
                  </Panel>
                ))}
              </Collapse>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonsCollapse;
