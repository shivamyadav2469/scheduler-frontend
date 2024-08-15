// src/components/StudentForm.js
import React, { useState } from 'react';
import { addStudent, scheduleSession, calculatePayment } from '../services/api';
import MentorList from './MentorList';

const StudentForm = () => {
    const [name, setName] = useState('');
    const [areaOfInterest, setAreaOfInterest] = useState('');
    const [preferredMentor, setPreferredMentor] = useState(null);
    const [duration, setDuration] = useState(30);
    const [startTime, setStartTime] = useState('');
    const [payment, setPayment] = useState(null);

    const handleSubmit = async () => {
        // Add student
        const studentResponse = await addStudent({ name, areaOfInterest, preferredMentorId: preferredMentor?.id });
        const studentId = studentResponse.data.id;

        // Schedule session
        const sessionResponse = await scheduleSession({ studentId, mentorId: preferredMentor?.id, duration, startTime });

        // Calculate payment
        const paymentResponse = await calculatePayment({ duration, isPremium: preferredMentor?.isPremium });
        setPayment(paymentResponse.data);

        // Handle payment display or processing
    };

    return (
        <div>
            <h2>Student Registration</h2>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="Area of Interest" value={areaOfInterest} onChange={(e) => setAreaOfInterest(e.target.value)} />
            
            <MentorList setSelectedMentor={setPreferredMentor} />

            <select value={duration} onChange={(e) => setDuration(Number(e.target.value))}>
                <option value={30}>30 mins</option>
                <option value={45}>45 mins</option>
                <option value={60}>60 mins</option>
            </select>

            <input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} />

            <button onClick={handleSubmit}>Schedule</button>

            {payment && <div>Payment: {payment.amount}</div>}
        </div>
    );
};

export default StudentForm;
