import axios from 'axios';
import {Backend_Url} from "../helper.js";
export const getLessons=async(courseid)=>{
    try {
        const response =await axios.get(`${Backend_Url}courses/${courseid}/lessons`);
        return response.data;
    } catch (error) {
        return error.message;
    }
}
export const createLesson=async({courseid,payload})=>{
    try {
        const response =await axios.post(`${Backend_Url}courses/${courseid}/lessons`,payload);
        return response.data;
    } catch (error) {
        return error.message;
    }
}
export const updateLesson=async({lessonid,payload})=>{
    try {
        console.log('lessonid in service', lessonid,payload)
        const response =await axios.put(`${Backend_Url}lessons/${lessonid}`,payload);
        return response.data;
    } catch (error) {
        return error.message;
    }
}
export const deleteLesson=async(lessonid)=>{
    try {
        const response =await axios.delete(`${Backend_Url}lessons/${lessonid}`);
        return response.data;
    } catch (error) {
        return error.message;
    }
}