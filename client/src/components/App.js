import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import EventList from './EventList'; // Corrected import path
import EventDetails from './EventDetails'; // Corrected import path
import EventForm from './EventForm'; // Corrected import path
import Login from './Auth/Login'; // Adjusted import path
import Register from './Auth/Register'; // Adjusted import path

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
      <Switch>
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
      </Switch>
    </Router>
  );
};

export default App;
