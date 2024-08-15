import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const StudentProfile = () => {
    const [name, setName] = useState('');
    const [areaOfInterest, setAreaOfInterest] = useState('');
    const [preferredMentorId, setPreferredMentorId] = useState(null);
    const [mentors, setMentors] = useState([]);

    useEffect(() => {
        const fetchMentors = async () => {
            try {
                const response = await axios.get('http://localhost:3000/mentors');
                setMentors(response.data);
            } catch (error) {
                console.error('Failed to fetch mentors', error);
            }
        };
        fetchMentors();
    }, []);

    const handleSubmit = async () => {
        try {
            await axios.post('http://localhost:3000/students', { name, areaOfInterest, preferredMentorId });
            alert('Student profile created successfully');
        } catch (error) {
            console.error('Failed to create student profile', error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-gray-100 flex flex-col items-center p-6">
            <Navbar />
            <div className="container mx-auto p-6 max-w-lg bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">Student Profile</h1>
                
                <div className="mb-4">
                    <label className="block mb-2 text-lg font-medium text-gray-700">Name:</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        className="p-2 border border-gray-300 rounded-lg w-full"
                    />
                </div>
                
                <div className="mb-4">
                    <label className="block mb-2 text-lg font-medium text-gray-700">Area of Interest:</label>
                    <input 
                        type="text" 
                        value={areaOfInterest} 
                        onChange={(e) => setAreaOfInterest(e.target.value)} 
                        className="p-2 border border-gray-300 rounded-lg w-full"
                    />
                </div>
                
                <div className="mb-4">
                    <label className="block mb-2 text-lg font-medium text-gray-700">Preferred Mentor (optional):</label>
                    <select 
                        value={preferredMentorId || ''} 
                        onChange={(e) => setPreferredMentorId(Number(e.target.value))} 
                        className="p-2 border border-gray-300 rounded-lg w-full"
                    >
                        <option value="">Select a Mentor</option>
                        {mentors.map(mentor => (
                            <option key={mentor.id} value={mentor.id}>{mentor.name}</option>
                        ))}
                    </select>
                </div>
                
                <button 
                    onClick={handleSubmit} 
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    Save Profile
                </button>
            </div>
        </div>
    );
};

export default StudentProfile;
