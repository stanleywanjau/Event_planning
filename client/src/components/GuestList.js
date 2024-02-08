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

  const create_guest = () => {
    navigate(`/createguest`);
  };

  const handleDeleteGuest = (guestId) => {
    if (window.confirm('Are you sure you want to delete this guest?')) {
      fetch(`/guest/${guestId}`, {
        method: 'DELETE',
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to delete guest');
          }
          // Remove the deleted guest from the guests state
          setGuests(guests.filter(guest => guest.id !== guestId));
        })
        .catch(error => {
          console.error('Error deleting guest:', error);
        });
    }
  };

  return (
    <div className="guest-list-container">
      <h2>Guest List</h2>
      <button onClick={create_guest}>add guest</button>
      <ul className="guest-list">
        {guests.map((guest) => (
          <li key={guest.id} className="guest-item" >
            <span className="guest-name">Name: {guest.name}</span>
            <span className="guest-email">Email: {guest.email}</span>
            <span className="guest-status">Status: {guest.status}</span>
            <button onClick={() => handleGuestClick(guest.name,guest.id)}>view details</button>
            <button onClick={() => handleDeleteGuest(guest.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GuestList;
