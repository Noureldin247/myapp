import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Registrationform from './Components/Registrationform';
import LoginForm from './Components/LoginForm';
import AddFlightForm from './Components/AddFlightForm';
import FlightsList from './Components/FlightsList';
import NavBar from './Components/NavBar';
import Destinations from './Components/Destinations';
import DestinationDetails from './Components/DestinationDetails';
import Wishlist from './Components/Wishlist';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setIsAdmin(userData.isAdmin);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  return (
    <Router>
      <div className="App">
        <NavBar isAuthenticated={isAuthenticated} isAdmin={isAdmin} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Destinations isAuthenticated={isAuthenticated} />} />
          <Route 
            path="/login" 
            element={
              !isAuthenticated ? (
                <LoginForm onLoginSuccess={handleLogin} />
              ) : (
                <Navigate to="/" />
              )
            } 
          />
          <Route 
            path="/register" 
            element={
              !isAuthenticated ? (
                <Registrationform />
              ) : (
                <Navigate to="/" />
              )
            } 
          />
          <Route path="/destination/:id" element={<DestinationDetails isAuthenticated={isAuthenticated} />} />
          <Route 
            path="/wishlist" 
            element={
              isAuthenticated ? (
                <Wishlist />
              ) : (
                <Navigate to="/login" state={{ from: window.location.pathname }} />
              )
            } 
          />
          <Route 
            path="/flights" 
            element={
              isAuthenticated ? (
                <FlightsList />
              ) : (
                <Navigate to="/login" state={{ from: window.location.pathname }} />
              )
            } 
          />
          <Route 
            path="/add-flight" 
            element={
              isAuthenticated && isAdmin ? (
                <AddFlightForm />
              ) : (
                <Navigate to="/" />
              )
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
