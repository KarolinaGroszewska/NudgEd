import React from 'react';

const Login: React.FC = () => {
    const handleLogin = () => {
        // Call the server login with Google
        window.open('http://localhost:3001/auth/google', '_self');
    };

    return (
        <div>
            <h2>Login</h2>
            <button onClick={handleLogin}>Login with Google</button>
        </div>
    );
};

export default Login;