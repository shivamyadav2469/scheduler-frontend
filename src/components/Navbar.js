import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="mb-8 w-full max-w-lg mx-auto">
            <ul className="flex justify-around">
                <li>
                    <Link to="/" className="text-blue-600 hover:text-blue-800 font-semibold">Home</Link>
                </li>
                <li>
                    <Link to="/mentors" className="text-blue-600 hover:text-blue-800 font-semibold">Mentor List</Link>
                </li>
                <li>
                    <Link to="/student-profile" className="text-blue-600 hover:text-blue-800 font-semibold">Student Profile</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
