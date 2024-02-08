import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GuestList = () => {
  const [guests, setGuests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/guests')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch guests');
        }
        return response.json();
      })
      .then(data => {
        setGuests(data);
      })
      .catch(error => {
        console.error('Error fetching guests:', error);
      });
  }, []);

  const handleGuestClick = (guestname,guestId) => {
    navigate(`/guest/${guestname}/${guestId}`);
  };

  return (
    <div className="guest-list-container">
      <h2>Guest List</h2>
      <ul className="guest-list">
        {guests.map((guest) => (
          <li key={guest.id} className="guest-item" onClick={() => handleGuestClick(guest.name,guest.id)}>
            <span className="guest-name">Name: {guest.name}</span>
            <span className="guest-email">Email: {guest.email}</span>
            <span className="guest-status">Status: {guest.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GuestList;
