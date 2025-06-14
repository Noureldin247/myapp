import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Destinations.css';

const destinations = [
  {
    id: 'paris',
    name: 'Paris',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
    description: 'The City of Light awaits with its iconic Eiffel Tower and charming cafes.',
    rating: 4.8,
    priceRange: '€€€',
    featured: true
  },
  {
    id: 'dubai',
    name: 'Dubai',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c',
    description: 'Experience luxury and modernity in the heart of the desert.',
    rating: 4.7,
    priceRange: '€€€€',
    featured: true
  },
  {
    id: 'peru',
    name: 'Peru',
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377',
    description: 'Discover the ancient wonders of Machu Picchu and Incan culture.',
    rating: 4.9,
    priceRange: '€€',
    featured: false
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26',
    description: 'Immerse yourself in the perfect blend of tradition and technology.',
    rating: 4.8,
    priceRange: '€€€',
    featured: true
  },
  {
    id: 'santorini',
    name: 'Santorini',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e',
    description: 'Experience the stunning white architecture and Mediterranean beauty.',
    rating: 4.9,
    priceRange: '€€€€',
    featured: true
  },
  {
    id: 'maldives',
    name: 'Maldives',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8',
    description: 'Relax in paradise with crystal clear waters and overwater bungalows.',
    rating: 4.9,
    priceRange: '€€€€',
    featured: true
  }
];

const Destinations = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDestinations, setFilteredDestinations] = useState(destinations);

  useEffect(() => {
    // Load wishlist from localStorage only if authenticated
    if (isAuthenticated) {
      const savedWishlist = JSON.parse(localStorage.getItem('travelWishlist') || '[]');
      setWishlist(savedWishlist);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    // Filter destinations based on search term
    const filtered = destinations.filter(destination =>
      destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      destination.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDestinations(filtered);
  }, [searchTerm]);

  const toggleWishlist = (e, destinationId) => {
    e.stopPropagation();
    
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/' } });
      return;
    }

    const newWishlist = wishlist.includes(destinationId)
      ? wishlist.filter(id => id !== destinationId)
      : [...wishlist, destinationId];
    
    setWishlist(newWishlist);
    localStorage.setItem('travelWishlist', JSON.stringify(newWishlist));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Additional search functionality can be added here
  };

  return (
    <div className="destinations-container">
      <div className="hero-section">
        <h1>Discover Your Next Adventure</h1>
        <p>Explore the world's most breathtaking destinations and create unforgettable memories.</p>
        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search destinations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>

      <div className="destinations-grid">
        {filteredDestinations.map((destination) => (
          <div 
            key={destination.id} 
            className="destination-card"
            onClick={() => navigate(`/destination/${destination.id}`)}
          >
            <div className="destination-image">
              <img src={destination.image} alt={destination.name} />
              {destination.featured && (
                <div className="featured-tag">Featured</div>
              )}
              <button
                className={`wishlist-button ${wishlist.includes(destination.id) ? 'in-wishlist' : ''}`}
                onClick={(e) => toggleWishlist(e, destination.id)}
                title={isAuthenticated 
                  ? (wishlist.includes(destination.id) ? 'Remove from Wishlist' : 'Add to Wishlist')
                  : 'Login to add to Wishlist'}
              >
                {isAuthenticated && wishlist.includes(destination.id) ? '❤️' : '🤍'}
              </button>
            </div>
            <div className="destination-info">
              <h2>{destination.name}</h2>
              <p>{destination.description}</p>
              <div className="destination-meta">
                <span>⭐ {destination.rating}</span>
                <span>{destination.priceRange}</span>
              </div>
              <button className="book-button">
                Explore Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Destinations; 