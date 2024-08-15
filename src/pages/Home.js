import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home = () => {
    const [duration, setDuration] = useState(30);
    const [isPremium, setIsPremium] = useState(false);
    const [amount, setAmount] = useState(null);
    const [mentors, setMentors] = useState([]);
    const [selectedMentor, setSelectedMentor] = useState(null);
    const [availableSlots, setAvailableSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Fetch mentors when the component mounts
    useEffect(() => {
        const fetchMentors = async () => {
            try {
                const response = await axios.get('http://localhost:3000/mentors');
                setMentors(response.data);
            } catch (error) {
                console.error('Failed to fetch mentors', error);
                setError('Failed to fetch mentors');
            }
        };
        fetchMentors();
    }, []);

    // Fetch available slots when a mentor is selected
    useEffect(() => {
        if (selectedMentor) {
            const fetchAvailableSlots = async () => {
                try {
                    const response = await axios.get(`http://localhost:3000/slots/${selectedMentor}`);
                    if (response.data.length === 0) {
                        console.warn('No slots available for the selected mentor');
                        setError('No slots available for the selected mentor');
                        setAvailableSlots([]);
                    } else {
                        setAvailableSlots(response.data);
                        setError(null);  // Clear any previous error
                    }
                } catch (error) {
                    if (error.response && error.response.status === 404) {
                        console.error('Slots not found for the selected mentor');
                        setError('Slots not found for the selected mentor');
                    } else {
                        console.error('Failed to fetch available slots', error);
                        setError('Failed to fetch available slots');
                    }
                    setAvailableSlots([]);
                }
            };
            fetchAvailableSlots();
        } else {
            setAvailableSlots([]);
        }
    }, [selectedMentor]);

    // Handle payment generation
    const handlePayment = async () => {
        if (!selectedSlot) {
            alert('Please select a time slot.');
            return;
        }
        try {
            const response = await axios.post('http://localhost:3000/payment', {
                duration,
                isPremium,
                mentorId: selectedMentor,
                slot: selectedSlot,
            });
            setAmount(response.data.amount);
            navigate('/payment', { state: { duration, isPremium, amount: response.data.amount } });
        } catch (error) {
            console.error('Payment failed', error);
            setError('Payment failed');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-gray-100 flex flex-col items-center justify-center p-6">
            <Navbar />
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
                <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Schedule a Session</h1>

                {error && <div className="mb-6 text-red-500">{error}</div>}

                <div className="mb-6">
                    <label className="block text-lg font-medium mb-2 text-gray-700">Select Mentor:</label>
                    <select
                        value={selectedMentor || ''}
                        onChange={(e) => setSelectedMentor(e.target.value)}
                        className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select a Mentor</option>
                        {mentors.map((mentor) => (
                            <option key={mentor.id} value={mentor.id}>
                                {mentor.name} ({mentor.areaOfInterest})
                            </option>
                        ))}
                    </select>
                </div>

                {selectedMentor && availableSlots.length > 0 && (
                    <div className="mb-6">
                        <label className="block text-lg font-medium mb-2 text-gray-700">Available Slots:</label>
                        <select
                            value={selectedSlot || ''}
                            onChange={(e) => setSelectedSlot(e.target.value)}
                            className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select a Slot</option>
                            {availableSlots.map((slot) => (
                                <option key={slot.id} value={slot.id}>
                                    {slot.time}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                <div className="mb-6">
                    <label className="block text-lg font-medium mb-2 text-gray-700">Duration:</label>
                    <select
                        value={duration}
                        onChange={(e) => setDuration(Number(e.target.value))}
                        className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value={30}>30 minutes</option>
                        <option value={45}>45 minutes</option>
                        <option value={60}>60 minutes</option>
                    </select>
                </div>

                <div className="mb-6 flex items-center">
                    <input
                        type="checkbox"
                        checked={isPremium}
                        onChange={() => setIsPremium(!isPremium)}
                        className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <label className="ml-3 text-lg font-medium text-gray-700">Premium Service</label>
                </div>

                <button
                    onClick={handlePayment}
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Generate Payment
                </button>

                {amount && <div className="mt-4 text-2xl font-semibold text-gray-800">Total Amount: ₹{amount}</div>}
            </div>
        </div>
    );
};

export default Home;
