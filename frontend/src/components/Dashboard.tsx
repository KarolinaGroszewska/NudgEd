import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();

    const handleGoogleLogin = () => {
        // Call the server login with Google functionality here
        // For example, you might redirect to a Google OAuth URL or call an API endpoint
        window.location.href = 'http://localhost:3001/auth/google'; // Adjust the URL as needed
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={handleGoogleLogin}>Login with Google</button>
        </div>
    );
};

export default Dashboard;