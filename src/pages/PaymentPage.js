import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';

const PaymentPage = () => {
    const location = useLocation();
    const { duration, isPremium, amount } = location.state || {};

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-gray-100 flex flex-col items-center p-6">
            <Navbar />
            <div className="container mx-auto p-6 max-w-lg bg-white rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Payment Summary</h1>
                
                <p className="text-lg mb-4"><strong>Duration:</strong> {duration} minutes</p>
                <p className="text-lg mb-4"><strong>Premium Service:</strong> {isPremium ? 'Yes' : 'No'}</p>
                <p className="text-lg font-semibold"><strong>Total Amount:</strong> ₹{amount}</p>
            </div>
        </div>
    );
};

export default PaymentPage;
