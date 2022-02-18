import axios from 'axios';

const API = axios.create( { baseURL : 'http://localhost:5000/api'});

export const uploadFile = (formData) => API.post('/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
export const downloadFile = (id) => API.get(`/download/${id}`, { responseType: 'blob' });
