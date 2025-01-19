import axios from 'axios';
import { Backend_Url } from "../helper";
export const getCourses = async () => {
    try {
        const response = await axios.get(Backend_Url + 'courses');
        return response.data;
    } catch (error) {
        return error.message
    }
}

export const createCourse = async (payload) => {
try {
    const response = await axios.post(`${Backend_Url}courses`, payload); 
    return response.data;
} catch (error) {
    return error.message;
}
}
export const updateCourse = async ({courseid,payload}) => {
  try {
    const response = await axios.put(`${Backend_Url}courses/${courseid}`, payload);
    return response.data;
  } catch (error) {
    return error.message;
  }
}
export const deleteCourse = async (courseid) => {
    try {
        const response = await axios.delete(`${Backend_Url}courses/${courseid}`);
        return response.data;
    } catch (error) {
        return error.message;
    }
}