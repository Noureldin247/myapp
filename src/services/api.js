import axios from 'axios';

// Use the proxy in development, direct URL in production
const baseURL = process.env.NODE_ENV === 'production' 
    ? 'http://localhost:555'  // This should be your production URL
    : '';

const api = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add response interceptor for better error handling
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            // Handle unauthorized access
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const loginUser = async (credentials) => {
    try {
        const response = await api.post('/user/login', credentials);
        return {
            success: true,
            data: response.data,
            isAdmin: response.data.admin === 1
        };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data || 'Login failed'
        };
    }
};

export const registerUser = async (userData) => {
    try {
        const response = await api.post('/register', userData);
        return {
            success: true,
            message: response.data
        };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data || 'Registration failed'
        };
    }
};

export const getFlights = async () => {
    try {
        const response = await api.get('/flights');
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || 'Failed to fetch flights');
    }
};

export const addFlight = async (flightData) => {
    try {
        const response = await api.post('/flights/addflight', {
            home: flightData.source,
            away: flightData.destination,
            date: flightData.date,
            quantity: parseInt(flightData.quantity, 10)
        });
        return {
            success: true,
            message: response.data
        };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data || 'Failed to add flight'
        };
    }
};

export const logout = async () => {
    try {
        const response = await api.post('/logout');
        return {
            success: true,
            message: response.data
        };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data || 'Logout failed'
        };
    }
};

export const searchFlights = async (params) => {
    try {
        const response = await api.get('/flights/search', { params });
        return {
            success: true,
            data: response.data
        };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data || 'Failed to search flights'
        };
    }
};
