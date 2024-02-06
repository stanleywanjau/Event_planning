
import React from 'react';
//  my eventdetails for the event details page
const EventDetails = () => {
  
  const selectedEvent = {
    id: 1,
    title: 'eating commpetition',
    details: 'This is a food event.',
    date: '2024-02-13',
    guests: ['Kanini', 'Joe'],
    
  };

  return (
    <div>
      <h2>Event Details</h2>
      <div>
        <strong>Title:</strong> {selectedEvent.title}
      </div>
      <div>
        <strong>Details:</strong> {selectedEvent.details}
      </div>
      <div>
        <strong>Date:</strong> {selectedEvent.date}
      </div>
      <div>
        <strong>Guests:</strong>
        <ul>
          {selectedEvent.guests.map((guest, index) => (
            <li key={index}>{guest}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EventDetails;
