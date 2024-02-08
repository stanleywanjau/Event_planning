import React, { useState } from 'react';

const GuestForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('invited');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form fields
    if (!name || !email) {
      alert('Name and email are required fields');
      return;
    }

    // Construct guest object
    const guestData = {
      name: name,
      email: email,
      status: status
    };

    // Send POST request to create guest
    fetch('/guests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(guestData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to create guest');
        }
        return response.json();
      })
      .then(data => {
        console.log('Guest created successfully:', data);
        // Optionally, you can reset form fields after successful submission
        setName('');
        setEmail('');
        setStatus('invited');
      })
      .catch(error => {
        console.error('Error creating guest:', error);
      });
  };

  return (
    <div className="form-container">
    <h2>Add Guest</h2>
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Status:
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="invited">Invited</option>
          <option value="confirmed">Confirmed</option>
          <option value="declined">Declined</option>
        </select>
      </label>
      <button type="submit">Add Guest</button>
    </form>
  </div>

  );
};

export default GuestForm;
