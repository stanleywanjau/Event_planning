import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EventList from './EventList'; 
import EventDetails from './EventDetails';
import EventForm from './EventForm'; 
import Login from './Auth/Login'; 
import Register from './Auth/Register'; 

const App = () => {
  const [events, setEvents] = useState([]); // manage events state
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    
    setLoggedIn(true);
  };

  const handleLogout = () => {
    
    setLoggedIn(false);
  };

  const handleCreateEvent = (newEvent) => {
    
    setEvents([...events, newEvent]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" exact>
          <EventList events={events} />
        </Route>
        <Route path="/events/:eventId">
          <EventDetails />
        </Route>
        <Route path="/create-event">
          {loggedIn ? <EventForm onSubmit={handleCreateEvent} /> : <Login onLogin={handleLogin} />}
        </Route>
        <Route path="/login">
          <Login onLogin={handleLogin} />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/logout">
          <Logout onLogout={handleLogout} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
