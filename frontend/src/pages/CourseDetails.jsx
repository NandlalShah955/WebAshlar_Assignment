import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Collapse, Spin, Rate } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { EditOutlined } from "@ant-design/icons";
import { getLessons, deleteLesson } from "../services/LessonsDataService";
import "../styles/CourseDetails.css";

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
    getLessonsData();
  }, []);

  const handleGoLessonEditPage = (lessonid) => {
    navigate("/lessonform", {
      state: { lessonid: lessonid, courseid: courseid },
    });
  };
  const handleAddLesson = ()=>{
    navigate("/lessonform", {
      state: {courseid: courseid },
    });
   
  }
  const handleDeleteLesson = async (lessonid) => {
    console.log("lessonid", lessonid);
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

  return (
    <div className="course-details">
      {loading ? (
        <Spin size="large" />
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
              <p className="course-update">Start Date: ${course.start_date} • English • Subtitles: Arabic, Hindi, and more</p>
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
              <button
                className="add-lesson-button"
                onClick={() => handleAddLesson()}
              >
                Add Lesson
              </button>
            </div>
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
                      </div>
                    </div>
                  }
                >
                  <p>{lesson.content}</p>
                </Panel>
              ))}
            </Collapse>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonsCollapse;
