import axios from 'axios';
import {Backend_Url} from "../helper";
export const getCourses=async()=>{
try {
    const response=await axios.get('https://fakestoreapi.com/products');
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