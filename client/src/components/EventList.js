import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/events")
      .then((r) => r.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  function handleDeleteEvent(eventId) {
    if (window.confirm("Are you sure you want to delete this event?")) {
      fetch(`/event/${eventId}`, {
        method: "DELETE",
      }).then((r) => {
        if (r.ok) {
          setEvents((events) => events.filter((event) => event.id !== eventId));
        }
      });
    }
  }

  const navigateToEventDetails = (eventTitle, eventId) => {
    navigate(`/event/${eventTitle}/${eventId}`);
  };
  const create_event = () => {
    navigate(`/create-event`);
  };

  return (
    <div className="event-list-container">
      <h2>Event List</h2>
      <ul className="event-list">
        <button onClick={create_event}>add event</button>
        {events.map((event) => (
          <li key={event.id} className="event-item">
            <span>{event.title}</span>
            <span>{event.location}</span>
            <span>{event.date}</span>
            <button
              onClick={() => navigateToEventDetails(event.title, event.id)}
            >
              view details
            </button>
            <button
              className="delete-button"
              onClick={(e) => {
                handleDeleteEvent(event.id);
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
