import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { getLessons, updateLesson, createLesson } from "../services/LessonsDataService";
import "../styles/LessonForm.css";
import Swal from 'sweetalert2';
const { TextArea } = Input;

const LessonForm = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { lessonid, courseid } = location.state || {};

  const getLesson = async () => {
    try {
      setLoading(true);
      const response = await getLessons(courseid);
      const lessons = response.data.lessons;
      const lesson = lessons.find((lesson) => lesson._id === lessonid);

      if (lesson) {
        form.setFieldsValue({
          title: lesson.title,
          content: lesson.content,
        });
      }
    } catch (error) {
      console.error("Error fetching lessons data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!courseid) {
      navigate("/");
    } else if (lessonid) {
      getLesson();
    }
  }, [lessonid]);

  const onFinish = (values) => {
    if (lessonid) {
      updateLesson({ lessonid, payload: values }).then((res) => {
        Swal.fire({
          title: res.message,
          icon: "success",
          draggable: true
        });
      }).catch((err) => {
        Swal.fire({
          title: err.data.message,
          icon: "error",
          draggable: true
        });
      })
    } else {
      createLesson({ courseid, payload: values }).then((res) => {
        Swal.fire({
          title: res.message,
          icon: "success",
          draggable: true
        });
        form.setFieldsValue({
          title: '',
          content: '',
        });
      }).catch((err) => {
        Swal.fire({
          title: err.data.message,
          icon: "error",
          draggable: true
        });

      })
    }
  };
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <div className="form-container">
      <button className="back-button" onClick={() => handleGoBack()}>Back</button>
      <h2>{lessonid ? "Edit Lesson" : "Add Lesson"}</h2>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        className="responsive-form"
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please enter Lesson title" }]}
        >
          <Input placeholder="Enter Lesson Title " />
        </Form.Item>

        <Form.Item
          name="content"
          label="Lesson Content"
          rules={[{ required: true, message: "Please enter Lesson Content" }]}
        >
          <TextArea rows={4} placeholder="Enter Lesson Content" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="submit-button"
            loading={loading}
          >
            {lessonid ? "Update Lesson" : "Add Lesson"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LessonForm;
