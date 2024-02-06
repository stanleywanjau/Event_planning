
import React from 'react';

const EventList = ({ events }) => {
  return (
    <div>
      <h2>Event List</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <span>{event.title}</span>
            <span>{event.details}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
