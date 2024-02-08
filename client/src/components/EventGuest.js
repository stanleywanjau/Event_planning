import React from 'react';
import { useParams } from 'react-router-dom';

const EventGuest = () => {
  const { event_id, guest_id } = useParams();

  const associateGuestWithEvent = () => {
    fetch(`/event/${event_id}/guest/${guest_id}`, {
      method: 'POST'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to associate guest with event');
        }
        return response.json();
      })
      .then(data => {
        console.log('Guest added to event:', data.message);
        // Optionally, you can perform additional actions after successful association
      })
      .catch(error => {
        console.error('Error associating guest with event:', error);
      });
  };

  return (
    <div>
      <h2>EventGuest Component</h2>
      <button onClick={associateGuestWithEvent}>Associate Guest with Event</button>
    </div>
  );
};

export default EventGuest;
