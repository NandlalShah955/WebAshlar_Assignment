import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Form, Input, Button, Row, Col } from "antd";
import { getLessons, updateLesson, createLesson } from "../services/LessonsDataService";
import "../styles/LessonForm.css";
const { TextArea } = Input;

const LessonForm = () => {
  const [form] = Form.useForm();
  const location = useLocation();
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
    if (lessonid) {
      getLesson();
    }
  }, [lessonid]);

  const onFinish = (values) => {
    console.log("values", values);
    if (lessonid) {
      updateLesson({ lessonid, payload: values });
    } else {
      createLesson({ courseid, payload: values });
    }
  };

  return (
    <div className="form-container">
      <h2>{lessonid ? "Edit Lesson" : "Add Lesson"}</h2>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        className="responsive-form"
      >
        {/* Title Field */}
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please enter title" }]}
        >
          <Input placeholder="Enter Title here" />
        </Form.Item>

        {/* Content Field */}
        <Form.Item
          name="content"
          label="Lesson Content"
          rules={[{ required: true, message: "Please enter Lesson Content" }]}
        >
          <TextArea rows={4} placeholder="Enter Lesson Content" />
        </Form.Item>

        {/* Submit Button */}
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
