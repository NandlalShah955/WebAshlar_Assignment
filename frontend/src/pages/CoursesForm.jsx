import React from 'react';
import { Form, Input, Select, DatePicker, InputNumber, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import '../styles/CourseForm.css';
const { TextArea } = Input;
const CoursesForm = () => {
 
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Form Submitted:', values);
  };

 

  return (
    <div className="form-container">
    <h2>Add Course</h2>
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
      className="responsive-form"
    >
      {/* Row with 3 inputs */}
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
          <Input placeholder="Enter Image url" />
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
          rules={[{ required: true, message: "Please enter item name" }]}
          className="form-item-large"
        >
           <DatePicker format="DD-MM-YYYY" style={{ width: "100%" }} />
        </Form.Item>
      </div>


      {/* Product Description */}
      <Form.Item
        name="description"
        label="Course Description"
        rules={[{ required: true, message: "Please enter product description" }]}
      >
        <TextArea rows={4} placeholder="Enter Course description" />
      </Form.Item>

      {/* Submit Button */}
      <Form.Item>
        <Button type="primary" htmlType="submit" className="submit-button">
          Add Course
        </Button>
      </Form.Item>
    </Form>
  </div>
  )
}

export default CoursesForm
