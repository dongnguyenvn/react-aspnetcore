import axios from "axios";

export const Axios = axios.create({
    baseURL : 'https://localhost:5001/api/'
})