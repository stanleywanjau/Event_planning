import {   Route, Routes } from 'react-router-dom';
import EventList from './EventList'; 
import EventDetails from './EventDetails';
import EventForm from './EventForm';
import GuestList from './GuestList';
import GuestDetails from './GuestDetails'; 
import Navbar from './Navbar';
import GuestForm from './GuestForm';


const App = () => {
  // manage events state


  

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" exact
          element={<EventList />}>
        </Route>
        <Route path="/event/:event/:id"
          element={<EventDetails />}>
        </Route>
        <Route path="/create-event"
          element={<EventForm />}>
        </Route>
        <Route path="/guests"
          element={<GuestList />}>
        </Route>
        <Route path="/guest/:guestname/:id"
          element={<GuestDetails />}>
        </Route>
        <Route path="/createguest"
          element={<GuestForm />}>
        </Route>
      </Routes>
      </>
    
  );
};

export default App;
