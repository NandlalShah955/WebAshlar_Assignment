import axios from 'axios';
import {Backend_Url} from "../helper";
export const getCourses=async()=>{
try {
    const response=await axios.get(Backend_Url+ 'courses');
    return response.data;
} catch (error) {
    
}
}

export const createCourse=async()=>{

}
export const updateCourse=async()=>{

}
export const deleteCourse=async()=>{

}