import React, { useState } from 'react';
import { addFlight } from '../services/api';

const AddFlightForm = () => {
  const [formData, setFormData] = useState({
    source: '',
    destination: '',
    date: '',
    quantity: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      const response = await addFlight(formData);
      if (response.success) {
        setSuccess(response.message);
        setFormData({
          source: '',
          destination: '',
          date: '',
          quantity: ''
        });
      } else {
        setError(response.error);
      }
    } catch (err) {
      setError('Failed to add flight. Please try again.');
    }
  };

  return (
    <div className="form-section">
      <h3>Add Flight (Admin)</h3>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="source"
          placeholder="Origin" 
          value={formData.source} 
          onChange={handleChange} 
          required 
        /><br />
        <input 
          type="text" 
          name="destination"
          placeholder="Destination" 
          value={formData.destination} 
          onChange={handleChange} 
          required 
        /><br />
        <input 
          type="date"
          name="date" 
          value={formData.date} 
          onChange={handleChange} 
          required 
        /><br />
        <input 
          type="number" 
          name="quantity"
          placeholder="Quantity" 
          value={formData.quantity} 
          onChange={handleChange} 
          required 
        /><br />
        <button type="submit">Add Flight</button>
      </form>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  );
};

export default AddFlightForm;
