import React from 'react';

const SlotList = ({ slots }) => {
  return (
    <div>
      <h2>Available Slots</h2>
      {slots.length > 0 ? (
        <ul>
          {slots.map(slot => (
            <li key={slot.id}>
              {new Date(slot.startTime).toLocaleString()} - {new Date(slot.endTime).toLocaleString()}
            </li>
          ))}
        </ul>
      ) : (
        <p>No available slots</p>
      )}
    </div>
  );
};

export default SlotList;
