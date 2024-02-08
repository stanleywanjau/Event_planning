import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/events")
      .then(r => r.json())
      .then(data => setEvents(data))
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  const handleDeleteEvent = (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      fetch(`/event/${eventId}`, {
        method: 'DELETE',
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to delete event');
          }
          // Remove the deleted event from the events state
          setEvents(events.filter(event => event.id !== eventId));
        })
        .catch(error => console.error('Error deleting event:', error));
    }
  };

  const navigateToEventDetails = (eventTitle, eventId) => {
    navigate(`/event/${eventTitle}/${eventId}`);
  };

  return (
    <div className="event-list-container">
      <h2>Event List</h2>
      <ul className="event-list">
        {events.map((event) => (
          <li key={event.id} className="event-item" onClick={() => navigateToEventDetails(event.title, event.id)}>
            <span>{event.title}</span>
            <span>{event.location}</span>
            <span>{event.date}</span>
            <button className="delete-button" onClick={(e) => { e.stopPropagation(); handleDeleteEvent(event.id); }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
