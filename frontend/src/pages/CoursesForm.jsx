import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { Form, Input, DatePicker, Button } from "antd";
import { getLessons } from '../services/LessonsDataService';
import {updateCourse,createCourse} from '../services/CourseDataService';
import moment from 'moment'
import '../styles/CourseForm.css';

const { TextArea } = Input;

const CoursesForm = () => {
  const [form] = Form.useForm();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const { courseid } = location.state || {};

  const getLessonsData = async () => {
    try {
      setLoading(true);
      const response = await getLessons(courseid);
      const courseData = response.data;
      const formattedStartDate = courseData.start_date
      ? moment(courseData.start_date.$d).format("DD-MM-YYYY")
      : null;
    const formattedEndDate = courseData.end_date
      ? moment(courseData.end_date.$d).format("DD-MM-YYYY")
      : null;
      setCourse(response.data);
      setLoading(false);

     
      form.setFieldsValue({
        title: response.data.title,
        imagelink: response.data.imagelink,
        start_date: response.data.start_date ? moment(formattedStartDate, "YYYY-MM-DD") : null,
        end_date: response.data.end_date ? moment(formattedEndDate, "YYYY-MM-DD") : null,
        description: response.data.description,
      });
    } catch (error) {
      console.error("Error fetching lessons data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (courseid) {
      getLessonsData();
    }
  }, [courseid]);

  const onFinish = (values) => {
    const formattedData = {
      ...values,
      start_date: values.start_date ? values.start_date.format("YYYY-MM-DD") : null,
      end_date: values.end_date ? values.end_date.format("YYYY-MM-DD") : null,
    };
    if (courseid) {
      updateCourse({ courseid, payload: formattedData });
    } else {
      createCourse(formattedData);
    }
  };

  return (
    <div className="form-container">
      <h2>{course ? "Edit Course" : "Add Course"}</h2>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        className="responsive-form"
        initialValues={{
          title: course?.title || "",
          imagelink: course?.imagelink || "",
          start_date: course?.start_date ? moment(course.start_date, "YYYY-MM-DD") : null,
          end_date: course?.end_date ? moment(course.end_date, "YYYY-MM-DD") : null,
          description: course?.description || "",
        }}
      >
        <div className="form-row">
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please enter title" }]}
            className="form-item-large"
          >
            <Input placeholder="Enter Title here" />
          </Form.Item>

          <Form.Item
            name="imagelink"
            label="Image Url"
            className="form-item-large"
          >
            <Input placeholder="Enter Image URL" />
          </Form.Item>
        </div>

        <div className="form-row">
          <Form.Item
            name="start_date"
            label="Start Date"
            rules={[{ required: true, message: "Please enter start date" }]}
            className="form-item-large"
          >
            <DatePicker format="DD-MM-YYYY" style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="end_date"
            label="End Date"
            rules={[{ required: true, message: "Please enter end date" }]}
            className="form-item-large"
          >
            <DatePicker format="DD-MM-YYYY" style={{ width: "100%" }} />
          </Form.Item>
        </div>
        <Form.Item
          name="description"
          label="Course Description"
          rules={[{ required: true, message: "Please enter product description" }]}
        >
          <TextArea rows={4} placeholder="Enter Course description" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="submit-button"
            loading={loading}
          >
            {course ? "Update Course" : "Add Course"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CoursesForm;
