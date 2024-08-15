import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import MentorCard from '../components/MentorCard';

const MentorList = () => {
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

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-gray-100 flex flex-col items-center p-6">
            <Navbar />
            <div className="container mx-auto p-4">
                <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Mentor List</h1>
                <ul>
                    {mentors.map(mentor => (
                        <MentorCard key={mentor.id} mentor={mentor} />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MentorList;




