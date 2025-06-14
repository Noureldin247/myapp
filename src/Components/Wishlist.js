import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Wishlist.css';

const destinations = {
  paris: {
    id: 'paris',
    name: 'Paris',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
    description: 'The City of Light awaits with its iconic Eiffel Tower and charming cafes.'
  },
  dubai: {
    id: 'dubai',
    name: 'Dubai',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c',
    description: 'Experience luxury and modernity in the heart of the desert.'
  },
  peru: {
    id: 'peru',
    name: 'Peru',
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377',
    description: 'Discover the ancient wonders of Machu Picchu and Incan culture.'
  },
  tokyo: {
    id: 'tokyo',
    name: 'Tokyo',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26',
    description: 'Immerse yourself in the perfect blend of tradition and technology.'
  },
  santorini: {
    id: 'santorini',
    name: 'Santorini',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e',
    description: 'Experience the stunning white architecture and Mediterranean beauty.'
  },
  maldives: {
    id: 'maldives',
    name: 'Maldives',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8',
    description: 'Relax in paradise with crystal clear waters and overwater bungalows.'
  }
};

const Wishlist = () => {
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load wishlist from localStorage
    const savedWishlist = JSON.parse(localStorage.getItem('travelWishlist') || '[]');
    const items = savedWishlist.map(id => destinations[id]).filter(Boolean);
    setWishlistItems(items);
    setIsLoading(false);
  }, []);

  const removeFromWishlist = (destinationId) => {
    const savedWishlist = JSON.parse(localStorage.getItem('travelWishlist') || '[]');
    const newWishlist = savedWishlist.filter(id => id !== destinationId);
    localStorage.setItem('travelWishlist', JSON.stringify(newWishlist));
    setWishlistItems(items => items.filter(item => item.id !== destinationId));
  };

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading your wishlist...</p>
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-container empty-wishlist">
        <h1>My Travel Wishlist</h1>
        <div className="empty-state">
          <span className="empty-icon">✈️</span>
          <h2>Your wishlist is empty</h2>
          <p>Start adding destinations to your wishlist by clicking the heart icon on any destination.</p>
          <button onClick={() => navigate('/destinations')}>
            Browse Destinations
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-container">
      <h1>My Travel Wishlist</h1>
      <div className="wishlist-grid">
        {wishlistItems.map((destination) => (
          <div key={destination.id} className="wishlist-card">
            <div className="wishlist-image">
              <img src={destination.image} alt={destination.name} />
              <button
                className="remove-button"
                onClick={() => removeFromWishlist(destination.id)}
                title="Remove from Wishlist"
              >
                ✕
              </button>
            </div>
            <div className="wishlist-info">
              <h2>{destination.name}</h2>
              <p>{destination.description}</p>
              <div className="wishlist-actions">
                <button 
                  className="view-details-button"
                  onClick={() => navigate(`/destination/${destination.id}`)}
                >
                  View Details
                </button>
                <button 
                  className="book-now-button"
                  onClick={() => navigate(`/destination/${destination.id}`)}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist; 