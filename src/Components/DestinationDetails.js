import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { searchFlights } from '../services/api';
import './DestinationDetails.css';

const destinationData = {
  bali: {
    name: 'Bali',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
    summary: 'Bali, known as the Island of the Gods, is a Indonesian paradise famous for its vibrant culture, beautiful beaches, lush landscapes, and spiritual atmosphere. From ancient temples to modern beach clubs, Bali offers something for every traveler.',
    mustVisit: [
      'Tanah Lot Temple - Ancient Hindu shrine perched on a rocky outcrop',
      'Ubud - Cultural heart of Bali with art galleries and monkey forest',
      'Tegalalang Rice Terraces - Stunning terraced rice fields',
      'Uluwatu Temple - Clifftop temple famous for Kecak fire dance',
      'Nusa Penida - Island with beautiful beaches and viewpoints'
    ],
    bestTime: 'April to October during the dry season for optimal weather conditions',
    videoUrl: 'https://youtu.be/BFS9n4B_2xA?si=XTYf-oUfmkPlz9x5'
  },  paris: {
    name: 'Paris',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
    summary: 'Paris, the capital of France, is a major European city and a global center for art, fashion, gastronomy, and culture. Known as the "City of Light," it is renowned for its stunning architecture, world-class museums, and romantic ambiance.',
    mustVisit: [
      'Eiffel Tower - The iconic symbol of Paris, offering breathtaking city views',
      'Louvre Museum - Home to thousands of works of art, including the Mona Lisa',
      'Notre-Dame Cathedral - A masterpiece of French Gothic architecture',
      'Champs-Élysées - Famous avenue known for luxury shops and the Arc de Triomphe',
      'Montmartre - Historic arts district with stunning basilica and city views'
    ],
    bestTime: 'Spring (April-June) or Fall (September-November) for mild weather and fewer tourists',
    videoUrl: 'https://youtu.be/UfEiKK-iX70?si=ySUKzFpxtA1w7PBK'
  },
  dubai: {
    name: 'Dubai',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c',
    summary: 'Dubai is a city of superlatives, known for its ultramodern architecture, luxury shopping, vibrant nightlife, and artificial islands. This desert oasis combines traditional Arab culture with futuristic vision.',
    mustVisit: [
      'Burj Khalifa - The world\'s tallest building with observation decks',
      'Dubai Mall - One of the world\'s largest shopping centers with an aquarium',
      'Palm Jumeirah - Artificial archipelago with luxury resorts',
      'Dubai Marina - Stunning waterfront promenade and dining',
      'Gold Souk - Traditional market famous for jewelry'
    ],    bestTime: 'November to March when the weather is pleasant and perfect for outdoor activities',
    videoUrl: 'https://youtu.be/IdejM6wCkxA?si=jTXgPUtTDbkXfXMc'
  },
  peru: {
    name: 'Peru',
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377',
    summary: 'Peru, home to the ancient Incan city of Machu Picchu, offers a rich blend of archaeological wonders, diverse landscapes, and vibrant culture. From the Andes Mountains to the Amazon rainforest, Peru is a land of incredible diversity.',
    mustVisit: [
      'Machu Picchu - The legendary "Lost City of the Incas"',
      'Cusco - Historic capital of the Inca Empire',
      'Sacred Valley - Ancient ruins and traditional markets',
      'Lake Titicaca - Highest navigable lake with floating islands',
      'Lima - Capital city known for its food scene and colonial architecture'
    ],    bestTime: 'May to October during the dry season for the best hiking conditions',
    videoUrl: 'https://youtu.be/1La4QzGeaaQ?si=_syYHb_0z7dhnJ_H'
  },
  tokyo: {
    name: 'Tokyo',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26',
    summary: 'Tokyo, Japan\'s bustling capital, mixes ultramodern and traditional elements, from neon-lit skyscrapers to historic temples. This fascinating city offers cutting-edge technology, incredible food, and rich cultural experiences.',
    mustVisit: [
      'Shibuya Crossing - The world\'s busiest pedestrian crossing',
      'Senso-ji Temple - Tokyo\'s oldest Buddhist temple',
      'Tokyo Skytree - Tallest structure in Japan with observation decks',
      'Tsukiji Outer Market - Famous for fresh seafood and street food',
      'Akihabara - Electronics and anime culture district'
    ],    bestTime: 'March-April for cherry blossoms or October-November for autumn colors',
    videoUrl: 'https://youtu.be/X2aY-HgWjzg?si=VUtblq8CcuwDIcRE'
  },
  santorini: {
    name: 'Santorini',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e',
    summary: 'Santorini, one of Greece\'s most picturesque islands, is famous for its stunning white-washed buildings, blue-domed churches, and spectacular sunsets. This volcanic island offers dramatic views and unique experiences.',
    mustVisit: [
      'Oia - Famous for its blue-domed churches and sunset views',
      'Fira - The island\'s capital with amazing caldera views',
      'Red Beach - Distinctive red cliffs and clear waters',
      'Ancient Akrotiri - Preserved Bronze Age settlement',
      'Santo Wines - Winery with sunset views and wine tasting'
    ],    bestTime: 'April to October for warm weather and minimal rainfall',
    videoUrl: 'https://youtu.be/4zAEDLwl9HI?si=3VXvcWR2J2Nj3w9f'
  },
  maldives: {
    name: 'Maldives',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8',
    summary: 'The Maldives is a tropical paradise consisting of 26 ring-shaped atolls with crystal clear waters, white-sand beaches, and luxurious overwater bungalows. It\'s a perfect destination for underwater adventures and relaxation.',
    mustVisit: [
      'Male - The capital city with colorful buildings and markets',
      'Underwater Restaurant at Conrad Rangali - Unique dining experience',
      'Artificial Beach - Popular public beach with water sports',
      'National Museum - Learn about Maldivian history and culture',
      'Maafushi - Local island famous for water activities'
    ],    bestTime: 'November to April during the dry season with perfect beach weather',
    videoUrl: 'https://youtu.be/W4YfDg-dKzk?si=qWciQNflZ-pJWuxu'
  }
};

