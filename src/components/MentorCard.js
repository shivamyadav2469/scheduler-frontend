import React from 'react';

const MentorCard = ({ mentor }) => {
    return (
        <li key={mentor.id} className="mb-2 p-4 border rounded shadow-sm">
            <h2 className="text-xl font-semibold">{mentor.name}</h2>
            <p>Area of Interest: {mentor.areaOfInterest}</p>
            <p>Premium: {mentor.isPremium ? 'Yes' : 'No'}</p>
        </li>
    );
};

export default MentorCard;
