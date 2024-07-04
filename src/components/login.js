import React, { useState,useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Alert  from 'react-bootstrap/Alert';
import { BACKEND_URI } from '../config/constants';

const Login = () => {
    const [first_name, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [alertMessage, setAlertMessage] = useState(null);
    const [alertType, setAlertType] = useState('success');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${BACKEND_URI}/api/user/login`, { first_name, password });
            console.log(data.password);
            if(data.status && data.status === 'success'){
                setAlertType('success');
                setAlertMessage('Login successful! Redirecting...');
                setTimeout(() => {
                    login(data.token);
                    navigate('/account');
                }, 2000);
            }else{
                setAlertType('danger');
                setAlertMessage(data.message);
            }
        } catch (error) {
            setAlertType('danger');
            setAlertMessage('Error logging in');
        }
    };

    return (
        <div className="container mt-5">

            <h2>Login</h2>
            {alertMessage && (
                <Alert variant={alertType} onClose={() => setAlertMessage(null)} dismissible>
                    {alertMessage}
                </Alert>
            )}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="first_name">First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="first_name"
                        value={first_name}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
                <br/>
                <button className="btn btn-link mt-3" onClick={() => navigate('/signup')}>
                    Don't have an account? Register here.
                </button>
            </form>
        </div>
    );
};

export default Login;
