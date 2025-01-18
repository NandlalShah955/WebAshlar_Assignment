import axios from 'axios';
import {Backend_Url} from "../helper.js";
export const getLessons=async(id)=>{
    try {
        const response =await axios.get(`${Backend_Url}courses/${id}/lessons`);
        return response.data;
    } catch (error) {
        return error.message;
    }
}