// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import EventList from './components/EventList';
import EventDetails from './components/EventDetails';
import EventForm from './components/EventForm';
import { Login, Register, Logout } from './components/Auth/Auth';

const App = () => {
  const [events, setEvents] = useState([]); // manage events state
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    // Implement logic for user login
    setLoggedIn(true);
  };

  const handleLogout = () => {
    // Implement logic for user logout
    setLoggedIn(false);
  };

  const handleCreateEvent = (newEvent) => {
    // Add the new event to the local state
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
