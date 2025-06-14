import React, { useState, useEffect } from 'react';
import { getFlights } from '../services/api';

const FlightsList = () => {
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchFlights = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getFlights();
      setFlights(data);
    } catch (err) {
      setError('Failed to fetch flights. Please try again later.');
      console.error('Error fetching flights:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  return (
    <div className="form-section">
      <h3>View All Flights</h3>
      {error && <p className="error">{error}</p>}
      {loading ? (
        <p>Loading flights...</p>
      ) : (
        <>
          <button onClick={fetchFlights}>Refresh Flights</button>          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Source</th>
                <th>Destination</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {flights.map((flight) => (
                <tr key={flight.id}>
                  <td>{flight.date}</td>
                  <td>{flight.source}</td>
                  <td>{flight.destination}</td>
                  <td>{flight.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default FlightsList;
