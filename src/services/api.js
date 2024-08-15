// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Your backend API URL

export const addMentor = (mentorData) => axios.post(`${API_URL}/mentors`, mentorData);
export const addStudent = (studentData) => axios.post(`${API_URL}/students`, studentData);
export const scheduleSession = (sessionData) => axios.post(`${API_URL}/sessions`, sessionData);
export const calculatePayment = (paymentData) => axios.post(`${API_URL}/payment`, paymentData);
