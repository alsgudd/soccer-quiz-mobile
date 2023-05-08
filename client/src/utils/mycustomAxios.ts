import axios, { AxiosInstance } from 'axios';

const mycustomAxios: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
})

export default mycustomAxios;
