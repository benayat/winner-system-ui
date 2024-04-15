import axios from 'axios';
import {API_BASE_ADDRESS} from "../constants";

export const instance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || API_BASE_ADDRESS,
    withCredentials: true
});
