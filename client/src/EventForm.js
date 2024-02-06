// EventForm.js
import React, { useState } from 'react';

const EventForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = { title, details };
    onSubmit(newEvent); // Pass the new event to the parent component
    // You can also send a request to the backend to create the event
    // and handle the response accordingly
  };

  return (
    <div>
      <h2>Create Event</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <br />
        <label>Details:</label>
        <textarea value={details} onChange={(e) => setDetails(e.target.value)} />
        <br />
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default EventForm;