const DestinationDetails = ({ isAuthenticated }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const destination = destinationData[id.toLowerCase()];
  const [activeSpot, setActiveSpot] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [weather, setWeather] = useState({ temp: '24°C', condition: 'Sunny' });
  const [flights, setFlights] = useState([]);
  const [flightError, setFlightError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      
      try {
        // Check wishlist if authenticated
        if (isAuthenticated) {
          const wishlist = JSON.parse(localStorage.getItem('travelWishlist') || '[]');
          setIsInWishlist(wishlist.includes(id.toLowerCase()));
        }

        // Try to fetch flights if authenticated
        if (isAuthenticated) {
          try {
            const result = await searchFlights({ destination: destination.name });
            if (result.success) {
              setFlights(result.data);
            } else {
              setFlightError(result.error);
            }
          } catch (error) {
            setFlightError(error.message);
          }
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        // Simulate minimum loading time
        setTimeout(() => setIsLoading(false), 800);
      }
    };

    if (destination) {
      loadData();
    } else {
      setIsLoading(false);
    }
  }, [id, destination, isAuthenticated]);

  const toggleWishlist = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: window.location.pathname } });
      return;
    }

    const wishlist = JSON.parse(localStorage.getItem('travelWishlist') || '[]');
    const destinationId = id.toLowerCase();
    
    if (isInWishlist) {
      const newWishlist = wishlist.filter(item => item !== destinationId);
      localStorage.setItem('travelWishlist', JSON.stringify(newWishlist));
      setIsInWishlist(false);
    } else {
      wishlist.push(destinationId);
      localStorage.setItem('travelWishlist', JSON.stringify(wishlist));
      setIsInWishlist(true);
    }
  };

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading {id} details...</p>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="error-container">
        <div className="error-message">
          <h2>Destination not found</h2>
          <p>We couldn't find the destination you're looking for.</p>
          <button onClick={() => navigate('/')}>
            Return to Destinations
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="destination-details">
      <div className="destination-header">
        <button className="back-button" onClick={() => navigate('/')}>
          ← Back to Destinations
        </button>
        <button 
          className={`wishlist-button ${isInWishlist ? 'in-wishlist' : ''}`} 
          onClick={toggleWishlist}
          title={isAuthenticated 
            ? (isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist')
            : 'Login to add to Wishlist'}
        >
          {isAuthenticated && isInWishlist ? '❤️' : '🤍'}
        </button>
        <img src={destination.image} alt={destination.name} />
        <div className="header-content">
          <h1>{destination.name}</h1>
          <div className="weather-widget">
            <span className="temperature">{weather.temp}</span>
            <span className="condition">{weather.condition}</span>
          </div>
        </div>
      </div>
      
      <div className="destination-content">
        <section className="summary">
          <h2>Overview</h2>
          <div className="summary-content">
            <p>{destination.summary}</p>
            <div className="quick-facts">
              <div className="fact">
                <span className="fact-label">Best Season</span>
                <span className="fact-value">{destination.bestTime.split(' ')[0]}</span>
              </div>
              <div className="fact">
                <span className="fact-label">Language</span>
                <span className="fact-value">Local + English</span>
              </div>
              <div className="fact">
                <span className="fact-label">Currency</span>
                <span className="fact-value">Local + USD</span>
              </div>
            </div>
          </div>
        </section>

        <section className="must-visit">
          <h2>Must Visit Spots</h2>
          <div className="spots-container">
            {destination.mustVisit.map((spot, index) => {
              const [name, description] = spot.split(' - ');
              return (
                <div 
                  key={index}
                  className={`spot-card ${activeSpot === index ? 'active' : ''}`}
                  onMouseEnter={() => setActiveSpot(index)}
                  onMouseLeave={() => setActiveSpot(null)}
                >
                  <h3>{name}</h3>
                  <p>{description}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="best-time">
          <h2>Best Time to Visit</h2>
          <p>{destination.bestTime}</p>
        </section>        <section className="video-section">
          <h2>Virtual Tour</h2>
          <div className="video-container">
            {destination.videoUrl ? (
              <iframe
                width="100%"
                height="450"
                src={destination.videoUrl.replace('youtu.be/', 'www.youtube.com/embed/')}
                title={`Virtual tour of ${destination.name}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="video-placeholder">
                <p>{destination.videoPlaceholder}</p>
              </div>
            )}
          </div>
        </section>

        <section className="booking-section" id="booking">
          <h2>Ready to Book?</h2>
          {isAuthenticated ? (
            <div className="booking-options">
              {flightError ? (
                <div className="error-message">
                  <p>{flightError}</p>
                  <p>Please try again later or contact support.</p>
                </div>
              ) : flights.length > 0 ? (
                <>
                  <div className="booking-card">
                    <h3>Available Flights</h3>
                    <ul>
                      {flights.map((flight, index) => (
                        <li key={index}>
                          {flight.date} - {flight.price}
                        </li>
                      ))}
                    </ul>
                    <button className="book-button">Book Flight</button>
                  </div>
                  <div className="booking-card premium">
                    <h3>Premium Package</h3>
                    <ul>
                      <li>Flight + 5 nights luxury accommodation</li>
                      <li>All tours included</li>
                      <li>Private transfers</li>
                      <li>24/7 concierge</li>
                    </ul>
                    <button className="book-button">Book Package</button>
                  </div>
                </>
              ) : (
                <div className="booking-card">
                  <h3>No Flights Available</h3>
                  <p>Sorry, there are no flights available to {destination.name} at the moment.</p>
                  <p>Please check back later or try a different date.</p>
                </div>
              )}
            </div>
          ) : (
            <div className="booking-options">
              <div className="booking-card">
                <h3>Login Required</h3>
                <p>Please login to view available flights and make bookings.</p>
                <button 
                  className="book-button"
                  onClick={() => navigate('/login', { state: { from: window.location.pathname } })}
                >
                  Login to Book
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default DestinationDetails; 